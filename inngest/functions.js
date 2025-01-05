import { inngest } from "./client";
import { db } from "@/configs/db";
import {CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {generateNotesAiModel} from "@/configs/AiModel";

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

export const GenerateNotes = inngest.createFunction(
    { id: "generate-course" },
    { event: "notes.generate" },
    async ({ event, step }) => {
        const { course } = event.data;

        const courseId = course?.resp?.courseId
        // Generate notes for each chapter
        const notesResult = await step.run("Generate Chapter Notes", async () => {
            try {
                const Chapters = course?.resp?.courseLayout?.chapters || [];
                console.log(`Starting notes generation for course: ${Chapters}`);
                if (Chapters.length === 0) {
                    console.log("No chapters found for the course.");
                    return "no chapters";
                }

                await Promise.all(
                    Chapters.map(async (chapter, index) => {
                        const PROMPT = `Generate exam material detailed content for the chapter. Include all topic points in HTML format (without HTML, Head, Body, Title tags). Chapter details: ${JSON.stringify(chapter)}`;
                        const result = await generateNotesAiModel.sendMessage(PROMPT);
                        const aiResponse = await result.response.text();

                        await db.insert(CHAPTER_NOTES_TABLE).values({
                            chapterId: index,
                            courseId,
                            notes: aiResponse,
                        });

                    })
                );

                return "completed";
            } catch (error) {
                console.error(`Error in generating notes: ${error.message}`, error.stack);
                throw new Error("Failed to generate chapter notes");
            }
        });


        // Update course status
        const updateCourseStatusResult = await step.run("Update Course Status", async () => {
            try {
                await db.update(STUDY_MATERIAL_TABLE)
                    .set({ status: "ready" })
                    .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

                return "success";
            } catch (error) {
                console.error(`Error in updating course status: ${error.message}`, error.stack);
                throw new Error("Failed to update course status");
            }
        });

        return notesResult;
    }
);
