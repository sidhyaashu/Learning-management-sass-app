import {db} from "@/configs/db";
import {STUDY_TYPE_CONTENT_TABLE} from "@/configs/schema";
import {inngest} from "@/inngest/client";
import {NextResponse} from "next/server";
export async function POST(req) {
    try {
        const { chapters, courseId, type } = await req.json();

        const PROMPT = (() => {
            switch (type) {
                case "flashcard":
                    return `Generate the flashcards on topic: ${chapters}, in JSON format with front and back content (maximum 15)`;
                case "quiz":
                    return `Generate a quiz on topic: ${chapters} with question, options, and the answer in JSON format (maximum 10)`;
                case "qa":
                    return `Generate a Q&A on topic: ${chapters} with question and answer pairs in JSON format (maximum 10)`;
                default:
                    return `Generate content on topic: ${chapters}`;
            }
        })();



        // Insert record and update status to 'Generating'
        const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
            courseId: courseId,
            type: type,
            status: 'Generating',
        }).returning({
            id: STUDY_TYPE_CONTENT_TABLE?.id
        });

        // Trigger ingest
        await inngest.send({
            name: 'studyType.content',
            data:{
                studyType: type,
                prompt: PROMPT,
                courseId: courseId,
                recordId: result[0].id
            }
        });

        // You might want to update the content field later when content is generated

        return NextResponse.json({
            id: result[0]?.id,
            message: "Content generation started successfully.",
            status: "Generating"
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            error: "Failed to start content generation. Please try again later."
        }, { status: 500 });
    }
}
