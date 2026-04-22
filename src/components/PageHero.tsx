interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export default function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid" />
      <div className="container page-hero__inner">
        <span className="eyebrow eyebrow--gold">{eyebrow}</span>
        <h1 className="h-display page-hero__title">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </section>
  );
}
