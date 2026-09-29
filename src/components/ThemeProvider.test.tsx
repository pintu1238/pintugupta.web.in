import { act } from 'react';
import { createRoot, hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PortfolioNav from './PortfolioNav';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider hydration and persistence', () => {
  let host: HTMLDivElement;
  let root: Root | undefined;
  let systemLight: boolean;

  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
    systemLight = false;
    vi.stubGlobal('matchMedia', (media: string) => ({
      matches: systemLight, media, onchange: null,
      addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
    }));
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
    host = document.createElement('div');
    document.body.append(host);
  });

  afterEach(() => {
    if (root) act(() => root!.unmount());
    root = undefined;
    host.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  const app = <ThemeProvider><PortfolioNav /></ThemeProvider>;

  function serverHtml() {
    const browserWindow = window;
    vi.stubGlobal('window', undefined);
    try {
      return renderToString(app);
    } finally {
      vi.stubGlobal('window', browserWindow);
    }
  }

  it.each([
    ['light', false, 'light'],
    ['dark', true, 'dark'],
    [null, true, 'light'],
    ['invalid', false, 'dark'],
  ] as const)('hydrates stored=%s/systemLight=%s without rebuilding server content', async (stored, light, expected) => {
    if (stored) window.localStorage.setItem('portfolio-theme', stored);
    systemLight = light;
    host.innerHTML = serverHtml();
    const serverHeader = host.firstElementChild;
    const onRecoverableError = vi.fn();
    await act(async () => { root = hydrateRoot(host, app, { onRecoverableError }); });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(host.firstElementChild).toBe(serverHeader);
    expect(document.documentElement.dataset.theme).toBe(expected);
    expect(host.querySelector('.themeToggle')?.getAttribute('aria-label')).toBe(`Switch to ${expected === 'light' ? 'dark' : 'light'} mode`);
    expect(window.localStorage.getItem('portfolio-theme')).toBe(expected);
  });

  it('persists a toggled theme and restores it after a fresh hydration', async () => {
    host.innerHTML = serverHtml();
    await act(async () => { root = hydrateRoot(host, app); });
    act(() => host.querySelector<HTMLButtonElement>('.themeToggle')!.click());
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');
    act(() => root!.unmount());
    root = undefined;
    host.innerHTML = serverHtml();
    const onRecoverableError = vi.fn();
    await act(async () => { root = hydrateRoot(host, app, { onRecoverableError }); });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('keeps the toggle usable when accessing localStorage is blocked', () => {
    systemLight = true;
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage blocked', 'SecurityError');
    });
    root = createRoot(host);
    act(() => root!.render(app));
    expect(document.documentElement.dataset.theme).toBe('light');
    act(() => host.querySelector<HTMLButtonElement>('.themeToggle')!.click());
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
