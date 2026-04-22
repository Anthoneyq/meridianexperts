"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const text = headline.dataset.text || "";
    const lines = text.split("\n");
    const charDelay = 28;
    const initialDelay = 250;
    const spans: HTMLSpanElement[] = [];

    headline.innerHTML = "";
    lines.forEach((line) => {
      const lineEl = document.createElement("span");
      lineEl.className = "hero__line";
      for (const ch of line) {
        const span = document.createElement("span");
        span.className = "hero__char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        lineEl.appendChild(span);
        spans.push(span);
      }
      headline.appendChild(lineEl);
    });

    if (prefersReducedMotion) {
      spans.forEach((s) => s.classList.add("is-lit"));
      subRef.current?.classList.add("is-lit");
      ctasRef.current?.classList.add("is-lit");
      tagRef.current?.classList.add("is-lit");
      return;
    }

    const timeouts: number[] = [];
    spans.forEach((span, i) => {
      timeouts.push(
        window.setTimeout(
          () => span.classList.add("is-lit"),
          initialDelay + i * charDelay
        )
      );
    });

    const headlineDuration = initialDelay + spans.length * charDelay;
    timeouts.push(
      window.setTimeout(
        () => subRef.current?.classList.add("is-lit"),
        headlineDuration + 100
      )
    );
    timeouts.push(
      window.setTimeout(
        () => ctasRef.current?.classList.add("is-lit"),
        headlineDuration + 350
      )
    );
    timeouts.push(
      window.setTimeout(
        () => tagRef.current?.classList.add("is-lit"),
        headlineDuration + 550
      )
    );

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <section className="hero">
      <video
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect fill='%2325566E' width='16' height='9'/></svg>"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero__tint" />
      <div className="hero__grid" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="eyebrow eyebrow--gold">
              Litigation-Grade Building Analysis
            </span>
          </div>
          <h1
            ref={headlineRef}
            className="h-display"
            data-text={"When the case depends on the building,\nprecision decides it."}
          />
          <p ref={subRef} className="hero__sub">
            Meridian Experts supports attorneys in construction defect,
            insurance, and structural failure matters — delivering defensible
            investigations, court-ready reports, and expert testimony.
          </p>
          <div ref={ctasRef} className="hero__ctas">
            <Link href="/contact" className="btn btn--primary">
              Request Case Review
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
            <Link href="/practice-areas" className="btn btn--ghost-light">
              View Practice Areas
            </Link>
          </div>
        </div>

        <div ref={tagRef} className="hero__tag">
          <div className="glass-card">
            <span className="hero__tag-label">Practice Focus</span>
            <div className="hero__tag-content">
              Investigation. <em>Reporting.</em> Testimony.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
