"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

const Provider = ({ children }) => {
    const { user } = useUser();


    useEffect(() => {
        user && CheckNewUser();
    }, [user]);

    const CheckNewUser = async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            const name = user?.fullName;

            if (!email) {
                console.log("Email is required!");
                return;
            }

            const result = await db
                .select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, email));

            console.log(result);

            if (result?.length == 0) {
                const resultResponse = await db
                    .insert(USER_TABLE)
                    .values({
                        name: name,
                        email: email,
                    })
                    .returning({id: USER_TABLE.id});
                console.log("Inserted User:", resultResponse);
            }

        } catch (e) {
            console.error(`Error in CheckNewUser: ${e.message} - Stack: ${e.stack}`);
        }
    };




    return <>{children}</>;
};

export default Provider;
