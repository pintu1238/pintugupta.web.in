'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, GitBranch, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { portfolioContent } from '@/data/portfolio';
import { getNextIndex, getProjectPage } from '@/lib/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function ProjectsSection() {
  const [page, setPage] = useState(1);
  const projectPage = getProjectPage(portfolioContent.projects, page, 3);

  const changePage = (direction: 'next' | 'previous') => {
    setPage(getNextIndex(projectPage.page - 1, projectPage.pageCount, direction) + 1);
  };

  return (
    <section className="section projectsSection" id="projects">
      <SectionHeading eyebrow="Selected work" title="Featured Projects" description="A collection of full stack, AI, and machine learning products built with curiosity and care." />
      <div className="projectControls"><button className="roundButton" onClick={() => changePage('previous')} aria-label="Previous projects"><ChevronLeft size={19} /></button><span>0{projectPage.page} <em>/ 0{projectPage.pageCount}</em></span><button className="roundButton" onClick={() => changePage('next')} aria-label="Next projects"><ChevronRight size={19} /></button></div>
      <div className="projectGrid">
        {projectPage.items.map((project, index) => (
          <ScrollReveal key={project.title} delay={index * 90}>
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
      <div className="projectDots" aria-label="Project pages">{Array.from({ length: projectPage.pageCount }, (_, index) => <button key={index} className={projectPage.page === index + 1 ? 'active' : ''} onClick={() => setPage(index + 1)} aria-label={`Go to project page ${index + 1}`} />)}</div>
      <a href="https://github.com" className="button buttonGhost centeredButton" target="_blank" rel="noreferrer">View more on GitHub <ArrowUpRight size={17} /></a>
    </section>
  );
}

function Code2Icon() {
  return <span className="codeGlyph">&lt;/&gt;</span>;
}
