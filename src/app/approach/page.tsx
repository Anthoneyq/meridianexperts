import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Meridian Experts differs from general inspection consultants: litigation-grade methodology, Daubert-admissible reporting, and courtroom-tested experience.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="Not every consultant is built for litigation."
        intro="Inspection and investigation are not the same discipline. The difference shows up in deposition."
      />

      <section style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="container">
          <Reveal>
            <div className="diff__grid">
              <div className="diff__col diff__col--them">
                <span className="diff__label">Typical Consultants</span>
                <h3>Inspection-Oriented</h3>
                <ul className="diff__list">
                  {thems.map((t) => (
                    <li key={t}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                      </svg>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="diff__col diff__col--us">
                <span className="diff__label">Meridian Experts</span>
                <h3>Litigation-Oriented</h3>
                <ul className="diff__list">
                  {uss.map((u) => (
                    <li key={u}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="4 12 10 18 20 6" />
                      </svg>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose" style={{ marginTop: "5rem" }}>
              <h2>The principle behind the method</h2>
              <p>
                A report that cannot withstand cross-examination is a liability,
                not an asset. The purpose of an expert engagement is not to
                describe a building — it is to build a record that holds up
                when tested.
              </p>
              <p>
                That starts before the first site visit. It shapes how samples
                are handled, how photographs are organized, how field notes are
                taken, and how conclusions are structured on the page.
                Everything is traceable. Everything is documented. Nothing
                relies on memory or assumption.
              </p>

              <h2>What this means for counsel</h2>
              <p>
                When you retain Meridian, you retain a methodology aligned to
                the rules of evidence in your jurisdiction. Our reports
                separate observations from opinions, disclose the basis for
                each conclusion, and reference the published standards relied
                upon. Nothing is implied. Nothing is assumed.
              </p>
              <p>
                The practical result: fewer surprises in deposition, fewer
                objections in trial, and less work for your team to prepare
                the expert for cross.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: "4rem", textAlign: "center" }}>
              <Link href="/process" className="btn btn--primary">
                See Our Process →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const thems = [
  "Surface-level condition reports, written for clients — not counsel.",
  "Observations without traceable methodology or documented standards of care.",
  "Photos and notes that don't survive chain-of-custody scrutiny.",
  "Conclusions that collapse under Daubert challenge or opposing cross.",
  "Limited or no deposition and trial experience.",
];

const uss = [
  "Reports structured for admissibility — methodology, basis, and opinions clearly separated.",
  "Documented root-cause analysis grounded in published standards and building science.",
  "Chain-of-custody protocols for samples, photographs, and field measurements.",
  "Opinions traceable to physical evidence — built to withstand Daubert inquiry.",
  "Direct deposition and trial experience in construction and insurance matters.",
];
