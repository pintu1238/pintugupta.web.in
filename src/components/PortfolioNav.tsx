'use client';

import { useEffect, useState } from 'react';
import { BriefcaseBusiness, Download, GraduationCap, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { portfolioContent } from '@/data/portfolio';

const links = [
  ['Experience / Education', '#experience'],
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Skills', '#achievements'],
  ['Contact', '#contact'],
];

export default function PortfolioNav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const update = () => {
      let next = '';
      for (const [, href] of links) {
        const section = document.querySelector(href);
        if (section && section.getBoundingClientRect().top <= 180) next = href;
      }
      setActive(next);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="siteNavWrap">
      <nav className="siteNav" aria-label="Main navigation">
        <div className="navStart">
          <button className="iconButton themeToggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="brandMark navBrand" href="#top" aria-label="Back to top">
          <span className="brandIcon">&lt;/&gt;</span>
          <span>{portfolioContent.identity.shortName}</span>
          </a>
        </div>
        <div className="navLinks">
          {links.map(([label, href]) => (
            <a href={href} key={href} className={active === href ? 'navActive' : ''} aria-current={active === href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{href === '#experience' ? <><BriefcaseBusiness size={14} /> Experience <span>/</span> <GraduationCap size={15} /> Education</> : label}</a>
          ))}
        </div>
        <div className="navActions">
          <a className="navResume" href={portfolioContent.identity.resume} download="Pintu_Kumar_Resume.pdf">Resume <Download size={15} /></a>
          <button className="iconButton navMenuButton" onClick={() => setMenuOpen((open) => !open)} aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <nav id="mobile-navigation" className={`mobileNavigation ${menuOpen ? 'mobileNavigationOpen' : ''}`} aria-label="Mobile navigation">
        {links.map(([label, href]) => <a href={href} key={href} className={active === href ? 'navActive' : ''} aria-current={active === href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="navResume" href={portfolioContent.identity.resume} download="Pintu_Kumar_Resume.pdf" onClick={() => setMenuOpen(false)}>Resume <Download size={15} /></a>
      </nav>
    </header>
  );
}
