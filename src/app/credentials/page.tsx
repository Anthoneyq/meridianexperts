import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Meridian Experts credentials: expert reports delivered, depositions and trial testimony, multi-state engagements, and decades of combined field and forensic experience.",
};

const stats = [
  { num: "200+", label: "Expert Reports Delivered" },
  { num: "12", label: "States of Active Engagement" },
  { num: "40+", label: "Depositions & Trial Testimonies" },
  { num: "25yr", label: "Combined Field & Forensic Experience" },
];

export default function CredentialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Credentials & Proof"
        title="Built on experience. Backed by precision."
        intro="A boutique firm is defined by who stands behind the report. Every Meridian engagement is led by consultants with direct investigative, forensic, and courtroom experience."
      />

      <section className="authority" style={{ marginTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat__num">{s.num}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="testimonial">
              <span className="testimonial__mark">&ldquo;</span>
              <p className="testimonial__quote">
                Their report didn&apos;t just hold up in deposition — it
                reframed the case. Opposing counsel couldn&apos;t find a seam
                in it.
              </p>
              <div className="testimonial__attr">
                <strong>Partner</strong> · Construction Litigation Practice ·
                Am Law 200 Firm
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="container">
          <Reveal>
            <div className="prose">
              <h2>Professional background</h2>
              <p>
                <em>[Placeholder — this is where your CV highlights go.]</em>{" "}
                Replace this section with licensing (PE, RA, or similar), key
                certifications (ICC inspector credentials, RRO, RWC, or
                industry-specific designations), publications, and
                professional affiliations.
              </p>

              <h2>Courtroom experience</h2>
              <p>
                <em>[Placeholder.]</em> Describe depositions and trial
                testimony in general terms (jurisdictions, case types,
                plaintiff/defense balance). Avoid identifying specific cases
                unless you have permission to reference them.
              </p>

              <h2>Jurisdictions</h2>
              <p>
                <em>[Placeholder.]</em> List states of active licensure and
                states where you have been retained or testified. If
                multi-state, note the practical reach of the firm.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: "4rem", textAlign: "center" }}>
              <Link href="/contact" className="btn btn--primary">
                Request Case Review →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
