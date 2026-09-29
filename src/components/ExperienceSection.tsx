'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { BriefcaseBusiness, CalendarDays, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { portfolioContent, TimelineItem } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

type Tab = 'experience' | 'education';
const tabs: Tab[] = ['experience', 'education'];

export default function ExperienceSection() {
  const id = useId();
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ experience: null, education: null });
  const [tab, setTab] = useState<Tab>('experience');
  const [openItem, setOpenItem] = useState(-1);
  const items = (tab === 'experience' ? portfolioContent.experience : portfolioContent.education) as TimelineItem[];

  function selectTab(next: Tab) {
    setTab(next);
    setOpenItem(-1);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: Tab) {
    const index = tabs.indexOf(current);
    let next: Tab;
    switch (event.key) {
      case 'ArrowRight': next = tabs[(index + 1) % tabs.length]; break;
      case 'ArrowLeft': next = tabs[(index - 1 + tabs.length) % tabs.length]; break;
      case 'Home': next = tabs[0]; break;
      case 'End': next = tabs[tabs.length - 1]; break;
      default: return;
    }
    event.preventDefault();
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="section" id="experience">
      <SectionHeading eyebrow="Experience" title="Professional Journey" description="Experiences that defined my professional growth and skills." />
      <div className="tabSwitch" role="tablist" aria-label="Experience and education">
        {tabs.map((value) => (
          <button key={value} ref={(node) => { tabRefs.current[value] = node; }}
            id={`${id}-${value}-tab`} className={tab === value ? 'active' : ''}
            onClick={() => selectTab(value)} onFocus={() => { if (tab !== value) selectTab(value); }}
            onKeyDown={(event) => handleTabKeyDown(event, value)} role="tab"
            aria-selected={tab === value} aria-controls={`${id}-${value}-panel`} tabIndex={tab === value ? 0 : -1}>
            {value === 'experience' ? <><BriefcaseBusiness size={20} /> Experience</> : <><GraduationCap size={20} /> Education</>}
          </button>
        ))}
      </div>
      {tabs.map((value) => (
      <div key={value} className="timeline" role="tabpanel" id={`${id}-${value}-panel`} aria-labelledby={`${id}-${value}-tab`} hidden={tab !== value}>
        {tab === value && items.map((item, index) => {
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
      ))}
    </section>
  );
}
