import { ArrowUp, MapPin } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';

export default function Footer() {
  return <footer className="footer"><div className="footerInner"><a className="brandMark" href="#top"><span className="brandIcon">&lt;/&gt;</span><span>{portfolioContent.identity.name}</span></a><div className="footerLinks"><a href="#projects">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="backTop" href="#top">Back to top <ArrowUp size={15} /></a></div><div className="footerBottom"><span>© {new Date().getFullYear()} {portfolioContent.identity.name}. All rights reserved.</span><span><MapPin size={14} /> {portfolioContent.identity.location}</span></div></footer>;
}
