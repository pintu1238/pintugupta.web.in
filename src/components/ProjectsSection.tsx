'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, CodeXml, CircleCheck, GitBranch as Github } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { portfolioContent, type Project } from '@/data/portfolio';
import SectionHeading from './SectionHeading';

const projects: Project[] = portfolioContent.projects;
const paddedProjects = [...projects.slice(-3), ...projects, ...projects.slice(0, 3)];
function subscribeResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}
// Match the CSS queries, including fractional widths at browser zoom levels.
const readColumns = () => window.matchMedia('(min-width: 1200px)').matches ? 3 : window.matchMedia('(min-width: 768px)').matches ? 2 : 1;

export default function ProjectsSection() {
  const [position, setPosition] = useState(3);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [touching, setTouching] = useState(false);
  const paused = hovered || focusWithin || touching;
  const columns = useSyncExternalStore(subscribeResize, readColumns, () => 3);
  const touchStart = useRef<number | null>(null);
  const moving = useRef(false);
  const count = projects.length;
  const activeIndex = ((position - 3) % count + count) % count;

  useEffect(() => {
    const resetForViewport = () => {
      // A resize cancels the in-flight transition, so transitionend may never fire.
      moving.current = false;
      setAnimate(false);
      setPosition((current) => ((current - 3) % count + count) % count + 3);
    };
    window.addEventListener('resize', resetForViewport);
    return () => window.removeEventListener('resize', resetForViewport);
  }, [count]);

  const move = (direction: number) => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setPosition((current) => current + direction);
  };

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !moving.current) {
        moving.current = true;
        setAnimate(true);
        setPosition((current) => current + 1);
      }
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const settle = () => {
    moving.current = false;
    if (position >= count + 3 || position < 3) {
      setAnimate(false);
      setPosition(activeIndex + 3);
    }
  };

  return (
    <section className="section projectsSection" id="projects" aria-label="Featured projects">
      <SectionHeading eyebrow="My work" title="Featured Projects" description="A collection of my work in AI, Data Science, and Full Stack Development." />
      <div className="projectCarousel" role="region" aria-roledescription="carousel" aria-label="Project showcase"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocusWithin(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false); }}
        onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
        <button className="carouselArrow carouselPrevious" onClick={() => move(-1)} aria-label="Previous projects"><ChevronLeft /></button>
        <div className="projectViewport"
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; setTouching(true); }}
          onTouchCancel={() => { touchStart.current = null; setTouching(false); }}
          onTouchEnd={(event) => { if (touchStart.current !== null) { const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1); } touchStart.current = null; setTouching(false); }}>
          <div className="projectTrack" style={{ transform: `translateX(calc(${-position} * 100% / var(--cards-visible)))`, transition: animate ? undefined : 'none' }}
            onTransitionEnd={(event) => { if (event.target === event.currentTarget) settle(); }}>
            {paddedProjects.map((project, index) => (
              <div className="projectSlide" key={`${project.title}-${index}`} inert={index < position || index >= position + columns}>
                <article className="projectCard card">
                  <div className="projectCardTop">
                    <span className="projectIcon"><CodeXml size={24} /></span>
                    <h3>{project.title}</h3>
                    {project.github && <a className="projectStars" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><Github size={15} /></a>}
                  </div>
                  <div className="chipRow">{project.stack.slice(0, 4).map((item) => <span className="chip" key={item}>{item}</span>)}{project.stack.length > 4 && <span className="chip" title={project.stack.slice(4).join(', ')}>+{project.stack.length - 4}</span>}</div>
                  <p>{project.description}</p>
                  <div className="achievementLine"><div><CircleCheck size={16} /><strong>Key Achievement</strong></div><span>{project.achievement}</span></div>
                  <div className="projectLinks">
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}>Source Code <ArrowUpRight size={16} /></a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>Live Demo <ArrowUpRight size={16} /></a>}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <button className="carouselArrow carouselNext" onClick={() => move(1)} aria-label="Next projects"><ChevronRight /></button>
        <div className="projectDots" aria-label="Choose project">{projects.map((project, index) => <button key={project.title} className={activeIndex === index ? 'active' : ''} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => { moving.current = false; setAnimate(true); setPosition(index + 3); }} aria-label={`Go to project ${index + 1}`} />)}</div>
      </div>
      <a href={portfolioContent.identity.github} className="button buttonGhost centeredButton" target="_blank" rel="noreferrer"><Github size={19} /> View More on GitHub <ArrowUpRight size={17} /></a>
    </section>
  );
}
