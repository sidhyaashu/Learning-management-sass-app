import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';


const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_CONNECTION

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(DATABASE_URL);

export const db = drizzle({ client: sql })
