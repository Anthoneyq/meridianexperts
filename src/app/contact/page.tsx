"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Placeholder — wire this to your actual form endpoint
    // (Formspree, Resend + API route, Vercel Forms, etc.)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Form submission:", data);

    // Simulate a send
    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
  };

  return (
    <>
      <PageHero
        eyebrow="Request Case Review"
        title="Start a conversation."
        intro="Send a brief description of the matter. We respond within one business day with a conflict check and an honest read on fit — before any engagement is discussed."
      />

      <section style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form-wrap">
              {status === "sent" ? (
                <div className="form-success">
                  <span className="eyebrow eyebrow--gold">Received</span>
                  <h2 className="h-section" style={{ marginTop: "1rem", fontSize: "1.75rem" }}>
                    Thank you.
                  </h2>
                  <p style={{ marginTop: "1.5rem", color: "var(--slate)", lineHeight: 1.6 }}>
                    Your case review request has been received. You&apos;ll
                    hear from us within one business day — sooner for
                    time-sensitive matters.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      <span>Your Name</span>
                      <input type="text" name="name" required />
                    </label>
                    <label>
                      <span>Firm</span>
                      <input type="text" name="firm" required />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <span>Email</span>
                      <input type="email" name="email" required />
                    </label>
                    <label>
                      <span>Phone</span>
                      <input type="tel" name="phone" />
                    </label>
                  </div>

                  <label className="form-full">
                    <span>Matter Type</span>
                    <select name="matter_type" required defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      <option>Construction Defect</option>
                      <option>Water Intrusion / Envelope</option>
                      <option>Insurance / Cat Loss</option>
                      <option>Structural Failure</option>
                      <option>Code / Standard of Care</option>
                      <option>Expert Testimony (Rebuttal)</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="form-full">
                    <span>Jurisdiction (State / Venue)</span>
                    <input type="text" name="jurisdiction" />
                  </label>

                  <label className="form-full">
                    <span>Brief Description of the Matter</span>
                    <textarea
                      name="description"
                      rows={6}
                      required
                      placeholder="Type of building, alleged issue, current posture of the case, and any deadlines we should know about. Do not include privileged or case-identifying detail that you&apos;re not comfortable sharing prior to a conflict check."
                    />
                  </label>

                  <label className="form-full">
                    <span>Opposing Parties (for conflict check)</span>
                    <input type="text" name="opposing" />
                  </label>

                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={status === "sending"}
                    style={{ marginTop: "1rem" }}
                  >
                    {status === "sending" ? "Sending…" : "Submit Case Review Request"}
                  </button>

                  <p className="form-note">
                    Submissions are confidential. We perform conflict checks
                    before any engagement discussion.
                  </p>
                </form>
              )}
            </div>

            <aside className="contact-aside">
              <div className="pa-aside-card">
                <span className="eyebrow eyebrow--gold">Direct Contact</span>
                <h3>Time-sensitive matter?</h3>
                <p>
                  For statute-of-limitations pressure, inspection deadlines,
                  or pre-suit investigation, contact us directly.
                </p>
                <ul className="cta__contact" style={{ marginTop: "1rem", borderTop: 0, paddingTop: 0 }}>
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
                    <span>Mon–Fri · 1 business day response</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
