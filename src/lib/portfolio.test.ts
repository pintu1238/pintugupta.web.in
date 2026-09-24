import { describe, expect, it } from 'vitest';
import { getNextIndex, getProjectPage } from './portfolio';

describe('portfolio helpers', () => {
  it('returns a bounded project page with the correct page count', () => {
    const projects = ['a', 'b', 'c', 'd', 'e'];

    expect(getProjectPage(projects, 2, 2)).toEqual({
      items: ['c', 'd'],
      page: 2,
      pageCount: 3,
    });
    expect(getProjectPage(projects, 99, 2)).toEqual({
      items: ['e'],
      page: 3,
      pageCount: 3,
    });
  });

  it('wraps the carousel index in both directions', () => {
    expect(getNextIndex(0, 4, 'previous')).toBe(3);
    expect(getNextIndex(3, 4, 'next')).toBe(0);
    expect(getNextIndex(1, 4, 'next')).toBe(2);
  });
});
