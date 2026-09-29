import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioContent } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function AchievementsSection() {
  return (
    <section className="section" id="achievements">
      <SectionHeading eyebrow="Recognition & Gallery" title="My Achievements" description="Learning milestones, certificates and a clearly labeled creative portrait gallery." />
      <div className="achievementGrid">{portfolioContent.achievements.map((achievement, index) => (
        <ScrollReveal key={achievement.title} delay={index * 70}>
          <article className={`achievementCard card accent-${achievement.accent}`}>
            <a className={`achievementVisual ${achievement.kind === 'certificate' ? 'certificateVisual' : ''} ${achievement.title === 'On Stage' ? 'stageVisual' : ''}`} href={achievement.href} target="_blank" rel="noreferrer" aria-label={`${achievement.kind === 'certificate' ? 'Open original certificate' : achievement.kind === 'illustration' ? 'Open AI-edited illustration' : 'Open event photo'}: ${achievement.title}`}>
              <Image src={achievement.image} alt={achievement.imageAlt} fill sizes="(max-width: 767px) 448px, (max-width: 1023px) 50vw, 448px" style={{ objectFit: achievement.kind === 'certificate' ? 'contain' : 'cover' }} />
              {achievement.kind === 'illustration' && <span className="illustrationLabel">AI-edited illustration</span>}
              <span className="mediaOpen"><ArrowUpRight size={18} /></span>
            </a>
            <div className="achievementBody"><h3>{achievement.title}</h3><strong>{achievement.result}</strong><p>{achievement.description}</p></div>
          </article>
        </ScrollReveal>
      ))}</div>
    </section>
  );
}
