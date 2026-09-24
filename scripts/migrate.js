import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required to run migrations.');
  process.exit(1);
}

const migrationPath = path.join(process.cwd(), 'server', 'migrations', '001_create_contact_messages.sql');
const sql = await fs.readFile(migrationPath, 'utf8');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  await pool.query(sql);
  console.log('Database migration complete.');
} finally {
  await pool.end();
}
