import { Award, BrainCircuit, Trophy } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const icons = [Trophy, Award, BrainCircuit, Trophy];

export default function AchievementsSection() {
  return (
    <section className="section" id="achievements">
      <SectionHeading eyebrow="Recognition" title="Achievements" description="A few milestones that reflect the habit of learning, experimenting, and showing up." />
      <div className="achievementGrid">{portfolioContent.achievements.map((achievement, index) => {
        const Icon = icons[index % icons.length];
        return <ScrollReveal key={achievement.title} delay={index * 70}><article className={`achievementCard card accent-${achievement.accent}`}><div className="achievementVisual"><span>{achievement.imageLabel}</span><Icon size={26} /></div><div className="achievementBody"><h3>{achievement.title}</h3><strong>{achievement.result}</strong><p>{achievement.description}</p></div></article></ScrollReveal>;
      })}</div>
    </section>
  );
}
