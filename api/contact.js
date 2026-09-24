import express from 'express';
import 'dotenv/config';
import { createPool } from '../server/db.js';
import { validateContactPayload } from '../server/validation.js';

export function createSupabaseContactStore({ fetcher = fetch, supabaseUrl, anonKey }) {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_messages`;

  return {
    async insert(row) {
      const response = await fetcher(endpoint, {
        method: 'POST',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
      });

      if (!response.ok) throw new Error(`Supabase REST request failed with status ${response.status}.`);
    },
  };
}

const app = express();
const pool = createPool();
const supabaseStore =
  !pool && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
    ? createSupabaseContactStore({
        supabaseUrl: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
      })
    : null;

app.use(express.json({ limit: '32kb' }));

app.post(['/', '/api/contact'], async (request, response) => {
  const result = validateContactPayload(request.body);

  if (!result.ok) {
    return response.status(400).json({ ok: false, errors: result.errors });
  }

  if (!pool && !supabaseStore) {
    return response.status(503).json({
      ok: false,
      message: 'Contact service is not configured yet.',
    });
  }

  try {
    if (pool) {
      await pool.query(
        `insert into contact_messages (name, email, subject, message)
         values ($1, $2, $3, $4)`,
        [result.value.name, result.value.email, result.value.subject || null, result.value.message],
      );
    } else {
      await supabaseStore.insert({
        ...result.value,
        subject: result.value.subject || null,
      });
    }

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error('Unable to save contact message:', error instanceof Error ? error.message : 'unknown error');
    return response.status(500).json({
      ok: false,
      message: 'We could not save your message right now. Please try again.',
    });
  }
});

app.use((error, _request, response, next) => {
  void next;
  if (error instanceof SyntaxError) {
    return response.status(400).json({ ok: false, message: 'Please send valid JSON.' });
  }

  console.error('Unhandled API error:', error instanceof Error ? error.message : 'unknown error');
  return response.status(500).json({ ok: false, message: 'Unexpected API error.' });
});

export default app;
