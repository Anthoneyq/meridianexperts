import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* TRUST STRIP */}
      <div className="trust">
        <div className="container trust__inner">
          <span className="trust__label">Retained By Counsel In</span>
          <ul className="trust__items">
            <li>Construction Defect Litigation</li>
            <li>First-Party Insurance Disputes</li>
            <li>Subrogation Claims</li>
            <li>Post-Event Loss Analysis</li>
            <li>Contract &amp; Code Disputes</li>
          </ul>
        </div>
      </div>

      {/* PRACTICE AREAS */}
      <section className="practice">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Practice Areas</span>
              <h2 className="h-section">What we investigate.</h2>
              <p className="lede">
                Every engagement begins with the building — and ends with a
                record clear enough to stand on its own in deposition,
                mediation, or trial.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="practice__grid">
              {practiceCards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/practice-areas/${card.slug}`}
                  className="practice__card"
                >
                  <span className="practice__num">{card.num}</span>
                  <div
                    className="practice__icon"
                    dangerouslySetInnerHTML={{ __html: card.icon }}
                  />
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <span className="practice__arrow">Inquire →</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="diff">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">The Distinction</span>
              <h2 className="h-section">
                Not every consultant is built for litigation.
              </h2>
              <p className="lede">
                Inspection and investigation are not the same discipline. The
                difference shows up in deposition.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="diff__grid">
              <div className="diff__col diff__col--them">
                <span className="diff__label">Typical Consultants</span>
                <h3>Inspection-Oriented</h3>
                <ul className="diff__list">
                  {thems.map((t) => (
                    <li key={t}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
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
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
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
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/approach" className="btn btn--ghost-dark">
                Read Our Approach
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="authority">
        <div className="container">
          <Reveal>
            <div className="authority__head">
              <div>
                <span className="eyebrow eyebrow--gold">
                  Credentials &amp; Proof
                </span>
                <h2 className="h-section" style={{ marginTop: "1rem" }}>
                  Built on experience.
                  <br />
                  Backed by precision.
                </h2>
              </div>
              <p>
                A boutique firm is defined by who stands behind the report.
                Every Meridian engagement is led by consultants with direct
                investigative, forensic, and courtroom experience.
              </p>
            </div>
          </Reveal>

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

      {/* CTA */}
      <section className="cta">
        <div className="cta__grid" />
        <div className="container cta__inner">
          <div>
            <span className="eyebrow eyebrow--gold">Request Case Review</span>
            <h2 className="h-section" style={{ marginTop: "1rem" }}>
              Have a matter that depends on the building?
            </h2>
            <p>
              Send us a brief description of the case. We&apos;ll respond
              within one business day with a conflict check and an honest read
              on fit — before any engagement is discussed.
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link href="/contact" className="btn btn--primary">
                Start a Case Review
                <svg
                  className="arrow"
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                >
                  <path
                    d="M1 6h14m0 0L10 1m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="cta__box">
            <span className="eyebrow eyebrow--gold">Direct Contact</span>
            <h3>For counsel with time-sensitive matters.</h3>
            <p
              style={{
                color: "var(--ice-blue)",
                fontSize: "0.925rem",
                lineHeight: 1.55,
              }}
            >
              Rush engagements accommodated for statute-of-limitations
              pressure, pre-suit investigation, and inspection deadlines.
            </p>
            <ul className="cta__contact">
              <li>
                <strong>Intake</strong>
                <span>intake@meridianexperts.com</span>
              </li>
              <li>
                <strong>Phone</strong>
                <span>(XXX) XXX-XXXX</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>
                  Monday–Friday · Response within 1 business day
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

const practiceCards = [
  {
    slug: "construction-defects",
    num: "01",
    title: "Construction Defects",
    desc: "Design and workmanship failures across commercial, multi-family, and institutional projects.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 40 L8 18 L24 8 L40 18 L40 40 Z"/><path d="M8 40 L40 40" stroke-width="1.5"/><path d="M18 40 L18 26 L30 26 L30 40"/><path d="M24 26 L24 40"/></svg>`,
  },
  {
    slug: "water-intrusion",
    num: "02",
    title: "Water Intrusion & Envelope",
    desc: "Roofing, stucco, EIFS, window and door installations, flashing, and moisture migration pathways.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 14 L40 14 L40 34 L8 34 Z"/><path d="M8 14 L24 26 L40 14"/><path d="M8 34 L18 24"/><path d="M40 34 L30 24"/></svg>`,
  },
  {
    slug: "insurance-catastrophe",
    num: "03",
    title: "Insurance & Cat Loss",
    desc: "Hurricane, hail, wind, and water-loss evaluations, including coverage-relevant causation analysis.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M24 6 L6 14 L6 28 C6 36 14 42 24 44 C34 42 42 36 42 28 L42 14 Z"/><path d="M17 24 L22 29 L32 19"/></svg>`,
  },
  {
    slug: "structural-failures",
    num: "04",
    title: "Structural Failures",
    desc: "Settlement, movement, foundation, framing, and load-path investigations to code and standard of care.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M6 38 L6 14 L18 14 L18 38"/><path d="M18 26 L42 26 L42 38"/><path d="M6 38 L42 38"/><path d="M12 20 L12 24"/><path d="M26 32 L26 36"/><path d="M34 32 L34 36"/></svg>`,
  },
  {
    slug: "code-standard-of-care",
    num: "05",
    title: "Code & Standard of Care",
    desc: "Compliance analysis against governing codes, published standards, and industry practice at time of construction.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M14 6 L34 6 L38 10 L38 42 L10 42 L10 10 Z"/><path d="M16 18 L32 18"/><path d="M16 24 L32 24"/><path d="M16 30 L26 30"/><circle cx="34" cy="32" r="5"/><path d="M37 35 L40 38"/></svg>`,
  },
  {
    slug: "expert-testimony",
    num: "06",
    title: "Expert Witness Testimony",
    desc: "Deposition and trial testimony supported by documented methodology and chain-of-custody evidence handling.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><rect x="8" y="10" width="32" height="28"/><path d="M8 18 L40 18"/><path d="M14 26 L22 26"/><path d="M14 30 L26 30"/><path d="M30 26 L34 30 L30 34"/></svg>`,
  },
];

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

const stats = [
  { num: "200+", label: "Expert Reports Delivered" },
  { num: "12", label: "States of Active Engagement" },
  { num: "40+", label: "Depositions & Trial Testimonies" },
  { num: "25yr", label: "Combined Field & Forensic Experience" },
];
