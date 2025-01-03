// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import {config} from "dotenv";

config({ path: '.env.local' });

export default defineConfig({
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_CONNECTION
}});