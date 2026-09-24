import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export function createPool() {
  if (!process.env.DATABASE_URL) return null;

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30_000,
  });
}
