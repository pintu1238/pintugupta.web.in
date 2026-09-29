import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ContactSection from './ContactSection';

let host: HTMLDivElement;
let root: Root;
const fetcher = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    disconnect() {}
  });
  fetcher.mockReset();
  vi.stubGlobal('fetch', fetcher);
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<ContactSection />));
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

function fill(name: string, value: string) {
  const field = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)!;
  const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  act(() => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(field, value);
    field.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function validMessage() {
  fill('name', 'Portfolio QA');
  fill('email', 'qa@example.com');
  fill('message', 'An automated contact form regression test.');
}

const submit = () => host.querySelector<HTMLButtonElement>('.submitButton')!;

describe('contact social profiles', () => {
  it('links each requested profile once with its own brand logo', () => {
    const links = [...host.querySelectorAll<HTMLAnchorElement>('.socialLinks a')];
    expect(links.map((link) => [link.getAttribute('aria-label'), link.href])).toEqual([
      ['GitHub', 'https://github.com/pintu1238'],
      ['LinkedIn', 'https://www.linkedin.com/in/pintu-gupta-834254251/'],
      ['YouTube', 'https://www.youtube.com/@CoderBoyz-g1j'],
      ['LeetCode', 'https://leetcode.com/u/pintu_kumar5161/'],
    ]);
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.relList.contains('noreferrer')).toBe(true);
      const logo = link.querySelector('svg');
      expect(logo?.querySelector('title')?.textContent).toBe(`${link.getAttribute('aria-label')} logo`);
      expect(logo?.getAttribute('aria-hidden')).toBe('true');
      expect(logo?.querySelector('path')?.getAttribute('d')).toBeTruthy();
    }
  });
});

describe('contact form user actions', () => {
  it('rejects missing, whitespace-only and invalid email fields before sending', () => {
    expect(submit().disabled).toBe(true);
    validMessage();
    expect(submit().disabled).toBe(false);
    fill('email', 'not-an-email');
    expect(submit().disabled).toBe(true);
    fill('email', 'qa@example.com');
    fill('name', '   ');
    expect(submit().disabled).toBe(true);
    fill('name', 'Portfolio QA');
    fill('message', '   ');
    expect(submit().disabled).toBe(true);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('sends the entered message once, disables duplicate submission, then resets after success', async () => {
    let finish!: (response: Response) => void;
    fetcher.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
    validMessage();
    fill('subject', 'QA inquiry');
    await act(async () => submit().click());
    expect(submit().disabled).toBe(true);
    expect(submit().textContent).toContain('Sending');
    await act(async () => host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(fetcher).toHaveBeenCalledTimes(1);
    const request = fetcher.mock.calls[0][1]!;
    expect(request.method).toBe('POST');
    expect(JSON.parse(request.body as string)).toEqual({ name: 'Portfolio QA', email: 'qa@example.com', subject: 'QA inquiry', message: 'An automated contact form regression test.' });
    await act(async () => finish(new Response(JSON.stringify({ ok: true }), { status: 201 })));
    expect(host.querySelector('[role="status"]')?.textContent).toContain('Message sent');
    expect([...host.querySelectorAll<HTMLInputElement>('input, textarea')].every((field) => field.value === '')).toBe(true);
    expect(submit().disabled).toBe(true);
  });

  it('retains the draft after a server failure and allows a successful retry', async () => {
    fetcher.mockResolvedValueOnce(new Response(JSON.stringify({ ok: false, message: 'Please try again.' }), { status: 503 }));
    validMessage();
    await act(async () => submit().click());
    expect(host.querySelector('[role="status"]')?.textContent).toBe('Please try again.');
    expect(host.querySelector<HTMLTextAreaElement>('textarea')?.value).toBe('An automated contact form regression test.');
    expect(submit().disabled).toBe(false);
    fetcher.mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 201 }));
    await act(async () => submit().click());
    expect(host.querySelector('[role="status"]')?.textContent).toContain('Message sent');
  });

  it('recovers from a network rejection without losing the message', async () => {
    fetcher.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    validMessage();
    await act(async () => submit().click());
    expect(host.querySelector('[role="status"]')?.textContent).toContain('unavailable');
    expect(host.querySelector<HTMLInputElement>('[name="email"]')?.value).toBe('qa@example.com');
    expect(submit().disabled).toBe(false);
  });
});
