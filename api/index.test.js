import { describe, expect, it } from 'vitest';
import handler from './index.js';

describe('Vercel API entrypoint', () => {
  it('exports the Express handler without starting a long-lived server', () => {
    expect(typeof handler).toBe('function');
  });
});
