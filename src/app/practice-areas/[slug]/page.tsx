import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { practiceAreas } from "@/data/practice-areas";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = practiceAreas.find((a) => a.slug === params.slug);
  if (!area) return { title: "Not Found" };
  return {
    title: area.title,
    description: area.shortDesc,
  };
}

export default function PracticeAreaDetail({ params }: Props) {
  const area = practiceAreas.find((a) => a.slug === params.slug);
  if (!area) notFound();

  const index = practiceAreas.findIndex((a) => a.slug === params.slug);
  const next = practiceAreas[(index + 1) % practiceAreas.length];

  return (
    <>
      <PageHero
        eyebrow={`Practice Area · ${area.num}`}
        title={area.title}
        intro={area.intro}
      />

      <section style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="container">
          <div className="pa-detail">
            <div className="pa-detail__main">
              <Reveal>
                <div className="pa-block">
                  <span className="eyebrow">Scope of Work</span>
                  <ul className="pa-list">
                    {area.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="pa-block">
                  <span className="eyebrow">Typical Engagements</span>
                  <ul className="pa-list">
                    {area.typicalCases.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="pa-block">
                  <span className="eyebrow">Deliverables</span>
                  <ul className="pa-list">
                    {area.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <aside className="pa-detail__aside">
              <div className="pa-aside-card">
                <span className="eyebrow eyebrow--gold">Inquire</span>
                <h3>
                  Have a matter in {area.title.toLowerCase()}?
                </h3>
                <p>
                  Send a brief description. We respond within one business day
                  with a conflict check and an honest read on fit.
                </p>
                <Link href="/contact" className="btn btn--primary">
                  Request Case Review
                </Link>
              </div>

              <div className="pa-aside-links">
                <span className="eyebrow">Other Practice Areas</span>
                <ul>
                  {practiceAreas
                    .filter((a) => a.slug !== area.slug)
                    .map((a) => (
                      <li key={a.slug}>
                        <Link href={`/practice-areas/${a.slug}`}>
                          {a.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pa-next">
        <div className="container pa-next__inner">
          <div>
            <span className="eyebrow">Next Practice Area</span>
            <h3 className="h-section" style={{ marginTop: "0.75rem" }}>
              {next.title}
            </h3>
          </div>
          <Link href={`/practice-areas/${next.slug}`} className="btn btn--ghost-dark">
            Continue →
          </Link>
        </div>
      </section>
    </>
  );
}
