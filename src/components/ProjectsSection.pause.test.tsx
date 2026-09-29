import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectsSection from './ProjectsSection';

describe('project carousel independent pause reasons', () => {
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    host = document.createElement('div');
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<><ProjectsSection /><button id="outside-carousel">Outside</button></>));
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  function touch(type: string, x = 200) {
    const event = new Event(type, { bubbles: true });
    Object.defineProperties(event, {
      touches: { value: [{ clientX: x }] },
      changedTouches: { value: [{ clientX: x }] },
    });
    act(() => host.querySelector('.projectViewport')!.dispatchEvent(event));
  }

  function active() {
    return host.querySelector('.projectDots [aria-current="true"]')?.getAttribute('aria-label');
  }

  it.each([
    ['hover', 'touchend'], ['focus', 'touchend'],
    ['hover', 'touchcancel'], ['focus', 'touchcancel'],
  ])('keeps the %s pause after %s until that interaction ends', (reason, ending) => {
    const carousel = host.querySelector('.projectCarousel')!;
    const next = host.querySelector<HTMLButtonElement>('[aria-label="Next projects"]')!;
    if (reason === 'hover') act(() => carousel.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })));
    else act(() => next.focus());

    touch('touchstart');
    touch(ending);
    act(() => vi.advanceTimersByTime(6500));
    expect(active()).toBe('Go to project 1');

    if (reason === 'hover') act(() => carousel.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body })));
    else act(() => host.querySelector<HTMLButtonElement>('#outside-carousel')!.focus());
    act(() => vi.advanceTimersByTime(6500));
    expect(active()).toBe('Go to project 2');
  });

  it('clears the cancelled gesture without moving a slide or accepting a stale touchend', () => {
    touch('touchstart', 250);
    touch('touchcancel', 100);
    expect(active()).toBe('Go to project 1');
    touch('touchend', 100);
    expect(active()).toBe('Go to project 1');
  });
});
