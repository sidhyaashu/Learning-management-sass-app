import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
console.log(`Connected to the database connection: ${connectionString}`);

if (!connectionString) {
    throw new Error("NEXT_PUBLIC_DATABASE_URL is not set in environment variables");
}

export const db = drizzle(connectionString);
