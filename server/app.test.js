import { createServer } from 'node:http';
import { once } from 'node:events';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from './app.js';

let server;

afterEach(async () => {
  if (!server) return;
  server.close();
  await once(server, 'close');
  server = undefined;
});

describe('createApp', () => {
  it('serves the health endpoint without starting a listener', async () => {
    const { app } = createApp();
    server = createServer(app);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');

    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, service: 'portfolio-api' });
  });
});
