'use client';

import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { portfolioContent } from '@/data/portfolio';

const links = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

export default function PortfolioNav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="siteNavWrap">
      <nav className="siteNav" aria-label="Main navigation">
        <a className="brandMark" href="#top" aria-label="Back to top">
          <span className="brandIcon">&lt;/&gt;</span>
          <span>{portfolioContent.identity.shortName}</span>
        </a>
        <div className={`navLinks ${menuOpen ? 'navLinksOpen' : ''}`}>
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
        <div className="navActions">
          <button className="iconButton themeToggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="navResume" href="#contact">Resume <span>↗</span></a>
          <button className="iconButton navMenuButton" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
