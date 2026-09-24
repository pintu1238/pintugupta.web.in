import { describe, expect, it } from 'vitest';
import { submitContact } from './contact';

describe('submitContact', () => {
  it('posts the contact payload and returns a success result', async () => {
    let request: RequestInit | undefined;
    const fetcher = async (_url: string | URL | Request, options?: RequestInit) => {
      request = options;
      return new Response(JSON.stringify({ ok: true }), { status: 201 });
    };

    await expect(
      submitContact('http://localhost:4000', { name: 'Asha', email: 'asha@example.com', message: 'Hello' }, fetcher),
    ).resolves.toEqual({ ok: true });
    expect(request?.method).toBe('POST');
    expect(request?.headers).toEqual({ 'Content-Type': 'application/json' });
  });

  it('returns a safe error when the API rejects the request', async () => {
    const fetcher = async () => new Response(JSON.stringify({ message: 'Please try again.' }), { status: 500 });

    await expect(
      submitContact('http://localhost:4000', { name: 'Asha', email: 'asha@example.com', message: 'Hello' }, fetcher),
    ).resolves.toEqual({ ok: false, message: 'Please try again.' });
  });

  it('uses the same-origin API path when no API URL is configured', async () => {
    let requestedUrl = '';
    const fetcher = async (url: string | URL | Request) => {
      requestedUrl = String(url);
      return new Response(JSON.stringify({ ok: true }), { status: 201 });
    };

    await expect(
      submitContact('', { name: 'Asha', email: 'asha@example.com', message: 'Hello' }, fetcher),
    ).resolves.toEqual({ ok: true });
    expect(requestedUrl).toBe('/api/contact');
  });
});
