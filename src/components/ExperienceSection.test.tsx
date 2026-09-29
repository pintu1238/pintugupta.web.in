import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ExperienceSection from './ExperienceSection';

describe('ExperienceSection', () => {
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
    // jsdom does not provide the visibility API used by ScrollReveal.
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      disconnect() {}
    });
    host = document.createElement('div');
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<ExperienceSection />));
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    vi.unstubAllGlobals();
  });

  function tabs() {
    return Array.from(host.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  }

  function press(button: HTMLButtonElement, key: string) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    act(() => button.dispatchEvent(event));
    return event;
  }

  it('renders the five approved roles newest first with the correct company and period', () => {
    const cards = [...host.querySelectorAll('.timelineButton')];
    expect(cards.map((card) => ({
      title: card.querySelector('strong')?.textContent,
      company: card.querySelector('b')?.textContent,
      period: card.querySelector('small:last-child')?.textContent?.trim(),
    }))).toEqual([
      { title: 'Backend Developer & AI/ML Developer', company: 'Code Crafter', period: 'July 2026 – Present' },
      { title: 'AI/ML Engineer Intern', company: 'iplairani.com', period: 'January 2026 – June 2026' },
      { title: 'Backend Developer Intern', company: 'Globiz Technology', period: 'June 2025 – December 2025' },
      { title: 'Software Developer Intern', company: 'ITJOBXS', period: 'May 2025 – June 2025' },
      { title: 'Machine Learning Intern', company: 'Wayspire', period: 'June 2024 – August 2024' },
    ]);
  });

  it('opens the matching role description for each company and closes the previous card', () => {
    for (const [company, topics] of [
      ['Code Crafter', ['Java', 'Spring Boot', 'AI/ML']],
      ['iplairani.com', ['RAG', 'LangChain', 'Ollama', 'FastAPI', 'fine-tuning', 'MLOps']],
      ['Globiz Technology', ['Java', 'Spring Boot', 'Hibernate', 'SQL']],
      ['ITJOBXS', ['responsive', 'authentication', 'SQL']],
      ['Wayspire', ['Python', 'data cleaning', 'machine learning']],
    ] as const) {
      const button = [...host.querySelectorAll<HTMLButtonElement>('.timelineButton')]
        .find((item) => item.querySelector('b')?.textContent === company);
      expect(button, `Missing experience for ${company}`).toBeDefined();
      act(() => button!.click());
      expect(button!.getAttribute('aria-expanded')).toBe('true');
      expect(host.querySelectorAll('.timelineDetails')).toHaveLength(1);
      const details = button!.closest('article')!.querySelector('.timelineDetails')!;
      expect(details.querySelectorAll('li').length).toBeGreaterThanOrEqual(3);
      for (const topic of topics) expect(details.textContent).toContain(topic);
    }
  });

  it('omits an unspecified company location while preserving supplied locations', () => {
    const cards = [...host.querySelectorAll('.timelineButton')];
    expect(cards[0].querySelector('small span')).toBeNull();
    expect(cards[1].querySelector('small span')?.textContent).toContain('Delhi, India');
  });

  it('moves focus and selection with arrows, wraps at both ends, and supports Home/End', () => {
    const [experience, education] = tabs();
    act(() => experience.focus());
    for (const [key, expected] of [
      ['ArrowRight', education], ['ArrowRight', experience],
      ['ArrowLeft', education], ['ArrowLeft', experience],
      ['End', education], ['Home', experience],
    ] as const) {
      const event = press(document.activeElement as HTMLButtonElement, key);
      expect(document.activeElement, key).toBe(expected);
      expect(expected.getAttribute('aria-selected'), key).toBe('true');
      expect(expected.tabIndex).toBe(0);
      expect(tabs().filter((button) => button.tabIndex === 0)).toHaveLength(1);
      expect(event.defaultPrevented).toBe(true);
    }
    expect(press(experience, 'ArrowDown').defaultPrevented).toBe(false);
    expect(press(experience, 'Tab').defaultPrevented).toBe(false);
  });

  it('connects each tab to its panel and keeps only the selected panel visible', () => {
    const [experience, education] = tabs();
    for (const button of tabs()) {
      const panel = document.getElementById(button.getAttribute('aria-controls') ?? '');
      expect(panel?.getAttribute('role')).toBe('tabpanel');
      expect(panel?.getAttribute('aria-labelledby')).toBe(button.id);
    }
    expect(experience.tabIndex).toBe(0);
    expect(education.tabIndex).toBe(-1);
    act(() => education.click());
    const visible = host.querySelectorAll<HTMLElement>('[role="tabpanel"]:not([hidden])');
    expect(visible).toHaveLength(1);
    expect(visible[0].id).toBe(education.getAttribute('aria-controls'));
    expect(visible[0].querySelectorAll('.timelineButton').length).toBeGreaterThan(0);
  });

  it('preserves accordion toggling and resets expanded items when changing tabs by keyboard', () => {
    const [experience, education] = tabs();
    const firstItem = host.querySelector<HTMLButtonElement>('.timelineButton')!;
    act(() => firstItem.click());
    expect(firstItem.getAttribute('aria-expanded')).toBe('true');
    act(() => firstItem.click());
    expect(firstItem.getAttribute('aria-expanded')).toBe('false');
    act(() => firstItem.click());
    act(() => experience.focus());
    press(experience, 'ArrowRight');
    expect(education.getAttribute('aria-selected')).toBe('true');
    expect(host.querySelectorAll('[aria-expanded="true"]')).toHaveLength(0);
    press(education, 'ArrowLeft');
    expect(host.querySelectorAll('[aria-expanded="true"]')).toHaveLength(0);
  });
});
