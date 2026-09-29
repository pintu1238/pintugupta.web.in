import express from 'express';
import 'dotenv/config';
import { createPool } from '../server/db.js';
import { createContactRouter } from '../server/routes/contact.js';
import { createContactNotifier } from '../server/contact-email.js';

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

export function createContactApp({ pool = createPool(), notify = createContactNotifier(), env = process.env } = {}) {
  const app = express();
  const supabaseStore =
    !pool && env.SUPABASE_URL && env.SUPABASE_ANON_KEY
      ? createSupabaseContactStore({
          supabaseUrl: env.SUPABASE_URL,
          anonKey: env.SUPABASE_ANON_KEY,
        })
      : null;

  app.use(express.json({ limit: '32kb' }));

  app.use(['/', '/api/contact'], createContactRouter(pool, { store: supabaseStore, notify }));

  app.use((error, _request, response, next) => {
    void next;
    if (error instanceof SyntaxError) {
      return response.status(400).json({ ok: false, message: 'Please send valid JSON.' });
    }

    console.error('Unhandled API error:', error instanceof Error ? error.message : 'unknown error');
    return response.status(500).json({ ok: false, message: 'Unexpected API error.' });
  });

  return app;
}

export default createContactApp();
