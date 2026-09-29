type SectionHeadingProps = { eyebrow: string; title: string; description: string };

const ghosts: Record<string, string> = {
  Experience: 'CAREER', 'My work': 'WORK', 'Who I am': 'ABOUT',
  Recognition: 'MILESTONES', 'Recognition & Gallery': 'GALLERY', 'Tech stack': 'SKILLS', Contact: 'CONTACT',
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  const words = title.split(' ');
  const accent = words.pop();
  return (
    <div className="sectionHeading">
      <span className="headingGhost" aria-hidden="true">{ghosts[eyebrow] || eyebrow}</span>
      <span className="eyebrow"><span className="eyebrowDot" />{eyebrow}</span>
      <div className="headingFrame">
        <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
        <h2>{words.join(' ')}{words.length > 0 && ' '}<span>{accent}</span></h2>
      </div>
      {description && <p>{description}</p>}
      <span className="headingRule" aria-hidden="true" />
    </div>
  );
}
