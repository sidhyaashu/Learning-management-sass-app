import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials:{
        url:'postgresql://mysass_owner:I0G3WOYREhue@ep-muddy-cherry-a1hq2fco.ap-southeast-1.aws.neon.tech/gen-lms?sslmode=require'
    }
});
