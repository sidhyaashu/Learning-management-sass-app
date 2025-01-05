import {courseOutlineAIModel} from "@/configs/AiModel";
import {NextResponse} from "next/server";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"
import {db} from "@/configs/db";
import {inngest} from "@/inngest/client";

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficualtyLevel, createdBy } = await req.json();

        const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficualtyLevel} with summary of course. List of chapters (Max 3) along with summary and Emoji icon for each chapter , Topic list in each chapter in JSON format`;

        // Generate Course Layout Using AI
        const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT);
        const aiResult = JSON.parse(aiResponse.response.text());

        // Uncomment below once database insertion is implemented
        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId,
            courseType,
            createdBy,
            topic,
            difficultyLevel: difficualtyLevel,
            courseLayout: aiResult,
        }).returning({ resp: STUDY_MATERIAL_TABLE });

        //Trigger the ingest to generate chapter notes
        const noteGenerateNote = await inngest.send({
            name: "notes.generate",
            data:{
                course:dbResult[0]
            }
        })
        console.log(dbResult[0])

        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ message: "Internal Server Error" });
    }
}
