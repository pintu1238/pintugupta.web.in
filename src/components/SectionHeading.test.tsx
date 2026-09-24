import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import SectionHeading from './SectionHeading';
import { getInitialTheme } from './ThemeProvider';

describe('SectionHeading', () => {
  it('renders the section label, title, and description', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow="Selected work" title="Projects" description="A few things I have built." />,
    );

    expect(html).toContain('Selected work');
    expect(html).toContain('Projects');
    expect(html).toContain('A few things I have built.');
  });
});

describe('getInitialTheme', () => {
  it('prefers a valid stored theme and falls back to the system theme', () => {
    expect(getInitialTheme('light', 'dark')).toBe('light');
    expect(getInitialTheme(null, 'light')).toBe('light');
    expect(getInitialTheme('unknown', 'dark')).toBe('dark');
  });
});
