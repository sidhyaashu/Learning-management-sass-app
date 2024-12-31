import { boolean, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull(),
    isMember: boolean().default(false),
});
