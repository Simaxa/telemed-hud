import 'dotenv/config';

export default {
  schema: './src/lib/server/db/schema.js',
  out: './drizzle',
  driver: 'pg',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  }
};
