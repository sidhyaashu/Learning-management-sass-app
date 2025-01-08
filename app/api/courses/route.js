import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { createdBy, page = 1, limit = 6 } = await req.json(); // Destructure page and limit with default values

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch courses with pagination
    const result = await db
        .select()
        .from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
        .orderBy(desc(STUDY_MATERIAL_TABLE.id))
        .limit(limit) // Limit the number of results
        .offset(offset); // Apply the offset for pagination

    // Check if the result is empty to determine if there's more data
    const hasMore = result.length === limit; // If we received the expected limit of courses, there might be more to load

    return NextResponse.json({
        result: result,
        hasMore: hasMore,
    });
}

export async function GET(req) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const courseId = searchParams?.get("courseId");

    const course = await db
        .select()
        .from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE?.courseId, courseId));

    return NextResponse.json({ result: course[0] });
}
