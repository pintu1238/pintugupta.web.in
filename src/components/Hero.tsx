'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';

export default function Hero() {
  const { identity } = portfolioContent;
  const [role, setRole] = useState(identity.roles[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let index = 0;
    let length = identity.roles[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const current = identity.roles[index];
      length += deleting ? -1 : 1;
      setRole(current.slice(0, length));
      let delay = deleting ? 38 : 70;
      if (length === 0) { deleting = false; index = (index + 1) % identity.roles.length; delay = 300; }
      else if (length === current.length && !deleting) { deleting = true; delay = 2600; }
      timer = setTimeout(type, delay);
    };
    timer = setTimeout(type, 2600);
    return () => clearTimeout(timer);
  }, [identity.roles]);

  return (
    <section className="hero section" id="top">
      <div className="heroCopy">
        <p className="heroGreeting">{identity.eyebrow}</p>
        <h1 aria-label={identity.roles.join(', ')}><span aria-hidden="true">{role}<i className="typingCursor" /></span></h1>
        <p className="heroHeadline">{identity.headline}</p>
        <p className="heroSummary">{identity.summary}</p>
        <div className="heroActions">
          <a className="button buttonPrimary" href="#projects">View My Projects <ArrowRight size={20} /></a>
          <a className="button buttonGhost" href="#contact">Get In Touch <ArrowRight size={20} /></a>
        </div>
      </div>
      <div className="heroVisual">
        <div className="heroScene">
          <div className="heroGlow" />
          <div className="orbit orbitOne" aria-hidden="true" />
          <div className="orbit orbitTwo" aria-hidden="true" />
          <div className="orbitParticles" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="avatarCard">
            <Image src={identity.profileImage} alt="Pintu Kumar" width={560} height={560} sizes="(min-width: 1280px) 280px, (min-width: 768px) 246px, 200px" preload />
          </div>
          <span className="codeLabel labelTop" aria-hidden="true">&lt;AI/&gt;</span>
          <span className="codeLabel labelLeft" aria-hidden="true">def()</span>
          <span className="codeLabel labelBottom" aria-hidden="true">[Data]</span>
          <span className="codeLabel labelML" aria-hidden="true">{'{ML}'}</span>
        </div>
      </div>
    </section>
  );
}
