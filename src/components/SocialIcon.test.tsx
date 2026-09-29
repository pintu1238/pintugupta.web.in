import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import SocialIcon, { type SocialBrand } from './SocialIcon';

let host: HTMLDivElement;
let root: Root | undefined;

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  host = document.createElement('div');
  document.body.appendChild(host);
});

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  host.remove();
  vi.unstubAllGlobals();
});

it.each<SocialBrand>(['GitHub', 'LinkedIn', 'YouTube', 'LeetCode'])('hydrates the %s logo without replacing the server-rendered SVG', async (brand) => {
  const onRecoverableError = vi.fn();
  host.innerHTML = renderToString(<SocialIcon brand={brand} />);
  const serverSvg = host.firstElementChild;

  await act(async () => {
    root = hydrateRoot(host, <SocialIcon brand={brand} />, { onRecoverableError });
  });

  expect(onRecoverableError).not.toHaveBeenCalled();
  expect(host.firstElementChild).toBe(serverSvg);
  expect(host.querySelector('title')?.textContent).toBe(`${brand} logo`);
});
