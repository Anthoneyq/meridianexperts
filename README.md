# Meridian Experts — Website

Static multi-page site. Deploy by uploading the contents of this folder to any static host (Vercel, Netlify, GitHub Pages, S3, etc.).

**Final design direction (2026-06, per brand kit + 6/12 call):** Montserrat caps display (Proxima Nova stand-in) + DM Sans + Georgia italic quotes, Horizon as the only interactive color, gold/bronze premium accents on dark panels only, full-width translucent glass nav anchored to the top, hero media fading into sections below, GSAP motion + gold cursor glow, Matters absorbed into Credentials, no map, Scope IQ as an engagement path.

## Pages
- `index.html` — Home
- `practice-areas.html` — Practice (nav label "Practice")
- `process.html` — Process
- `credentials.html` — Credentials (absorbs former Matters proof)
- `contact.html` — Confidential matter intake

## Shared assets
- `assets/meridian.css` — design system (type, color tokens, components)
- `assets/meridian.js` — GSAP motion (reveals, blueprint tracing, rail progress, parallax), nav, Calendly, intake helpers
- `assets/*.mp4` — cinemagraph loops (`matters-hero.mp4` and `coverage-bg.mp4` are no longer referenced)

## Legacy (do not deploy as-is)
- `Meridian Experts.html`, `index-print.html`, `assets/styles.css`, `assets/v2.css`, `assets/site.js`, `assets/v2.js` — previous design generation. `index-print.html` still contains banned copy ("forensic", Montserrat) and needs regeneration before public use.

## Open decisions for Dan
- Final public name for Scope IQ / SIQ and launch timing (currently presented as "Scope IQ — File Review" engagement path)
- Exact representative matter numbers / dollar ranges (none published beyond 23+ yrs / 400+ matters)
- Whether Calendly remains the preferred intake action (currently kept as "Schedule a Call" on Contact)

## Vercel
No build step. `vercel.json` enables clean URLs (so `/contact` works as well as `/contact.html`).
