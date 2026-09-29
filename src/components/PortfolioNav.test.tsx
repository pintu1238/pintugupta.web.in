import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PortfolioNav from './PortfolioNav';
import SkillsSection from './SkillsSection';
import { ThemeProvider } from './ThemeProvider';

describe('PortfolioNav navigation', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
    vi.stubGlobal('matchMedia', vi.fn((media: string) => ({
      matches: false, media, onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
    })));
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function renderNavigation() {
    await act(async () => root.render(
      <ThemeProvider>
        <PortfolioNav />
        <section id="achievements">Certificates</section>
        <SkillsSection />
      </ThemeProvider>,
    ));
  }

  function skillsLinks() {
    return Array.from(container.querySelectorAll('nav a')).filter((link) => link.textContent === 'Skills');
  }

  it('targets the actual skills section from both desktop and mobile menus', async () => {
    await renderNavigation();
    const skills = container.querySelector('section[aria-labelledby="skills-title"]');
    expect(skills).not.toBeNull();
    expect(skillsLinks()).toHaveLength(2);
    for (const link of skillsLinks()) {
      expect(link.getAttribute('href')).toBe('#skills');
      expect(document.querySelector(link.getAttribute('href')!)).toBe(skills);
    }
  });

  it('highlights Skills when its own section is reached, not when achievements is reached', async () => {
    await renderNavigation();
    const skills = container.querySelector('#skills')!;
    const achievements = container.querySelector('#achievements')!;
    vi.spyOn(achievements, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 900, 500));
    const skillsBounds = vi.spyOn(skills, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 600, 900, 300));

    await act(async () => window.dispatchEvent(new Event('scroll')));
    for (const link of skillsLinks()) expect(link.hasAttribute('aria-current')).toBe(false);

    skillsBounds.mockReturnValue(new DOMRect(0, 120, 900, 300));
    await act(async () => window.dispatchEvent(new Event('scroll')));
    for (const link of skillsLinks()) expect(link.getAttribute('aria-current')).toBe('location');
  });

  it.each(['toggle', 'menu link'])('closes the mobile menu with Escape from the %s and restores toggle focus', async (origin) => {
    await renderNavigation();
    const toggle = container.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')!;
    await act(async () => toggle.click());
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    const target = origin === 'toggle' ? toggle : container.querySelector<HTMLAnchorElement>('#mobile-navigation a')!;
    target.focus();
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    await act(async () => target.dispatchEvent(event));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('#mobile-navigation')?.classList.contains('mobileNavigationOpen')).toBe(false);
    expect(document.activeElement).toBe(toggle);
    expect(event.defaultPrevented).toBe(true);
  });
});
