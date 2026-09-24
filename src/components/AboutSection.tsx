import { ArrowRight, Heart, MapPin } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  const { identity, about } = portfolioContent;

  return (
    <section className="section" id="about">
      <SectionHeading eyebrow="Who I am" title="About Me" description="A glimpse into my journey and expertise in AI and data." />
      <div className="aboutGrid">
        <ScrollReveal className="aboutCopy card">
          <div className="profileHeading"><div className="miniAvatar">{identity.shortName}</div><div><h3>{identity.name}</h3><p>Full Stack Developer · AI Engineer</p><span><MapPin size={14} /> {identity.location}</span></div></div>
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="button buttonPrimary smallButton" href="#contact">Let&apos;s connect <ArrowRight size={16} /></a>
        </ScrollReveal>
        <div className="aboutSide">
          <ScrollReveal className="infoCard card">
            <div className="infoCardTitle"><span className="infoIcon">&lt;/&gt;</span><h3>Key Skills</h3></div>
            <div className="chipRow">{about.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
          </ScrollReveal>
          <ScrollReveal className="infoCard card" delay={100}>
            <div className="infoCardTitle"><span className="infoIcon heartIcon"><Heart size={16} fill="currentColor" /></span><h3>Interests</h3></div>
            <div className="chipRow">{about.interests.map((interest) => <span className="chip" key={interest}>{interest}</span>)}</div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
