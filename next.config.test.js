import { afterEach, describe, expect, it, vi } from 'vitest';
import nextConfig from './next.config.mjs';

afterEach(() => vi.unstubAllEnvs());

describe('API routing for deployment', () => {
  it('leaves Vercel requests to the deployed API functions', async () => {
    vi.stubEnv('VERCEL', '1');
    vi.stubEnv('API_INTERNAL_URL', undefined);

    expect(await nextConfig.rewrites()).toEqual([]);
  });

  it('retains the local Express proxy outside Vercel', async () => {
    vi.stubEnv('VERCEL', undefined);
    vi.stubEnv('API_INTERNAL_URL', undefined);

    expect(await nextConfig.rewrites()).toEqual([
      { source: '/api/:path*', destination: 'http://localhost:4000/api/:path*' },
    ]);
  });

  it('uses the configured backend for separate hosting', async () => {
    vi.stubEnv('VERCEL', undefined);
    vi.stubEnv('API_INTERNAL_URL', 'https://backend.example.com');

    expect(await nextConfig.rewrites()).toEqual([
      { source: '/api/:path*', destination: 'https://backend.example.com/api/:path*' },
    ]);
  });
});
