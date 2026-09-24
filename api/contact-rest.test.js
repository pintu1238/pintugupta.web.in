import { describe, expect, it } from 'vitest';
import { createSupabaseContactStore } from './contact.js';

describe('createSupabaseContactStore', () => {
  it('inserts a contact row through the Supabase REST API', async () => {
    let request;
    const fetcher = async (url, options) => {
      request = { url, options };
      return new Response(null, { status: 201 });
    };
    const store = createSupabaseContactStore({
      fetcher,
      supabaseUrl: 'https://example.supabase.co',
      anonKey: 'public-key',
    });

    await store.insert({ name: 'Asha', email: 'asha@example.com', subject: null, message: 'Hello' });

    expect(request.url).toBe('https://example.supabase.co/rest/v1/contact_messages');
    expect(request.options.method).toBe('POST');
    expect(request.options.headers).toEqual({
      apikey: 'public-key',
      Authorization: 'Bearer public-key',
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    });
    await expect(request.options.body).toBe(JSON.stringify({ name: 'Asha', email: 'asha@example.com', subject: null, message: 'Hello' }));
  });
});
