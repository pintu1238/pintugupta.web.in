import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import AchievementsSection from './AchievementsSection';

describe('AchievementsSection', () => {
  it('shows the two certificates and hackathon without the removed gallery cards', () => {
    const container = document.createElement('div');
    container.innerHTML = renderToStaticMarkup(<AchievementsSection />);

    const cards = Array.from(container.querySelectorAll('article'));
    expect(cards.map((card) => card.querySelector('h3')?.textContent)).toEqual([
      'AWS Academy Machine Learning Foundations',
      'Hackathon',
      'GNA University DevOps Bootcamp',
    ]);
    expect(cards.map((card) => card.querySelector('a')?.getAttribute('href'))).toEqual([
      '/portfolio-media/certificate-1709348196874.pdf',
      '/portfolio-media/pintu-hackathon-top-10.png',
      '/portfolio-media/certificate-1727362794680.pdf',
    ]);
  });
});
