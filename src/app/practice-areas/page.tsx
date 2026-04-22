import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { practiceAreas } from "@/data/practice-areas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Building consulting practice areas: construction defects, water intrusion, insurance and cat loss, structural failures, code and standard of care, and expert witness testimony.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="What we investigate."
        intro="Every engagement begins with the building — and ends with a record clear enough to stand on its own in deposition, mediation, or trial."
      />

      <section className="practice" style={{ paddingTop: "var(--section-py)" }}>
        <div className="container">
          <Reveal>
            <div className="practice__grid">
              {practiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/practice-areas/${area.slug}`}
                  className="practice__card"
                >
                  <span className="practice__num">{area.num}</span>
                  <div
                    className="practice__icon"
                    dangerouslySetInnerHTML={{ __html: area.icon }}
                  />
                  <h3>{area.title}</h3>
                  <p>{area.shortDesc}</p>
                  <span className="practice__arrow">Inquire →</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
