import { inngest } from "./client";
import { db } from "@/configs/db";
import {CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {generateNotesAiModel, generateQuizAiModel, generateStudyTypeContentAiModel} from "@/configs/AiModel";

export const CreateNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: "user.create" },

    async ({ event, step }) => {
        const result = await step.run("Check User and create New if not in DB", async () => {
            try {
                // Check if the user already exists
                const existingUser = await db
                    .select()
                    .from(USER_TABLE)
                    .where(eq(USER_TABLE.email, event.data.user?.primaryEmailAddress?.emailAddress));

                if (existingUser?.length === 0) {
                    const newUser = await db
                        .insert(USER_TABLE)
                        .values({
                            name: event.data.user?.fullName,
                            email: event.data.user?.primaryEmailAddress?.emailAddress,
                        })
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

        console.log(`Even data from genarate notes 1 : ${course}`);

        const courseId = course?.resp?.courseId;
        console.log(`Course ID notes 2 : ${courseId}`);

        // Generate notes for each chapter
        const notesResult = await step.run("Generate Chapter Notes", async () => {
            try {
                const chapters = course?.resp?.courseLayout?.chapters;

                console.log(chapters);

                // if (!chapters) {
                //     throw new Error("No chapters found in the course layout");
                // }

                    let index = 0
                    chapters.forEach(async(chapter) => {
                        const PROMPT = `You are a good Assistant must follow my instruction. first Generate material detailed content for the provided chapter. Make sure to Include all topic points in the content, make sure to give content in HTML format and also inline style (Do not add HTML Head, Body, Title tags) and must must follow the output willbe in html format. The chapters : ${JSON.stringify(chapter)}`;

                        const result = await generateNotesAiModel.sendMessage(PROMPT);
                        const aiResponse = await result.response.text();

                        await db.insert(CHAPTER_NOTES_TABLE).values({
                            chapterId: index,
                            courseId,
                            notes: aiResponse,
                        });
                        index = index + 1;
                    })


                return "Chapter notes generated successfully";
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

                return "Course status updated successfully";
            } catch (error) {
                console.error(`Error updating course status: ${error.message}`, error.stack);
                throw new Error("Failed to update course status");
            }
        });

        return {
            notesResult,
            updateCourseStatusResult,
        };
    }
);



//Use to generate flashcard , quize and qa
export const GenerateStudyTypeContent = inngest.createFunction(
    {id: "generate-study-type-content" },
    {event: "studyType.content"},
    async ({ event, step }) => {
        const { studyType,prompt,courseId ,recordId} = event.data;


            const airesult = await step.run("Generating Flashcard using AI", async () => {
                const result = studyType === "flashcard"?
                    await generateStudyTypeContentAiModel.sendMessage(prompt) :
                    await generateQuizAiModel.sendMessage(prompt);
                const aiResponse_f =JSON.parse( await result.response.text());
                return aiResponse_f;
            })


        // Insert into db

        const dbResult = await step.run("Save result to DB", async () => {
            const result = await db.update(STUDY_TYPE_CONTENT_TABLE).set({
                content: FlashCardResult,
                status:"ready"
            }).where(eq(STUDY_TYPE_CONTENT_TABLE?.id,recordId))

            return 'inserted successfully';
        })
    }
)