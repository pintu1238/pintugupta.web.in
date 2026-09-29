// @vitest-environment node
import express from 'express';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createContactApp } from './contact.js';
import { createContactRouter } from '../server/routes/contact.js';

const servers = [];
const payload = { name: 'Asha', email: 'asha@example.com', subject: 'Hello', message: 'A test message' };
async function post(app, body = payload) {
  const server = createServer(app);
  servers.push(server);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { status: response.status, body: await response.json() };
}
afterEach(async () => {
  await Promise.all(servers.splice(0).map(server => new Promise(resolve => server.close(resolve))));
  vi.restoreAllMocks();
});

describe.each([
  ['Vercel', options => createContactApp(options)],
  ['local Express', ({ pool, notify }) => {
    const app = express();
    app.use(express.json());
    app.use('/api/contact', createContactRouter(pool, { notify }));
    return app;
  }],
])('%s contact notifications', (_name, makeApp) => {
  it('saves first, then awaits one notification before completing', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const steps = [];
    const app = makeApp({ pool: { query: async (_sql, values) => { expect(values).toEqual(['Asha', 'asha@example.com', 'Hello', 'A test message']); steps.push('stored'); } }, notify: async row => { await Promise.resolve(); expect(row).toEqual(payload); steps.push('emailed'); } });
    expect(await post(app)).toEqual({ status: 201, body: { ok: true } });
    expect(steps).toEqual(['stored', 'emailed']);
  });

  it('retains successful storage if SMTP fails without logging credentials or message contents', async () => {
    const errors = [];
    vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.join(' ')));
    const app = makeApp({ pool: { query: async () => {} }, notify: async () => { throw new Error('private-password A test message'); } });
    expect(await post(app)).toEqual({ status: 201, body: { ok: true } });
    expect(errors.join(' ')).toContain('email notification failed');
    expect(errors.join(' ')).not.toContain('private-password');
    expect(errors.join(' ')).not.toContain('A test message');
  });

  it('does not notify for rejected input or failed storage', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let notifications = 0;
    const app = makeApp({ pool: { query: async () => { throw new Error('database unavailable'); } }, notify: async () => { notifications += 1; } });
    expect((await post(app, { ...payload, email: 'bad' })).status).toBe(400);
    expect((await post(app)).status).toBe(500);
    expect(notifications).toBe(0);
  });

  it('preserves contact storage when email is unconfigured', async () => {
    const app = makeApp({ pool: { query: async () => {} }, notify: null });
    expect(await post(app)).toEqual({ status: 201, body: { ok: true } });
  });
});
