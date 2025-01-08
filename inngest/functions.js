import { inngest } from "./client";
import { db } from "@/configs/db";
import {CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {
    generateFlashCardAiModel,
    generateNotesAiModel,
    generateQuizAiModel,
} from "@/configs/AiModel";

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



// Use to generate flashcard, quiz, and Q&A
export const GenerateStudyTypeContent = inngest.createFunction(
    { id: "generate-study-type-content" },
    { event: "studyType.content" },
    async ({ event, step }) => {

        console.log(event)
        const { studyType, prompt, recordId } = event.data;

        console.log("STUDY TYPE ++++++++++++++++ "+ studyType)
        console.log("PROMPT---------------------------------------------------"+prompt)
        console.log("RECORD ID --------------------------------------------"+recordId);


        try {
            const aiResponse_f = await step.run("Generating Content using AI", async () => {
                let result;

                // Run the appropriate AI generation model based on the study type
                try {
                    if(studyType === "flashcard"){
                        result = await generateFlashCardAiModel.sendMessage(prompt);
                    }else if (studyType === "quiz"){
                        result = await generateQuizAiModel.sendMessage(prompt);
                    }else{
                        throw new Error("Invalid study type");
                    }

                    // Parse AI response to extract the content
                    const aiResponse = await result.response.text();
                    const parsedResponse = JSON.parse(aiResponse);

                    return parsedResponse;
                } catch (aiError) {
                    throw new Error(`AI generation failed: ${aiError.message}`);
                }
            });

            // Insert the generated content into the database
            await step.run("Save result to DB", async () => {
                try {
                    const dbResult = await db.update(STUDY_TYPE_CONTENT_TABLE)
                        .set({
                            content: aiResponse_f,
                            status: "ready"
                        })
                        .where(eq(STUDY_TYPE_CONTENT_TABLE?.id, recordId));

                    if (!dbResult) {
                        throw new Error("Failed to update the database");
                    }

                    return 'Inserted successfully';
                } catch (dbError) {
                    throw new Error(`Database update failed: ${dbError.message}`);
                }
            });

        } catch (error) {
            // Handle any errors that occurred during the process
            console.error("Error generating study type content:", error.message);
            return { error: `Content generation failed: ${error.message}` };
        }
    }
);
