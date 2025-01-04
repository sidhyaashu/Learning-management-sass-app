"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

const Provider = ({ children }) => {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            checkNewUser();
        }
    }, [user]);

    const checkNewUser = async () => {
        try {
            const response = await axios.post("/api/create-user", { user });
            console.log("API Response:", response.data);
        } catch (error) {
            console.error("Error in CheckNewUser:", error.message);
        }
    };

    return <>{children}</>;
};

export default Provider;
