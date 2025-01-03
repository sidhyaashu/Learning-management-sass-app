import { boolean, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    isMember: boolean('isMember').default(false),
});

