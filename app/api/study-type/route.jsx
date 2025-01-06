import {db} from "@/configs/db";
import {CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE} from "@/configs/schema";
import {and, eq} from "drizzle-orm";
import {NextResponse} from "next/server";


export async function POST(req){
    const { courseId, studyType} = await req.json()

    if(studyType == "ALL"){
        const notes_all = await db.select().from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId))

        const contentList = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId))


        // Get all the other study types record
        const result ={
            notes:notes_all,
            flashCard:contentList?.find(item=>item.type === "flashcard"),
            quiz:contentList?.find(item=>item.type === "quiz"),
            qa:contentList?.find(item=>item.type === "qa")
        }

        return NextResponse.json(result)
    }else if(studyType === "notes"){
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId))



        return NextResponse.json(notes)
    }else{
        const result_t = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
            .where(and(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId),eq(STUDY_TYPE_CONTENT_TABLE?.type,studyType)))

        return NextResponse.json(result_t[0] ?? [])
    }
}