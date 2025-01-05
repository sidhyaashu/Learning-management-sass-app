import {boolean, pgTable, varchar, serial, json, integer, text} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    isMember: boolean('isMember').default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable("studyMaterials", {
    id: serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    courseType:varchar('courseType').notNull(),
    topic:varchar('topic').notNull(),
    difficultyLevel:varchar('difficultyLevel').default("Easy"),
    courseLayout:json("courseLayout"),
    createdBy:varchar('createdBy').notNull(),
    status:varchar('status').default("Generating"),
})

export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes", {
    id: serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    chapterId:integer('chapterId').notNull(),
    notes:text('notes'),
})