# Meridian Experts Website

Current static website installed on 2026-06-16 from `/Users/anthoney/Downloads/Meridian Pages`.

## Design Direction

Montserrat caps display, DM Sans body copy, Georgia italic accents, Horizon as the interactive color, gold/bronze premium accents on dark panels, glass navigation, hero media that fades into the page, GSAP enhancement, and a restrained litigation-support tone.

## Active Pages

- `index.html` - Home
- `practice-areas.html` - Practice
- `process.html` - Process
- `credentials.html` - Credentials
- `contact.html` - Confidential matter intake

`matters.html` is no longer active; representative proof was absorbed into the current pages.

## Active Assets

- `assets/meridian.css` - design system, layout, components
- `assets/meridian.js` - shared motion, nav, video loading, intake helpers
- `assets/image-slot.js` - image slot support
- `assets/exhibit-viewer.js` - exhibit interaction support
- `assets/*.mp4` - active hero videos
- `assets/img/` - active exhibit imagery

## Archived/Omitted From Active Site

The old `styles.css`/`v2.css` generation, old loose pages, `matters.html`, `index-print.html`, screenshots, uploads, and source handoff files are preserved in `../Archive/2026-06-16_website_refresh/`.

## Open Decisions

- Final public name and launch timing for Scope IQ / SIQ, currently presented as "Scope IQ - File Review."
- Exact representative matter numbers or dollar ranges, if Dan wants anything beyond 23+ years / 400+ matters.
- Whether Calendly remains the preferred intake action on Contact.

## Deploy

No build step. Deploy the contents of this `Website/` folder to a static host. `vercel.json` enables clean URLs, so `/contact` works as well as `/contact.html`.
