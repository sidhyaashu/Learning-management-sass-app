import { inngest } from "./client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

// export const helloWorld = inngest.createFunction(
//     { id: "hello-world" },
//     { event: "test/hello.world" },
//     async ({ event, step }) => {
//         await step.sleep("wait-a-moment", "1s");
//         return { message: `Hello ${event.data}!` };
//     }
// );

export const CreateNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: "user.create" },

    async ({ event, step }) => {
        console.log(`Data from the event ${event}`);
        const result = await step.run("Check User and create New if not in DB", async () => {
            try {
                // Check if the user already exists
                const existingUser = await db
                    .select()
                    .from(USER_TABLE)
                    .where(eq(USER_TABLE.email, event.data.user?.primaryEmailAddress?.emailAddress));

                if (existingUser?.length == 0) {
                    const newUser = await db
                        .insert(USER_TABLE)
                        .values({ name: event.data.user?.fullName, email:event.data.user?.primaryEmailAddress?.emailAddress })
                        .returning({ id: USER_TABLE.id });

                    return newUser;
                }

                return existingUser;

            } catch (error) {
                console.error(`Error in creating user: ${error.message}`, error.stack);
                throw new Error("Failed to create or check user");
            }
        });

        return "success";
    }
);
