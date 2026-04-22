import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process",
  description:
    "A structured, defensible engagement workflow: intake, document review, field investigation, root-cause analysis, expert reporting, and deposition support.",
};

const steps = [
  {
    num: "01",
    title: "Conflict & Intake Review",
    body: "Confidential case screening, scope definition, and engagement terms — aligned to statute-of-limitations pressure when needed. Conflict check completed within one business day.",
  },
  {
    num: "02",
    title: "Document Review",
    body: "Plans, specifications, submittals, RFIs, change orders, inspection records, and prior reports — evaluated before the first site visit. Prior expert reports reviewed for rebuttal engagements.",
  },
  {
    num: "03",
    title: "Field Investigation",
    body: "Non-destructive and destructive testing under documented protocols. Photography, sampling, and measurements preserved under chain-of-custody. Coordination with opposing consultants as required.",
  },
  {
    num: "04",
    title: "Root-Cause Analysis",
    body: "Evidence evaluated against building science, published standards, and the applicable standard of care at time of construction. Alternate causation ruled in or out with documented basis.",
  },
  {
    num: "05",
    title: "Expert Reporting",
    body: "Written opinions structured for clarity and admissibility. Findings separated from methodology. Basis disclosed. Prepared for Rule 26 or equivalent state disclosure.",
  },
  {
    num: "06",
    title: "Deposition & Trial Support",
    body: "Ongoing counsel consultation, demonstrative preparation, deposition readiness, and expert testimony through trial. Rebuttal reports responsive to opposing experts as needed.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement Process"
        title="A structured, defensible workflow."
        intro="Every stage is documented. Every conclusion is traceable. The process itself is built to hold up in court."
      />

      <section style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="container">
          <Reveal>
            <div className="process__steps">
              {steps.map((step) => (
                <div key={step.num} className="process__step">
                  <span className="process__num">{step.num}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="prose" style={{ marginTop: "5rem" }}>
              <h2>Timeline considerations</h2>
              <p>
                Typical full-scope engagements from intake to preliminary
                written findings run four to eight weeks, depending on scope,
                destructive testing requirements, and coordination with
                opposing consultants. Rush engagements are accommodated where
                statute-of-limitations pressure, inspection deadlines, or
                spoliation concerns require it.
              </p>
              <p>
                For rebuttal engagements, timelines are set to disclosure and
                deposition schedules in the case.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: "4rem", textAlign: "center" }}>
              <Link href="/contact" className="btn btn--primary">
                Start a Case Review →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
