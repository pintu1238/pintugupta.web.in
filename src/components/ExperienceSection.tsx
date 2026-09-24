'use client';

import { useState } from 'react';
import { BriefcaseBusiness, CalendarDays, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { portfolioContent, TimelineItem } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

type Tab = 'experience' | 'education';

export default function ExperienceSection() {
  const [tab, setTab] = useState<Tab>('experience');
  const [openItem, setOpenItem] = useState(0);
  const items = (tab === 'experience' ? portfolioContent.experience : portfolioContent.education) as TimelineItem[];

  return (
    <section className="section" id="experience">
      <SectionHeading eyebrow="Professional journey" title="Experience & Education" description="A timeline of the work, learning, and experiments that shaped how I build." />
      <div className="tabSwitch" role="tablist" aria-label="Experience and education">
        <button className={tab === 'experience' ? 'active' : ''} onClick={() => { setTab('experience'); setOpenItem(0); }} role="tab" aria-selected={tab === 'experience'}><BriefcaseBusiness size={17} /> Experience</button>
        <button className={tab === 'education' ? 'active' : ''} onClick={() => { setTab('education'); setOpenItem(0); }} role="tab" aria-selected={tab === 'education'}><GraduationCap size={17} /> Education</button>
      </div>
      <div className="timeline">
        {items.map((item, index) => {
          const isOpen = index === openItem;
          return (
            <ScrollReveal key={`${tab}-${item.title}`} delay={index * 70} className="timelineRow">
              <div className="timelineRail"><span className="timelineIcon">{tab === 'experience' ? <BriefcaseBusiness size={18} /> : <GraduationCap size={18} />}</span>{index !== items.length - 1 && <span className="timelineLine" />}</div>
              <article className={`timelineCard card ${isOpen ? 'timelineCardOpen' : ''}`}>
                <button className="timelineButton" onClick={() => setOpenItem(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span><strong>{item.title}</strong><small><b>{item.organization}</b><span><MapPin size={14} /> {item.location}</span></small><small><CalendarDays size={14} /> {item.period}</small></span>
                  <ChevronDown size={20} className={isOpen ? 'rotate' : ''} />
                </button>
                {isOpen && <div className="timelineDetails"><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>}
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
