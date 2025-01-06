import {db} from "@/configs/db";
import {STUDY_TYPE_CONTENT_TABLE} from "@/configs/schema";
import {inngest} from "@/inngest/client";
import {NextResponse} from "next/server";

export async function POST(req){
    const {chapters,courseId,type}=req.json();

    const PROMPT = "Generate the flashcard on topic : "+chapters+", Basic App navigation in JSON format with front back content, maximum 15"
    // insert record and update the status to generating
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type,

    }).returning({
        id:STUDY_TYPE_CONTENT_TABLE?.id
    })

    // Trigger ingest
    inngest.send({
        name:'studyType.content',
        studyType:type,prompt:PROMPT,courseId:courseId ,recordId:result[0].id
    })

    return NextResponse.json(result[0]?.id)
}
