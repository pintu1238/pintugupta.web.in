import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectsSection from './ProjectsSection';

let host: HTMLDivElement;
let root: Root;
let viewportWidth = 320;

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  // jsdom has no layout engine: model only the browser's media-query boundary.
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ||
      (query === '(min-width: 768px)' && viewportWidth >= 768) ||
      (query === '(min-width: 1200px)' && viewportWidth >= 1200),
  }));
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

function resizeTo(width: number) {
  viewportWidth = width;
  vi.stubGlobal('innerWidth', Math.round(width));
  window.dispatchEvent(new Event('resize'));
}

describe('responsive project accessibility', () => {
  it('keeps LMS source code available without offering its unavailable live demo', () => {
    act(() => { resizeTo(320); root.render(<ProjectsSection />); });
    act(() => host.querySelector<HTMLButtonElement>('[aria-label="Go to project 16"]')!.click());
    const card = host.querySelector('.projectSlide:not([inert])')!;
    expect(card.querySelector('h3')?.textContent).toBe('Learning Management System');
    expect(card.querySelector('[aria-label="Learning Management System source code"]')?.getAttribute('href')).toBe('https://github.com/pintu1238/LMS-Learning-Management-System-');
    expect(card.querySelector('[aria-label="Learning Management System live demo"]')).toBeNull();
  });

  it('keeps only the visually displayed 1 / 2 / 3 cards interactive across resizes', () => {
    act(() => { resizeTo(320); root.render(<ProjectsSection />); });
    for (const [width, visible] of [[320, 1], [575, 1], [767, 1], [768, 2], [991, 2], [992, 2], [1024, 2], [1199, 2], [1200, 3], [1920, 3], [360, 1]]) {
      act(() => resizeTo(width));
      expect(host.querySelectorAll('.projectSlide:not([inert])'), `visible cards at ${width}px`).toHaveLength(visible);
    }
  });

  it('uses CSS media-query precision rather than rounded innerWidth at the tablet edge', () => {
    act(() => { resizeTo(767.6); root.render(<ProjectsSection />); });
    expect(host.querySelectorAll('.projectSlide:not([inert])')).toHaveLength(1);
    act(() => resizeTo(768));
    expect(host.querySelectorAll('.projectSlide:not([inert])')).toHaveLength(2);
  });

  it('keeps navigation usable when a resize interrupts the last-to-first transition', () => {
    act(() => { resizeTo(1200); root.render(<ProjectsSection />); });
    act(() => host.querySelector<HTMLButtonElement>('[aria-label="Go to project 16"]')!.click());
    act(() => host.querySelector<HTMLButtonElement>('[aria-label="Next projects"]')!.click());
    act(() => resizeTo(768));
    const track = host.querySelector<HTMLElement>('.projectTrack')!;
    expect(track.style.transform).toBe('translateX(calc(-3 * 100% / var(--cards-visible)))');
    expect(track.style.transition).toBe('none');
    act(() => host.querySelector<HTMLButtonElement>('[aria-label="Next projects"]')!.click());
    expect(host.querySelector('[aria-current="true"]')?.getAttribute('aria-label')).toBe('Go to project 2');
  });
});
