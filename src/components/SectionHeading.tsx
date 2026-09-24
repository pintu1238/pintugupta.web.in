type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="sectionHeading">
      <span className="eyebrow"><span className="eyebrowDot" />{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="headingRule" aria-hidden="true" />
    </div>
  );
}
