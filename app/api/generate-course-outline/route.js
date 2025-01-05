import {courseOutlineAIModel} from "@/configs/AiModel";
import {NextResponse} from "next/server";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"
import {db} from "@/configs/db";

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficualtyLevel, createdBy } = await req.json();

        // if (!courseId || !topic || !courseType || !difficualtyLevel || !createdBy) {
        //     return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        // }

        const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficualtyLevel} with summary of course. List of chapters, Topic list in each chapter in JSON format`;

        // Generate Course Layout Using AI
        const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT);
        // if (!aiResponse || aiResponse.response.status !== 200) {
        //     console.error("AI model API error:", aiResponse);
        //     return NextResponse.json({ message: "AI model failed to respond" }, { status: 500 });
        // }
            console.log("AI model API reponse:", aiResponse);
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

        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ message: "Internal Server Error" });
    }
}
