import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse request body
        const { courseId, studyType } = await req.json();

        // Validate input
        if (!courseId || !studyType) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        if (studyType === "ALL") {
            // Fetch notes and content list
            const notesAll = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            const contentList = await db
                .select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

            // Structure the result
            const result = {
                notes: notesAll || [],
                flashcard: contentList?.find((item) => item.type === "flashcard") || null,
                quiz: contentList?.find((item) => item.type === "quiz") || null,
                qa: contentList?.find((item) => item.type === "qa") || null,
            };

            return NextResponse.json(result);
        } else if (studyType === "notes") {
            // Fetch notes for specific study type
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            return NextResponse.json(notes || []);
        } else {
            // Fetch specific study type content
            const content = await db
                .select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(
                    and(
                        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
                    )
                );

            return NextResponse.json(content[0] || null);
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
