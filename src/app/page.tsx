import PortfolioNav from '@/components/PortfolioNav';
import Hero from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import AchievementsSection from '@/components/AchievementsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="siteShell">
      <PortfolioNav />
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <AchievementsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
