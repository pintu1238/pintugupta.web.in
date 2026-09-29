import { CodeXml } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';

export default function SkillsSection() {
  return (
    <section className="section skillsSection" id="skills" aria-labelledby="skills-title">
      <div className="skillHeading"><span className="eyebrow"><span className="eyebrowDot" />Tech stack</span><h2 id="skills-title">Core Technical <span>Skills</span></h2></div>
      <div className="skillsWindow">
        <div className="skillsTrack">
          {[0, 1].map((copy) => <div className="skillsSet" key={copy} aria-hidden={copy === 1 ? true : undefined}>{portfolioContent.techStack.map((skill) => <span className="skillPill" key={skill}><CodeXml size={16} />{skill}</span>)}</div>)}
        </div>
      </div>
    </section>
  );
}
