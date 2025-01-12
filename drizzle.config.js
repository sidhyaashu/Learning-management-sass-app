// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import {config} from "dotenv";

config({ path: '.env.local' });

export default defineConfig({
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials: {
        url: process.env.DATABASE_URL
}});