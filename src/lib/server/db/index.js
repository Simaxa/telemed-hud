import dotenv from 'dotenv';
dotenv.config();
console.log('🌐 DATABASE_URL =', process.env.DATABASE_URL);


import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });
