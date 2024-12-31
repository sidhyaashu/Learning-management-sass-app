"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

const Provider = ({ children }) => {
    const { user } = useUser();

    const CheckNewUser = async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            const name = user?.fullName;

            if (!email) {
                console.warn("No email address available for user.");
                return;
            }

            const existingUsers = await db
                .select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, email));

            if (existingUsers.length === 0) {
                const newUser = await db
                    .insert(USER_TABLE)
                    .values({ name, email })
                    .returning(USER_TABLE.id);

                console.log("Inserted User:", newUser);
            }
        } catch (error) {
            console.error("Error in CheckNewUser:", error.message, error.stack);
        }
    };

    useEffect(() => {
        if (user) CheckNewUser();
    }, [user?.primaryEmailAddress?.emailAddress]);

    return <>{children}</>;
};

export default Provider;
