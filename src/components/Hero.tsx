'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Code2, Database, Sparkles, Terminal } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';

export default function Hero() {
  const { identity } = portfolioContent;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % identity.roles.length), 2800);
    return () => window.clearInterval(timer);
  }, [identity.roles.length]);

  return (
    <section className="hero section" id="top">
      <div className="heroCopy">
        <p className="heroGreeting">{identity.eyebrow}</p>
        <h1><span>{identity.roles[roleIndex]}</span><i className="typingCursor" aria-hidden="true" /></h1>
        <p className="heroHeadline">{identity.headline}</p>
        <p className="heroSummary">{identity.summary}</p>
        <div className="heroActions">
          <a className="button buttonPrimary" href="#projects">View my projects <ArrowRight size={17} /></a>
          <a className="button buttonGhost" href="#contact">Get in touch <ArrowRight size={17} /></a>
        </div>
        <a className="scrollHint" href="#experience"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      </div>
      <div className="heroVisual" aria-label="Abstract developer profile visual">
        <div className="orbit orbitOne" />
        <div className="orbit orbitTwo" />
        <div className="orbit orbitThree" />
        <div className="heroGlow" />
        <div className="avatarCard">{identity.profileImage ? <Image src={identity.profileImage} alt={`${identity.name} profile`} width={190} height={230} priority /> : <span>{identity.shortName}</span>}<small>build / learn / ship</small></div>
        <span className="codeLabel labelTop"><Code2 size={14} /> &lt;AI /&gt;</span>
        <span className="codeLabel labelLeft"><Terminal size={14} /> def()</span>
        <span className="codeLabel labelBottom"><Database size={14} /> data</span>
        <div className="floatingTag tagOne"><Sparkles size={13} /> AI systems</div>
        <div className="floatingTag tagTwo">&lt; / &gt;</div>
      </div>
    </section>
  );
}
