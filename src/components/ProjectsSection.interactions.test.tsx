import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectsSection from './ProjectsSection';

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<ProjectsSection />));
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function touch(type: string, x: number) {
  const event = new Event(type, { bubbles: true });
  Object.defineProperties(event, { touches: { value: [{ clientX: x }] }, changedTouches: { value: [{ clientX: x }] } });
  act(() => host.querySelector('.projectViewport')!.dispatchEvent(event));
}

function settle() {
  act(() => host.querySelector('.projectTrack')!.dispatchEvent(new Event('transitionend', { bubbles: true })));
}

function active() {
  return host.querySelector('.projectDots [aria-current="true"]')?.getAttribute('aria-label');
}

describe('project carousel user interactions', () => {
  it('supports swipe in both directions without treating short drags as a slide change', () => {
    touch('touchstart', 250);
    touch('touchend', 150);
    expect(active()).toBe('Go to project 2');
    settle();
    touch('touchstart', 150);
    touch('touchend', 250);
    expect(active()).toBe('Go to project 1');
    settle();
    touch('touchstart', 200);
    touch('touchend', 180);
    expect(active()).toBe('Go to project 1');
  });

  // This exercises 32 separate React updates across all 16 real cards.
  it('keeps arrow buttons usable after a complete forward and backward loop', () => {
    for (const label of ['Next projects', 'Previous projects']) {
      for (let i = 0; i < 16; i++) {
        act(() => host.querySelector<HTMLButtonElement>(`[aria-label="${label}"]`)!.click());
        settle();
      }
      expect(active()).toBe('Go to project 1');
    }
  }, 15_000);

  it('resumes automatic rotation after a touch gesture is cancelled by the browser', () => {
    touch('touchstart', 200);
    touch('touchcancel', 200);
    act(() => vi.advanceTimersByTime(6500));
    expect(active()).toBe('Go to project 2');
  });
});
