'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, GitBranch, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { portfolioContent } from '@/data/portfolio';
import { getNextIndex } from '@/lib/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectCount = portfolioContent.projects.length;
  const visibleProjects = [0, 1, 2].map((offset) => portfolioContent.projects[(activeIndex + offset) % projectCount]);

  const changePage = (direction: 'next' | 'previous') => {
    setActiveIndex(getNextIndex(activeIndex, projectCount, direction));
  };

  return (
    <section className="section projectsSection" id="projects">
      <SectionHeading eyebrow="My work" title="Featured Projects" description="A collection of full stack, AI, and machine learning products built with curiosity and care." />
      <div className="projectControls"><button className="roundButton" onClick={() => changePage('previous')} aria-label="Previous projects"><ChevronLeft size={19} /></button><span>{String(activeIndex + 1).padStart(2, '0')} <em>/ {String(projectCount).padStart(2, '0')}</em></span><button className="roundButton" onClick={() => changePage('next')} aria-label="Next projects"><ChevronRight size={19} /></button></div>
      <div className="projectGrid">
        {visibleProjects.map((project, index) => (
          <ScrollReveal key={`${project.title}-${activeIndex}`} delay={index * 90}>
            <article className={`projectCard card accent-${project.accent}`}>
              <div className="projectCardTop"><span className="projectIcon"><Code2Icon /></span><span className="projectCategory">{project.category}</span></div>
              <h3>{project.title}</h3>
              <div className="chipRow">{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
              <p>{project.description}</p>
              <div className="achievementLine"><Sparkles size={15} /><span>{project.achievement}</span></div>
              <div className="projectLinks"><a href={project.github || '#'} aria-label={`${project.title} source code`}> <GitBranch size={17} /> Source code</a>{project.demo && <a href={project.demo} aria-label={`${project.title} live demo`}>Live demo <ExternalLink size={15} /></a>}</div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <div className="projectDots" aria-label="Projects">{portfolioContent.projects.map((project, index) => <button key={project.title} className={activeIndex === index ? 'active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Go to project ${index + 1}`} />)}</div>
      <a href="https://github.com" className="button buttonGhost centeredButton" target="_blank" rel="noreferrer">View more on GitHub <ArrowUpRight size={17} /></a>
    </section>
  );
}

function Code2Icon() {
  return <span className="codeGlyph">&lt;/&gt;</span>;
}
