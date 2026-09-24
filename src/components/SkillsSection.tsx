import { BarChart3, Bot, CodeXml, Database, Layers3, Sparkles } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const groups = [
  { label: 'Frontend & Backend', icon: CodeXml, items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express.js'] },
  { label: 'Data & Infrastructure', icon: Database, items: ['PostgreSQL', 'Supabase', 'SQL', 'APIs', 'AWS'] },
  { label: 'AI & Machine Learning', icon: Bot, items: ['Machine Learning', 'Generative AI', 'RAG', 'AI Agents', 'Computer Vision'] },
  { label: 'Analytics & Craft', icon: BarChart3, items: ['Python', 'FastAPI', 'Evaluation', 'Data Viz', 'Git'] },
];

export default function SkillsSection() {
  return (
    <section className="section skillsSection" id="skills">
      <SectionHeading eyebrow="Technical toolkit" title="Skills & Tools" description="The tools I reach for when moving from a blank canvas to a dependable product." />
      <div className="skillGroups">{groups.map((group, index) => { const Icon = group.icon; return <ScrollReveal key={group.label} delay={index * 70}><article className="skillGroup card"><div className="infoCardTitle"><span className="infoIcon"><Icon size={17} /></span><h3>{group.label}</h3></div><div className="chipRow">{group.items.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div></article></ScrollReveal>; })}</div>
      <ScrollReveal className="techMarquee card" delay={80}><div className="marqueeLabel"><Layers3 size={16} /> Core stack</div><div className="marqueeItems">{portfolioContent.techStack.map((skill) => <span key={skill}><Sparkles size={12} /> {skill}</span>)}</div></ScrollReveal>
    </section>
  );
}
