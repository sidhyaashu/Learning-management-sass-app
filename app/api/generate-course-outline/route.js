import {NextResponse} from "next/server";
import {courseOutlineAIModel} from "@/configs/AiModel";
import {db} from "@/configs/db";
import {STUDY_MATERIAL_TABLE} from "@/configs/schema";


export async function POST(req){

    const { courseId,topic,courseType,difficualtyLevel,createdBy } = await req.json()
    if (!courseId && !topic && !courseType && !difficualtyLevel && !createdBy) {
        return NextResponse.json({message:"All field required"})
    }

    const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficualtyLevel} with summery of course.
    List of chapter, Topic list in each chapter in JSON format`

    // Generate Course Layout Using AI
    const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT)
    const aiResult = JSON.parse(aiResponse.response.text())


    // Save the result to the database
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        difficultyLevel:difficualtyLevel,
        courseLayout:aiResult,

    }).returning({STUDY_MATERIAL_TABLE})

    console.log(dbResult)


    return NextResponse.json({result: dbResult[0]})
}