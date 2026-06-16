# Meridian Experts — Update Handoff

A complete record of every change made during this iteration, organized so you (or Claude Code) can apply them to the existing live site without disturbing your real logo or other production assets.

---

## ⚠️ ASSETS TO PRESERVE FROM YOUR LIVE SITE

The following are **placeholders or reference copies** in this project. Replace with your real production files when porting changes:

| File in this project | What to do |
|---|---|
| `assets/logo-white.png` | **Keep your existing live logo.** Do not overwrite. |
| `assets/credentials-hero.mp4` | New asset for Credentials hero. ~4.4 MB. Add to live site. |
| `assets/process-hero.mp4` | New asset for Process hero. ~10.8 MB. Add to live site. |
| Any `logo-footer.mp4` reference | Pre-existing missing asset — left alone. Keep whatever you have live. |

**Recommended:** compress both new hero videos before deploying. Target ≤2 MB each. Use HandBrake or ffmpeg:
```bash
ffmpeg -i "input.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart output.mp4
```
The `-movflags +faststart` flag enables progressive playback.

---

## 1 · File Structure Cleanup

All `v1` / `v2` / `v3` filename variants have been consolidated to canonical names. The site now consists of exactly these pages:

```
index.html
index-print.html      ← print-friendly version of home
practice-areas.html
process.html
matters.html
credentials.html
contact.html
```

Plus the shared assets folder:
```
assets/
  styles.css          ← shared base styles + nav
  v2.css              ← shared component layer (signature components, used by every page)
  site.js             ← shared behaviour (nav state, reveal-on-scroll, year, mobile menu, calendly)
  v2.js               ← v2 component scripts
  image-slot.js       ← <image-slot> web component for editable image placeholders
  logo-white.png      ← YOUR LOGO (preserve from live)
  credentials-hero.mp4
  process-hero.mp4
```

---

## 2 · Global Navigation

**File:** `assets/styles.css` (lines 162–199)

**Changed:**
- Nav is a fixed floating pill at `top: 1rem`.
- At the top of the page: glass effect — semi-transparent dark fill (`rgba(17,24,33,0.28)`), hairline border, `blur(18px) saturate(1.2)` backdrop filter, soft drop shadow.
- On scroll (>40px): background darkens to `rgba(10,14,20,0.88)`, slightly stronger border and shadow. Smooth `0.35s` ease transition.
- Stays at `top: 1rem` always — does not snap to `top: 0`.

**Behaviour script:** `assets/site.js` already handles adding `.is-scrolled` class on window scroll.

---

## 3 · Home Page (`index.html`)

No content changes from your live version's structure. Wiring updates only:
- All internal links updated to canonical filenames (e.g. `practice-areas v2.html` → `practice-areas.html`)
- "V2 Preview" badge removed (was in the bottom-left corner)

---

## 4 · Credentials Page (`credentials.html`) — MAJOR REWRITE

This page was substantially rewritten to **depersonalize** the content — moving from a single-principal voice ("I", "founder", personal signature) to a firm-oriented voice ("the firm", "the practice") to support adding additional principals later without re-architecting the page.

### 4a. Hero
- Replaced principal portrait/photo with **background video** (`assets/credentials-hero.mp4`) with dark tint overlay for legibility.
- Removed right-side framed portrait block entirely.
- Hero text **left-aligned** within a max-width 900px container (was centered).
- Eyebrow: "Credentials & Engagement Record"
- H1: "Built on construction. *Retained for litigation.*"
- Subhead shortened to a single tight line about being an independent building-consulting practice.

### 4b. "Engagement Record at a Glance" — Animated Counters
- 4 stat counters animate from 0 to target value on scroll-into-view.
- Easing: cubic ease-out, ~1.6s duration.
- Values are **non-rounded** to read as real-world:
  - **23+** years in construction
  - **412+** matters of record
  - **57+** depositions / trial testimonies
  - **8** states of practice
- Implementation uses `IntersectionObserver` and `requestAnimationFrame`.

### 4c. Tone Throughout
- All first-person references ("I", "me", "founder", "personal") removed.
- Replaced with firm references ("the firm", "the practice", "the team").
- Personal signature block at the bottom replaced with a "firm stamp/seal" image slot.

### 4d. Old Reports Section (Timeline Strip)
**⚠️ User flagged:** "That's in the old reports but not change the new styling that we have in this"
**Action needed:** Verify the timeline-strip section (`section.timeline-strip` showing "Stage 01 Intake…") is using the new v2 styling, not legacy report styling. Cross-reference with `assets/v2.css` and ensure no leftover `.timeline-strip` rules in `assets/styles.css` from the old credentials page are still in use.

---

## 5 · Process Page (`process.html`)

### 5a. Hero Video
- Added background video `assets/process-hero.mp4` to hero section.
- Uses `autoplay loop muted playsinline`.
- Tint and grid overlays sit on top for legibility.
- Bottom-fade gradient (transparent → `--charcoal`) dissolves the hero smoothly into the dark timeline section below.

### 5b. Content
- Five process stages: Intake → Document Review → Field Investigation → Report → Deposition/Trial Testimony.
- "Pre-deposition counsel meeting and document orientation" item (and similar testimony bullets) — **user flagged** wanting to add more information about credentials/experience. Current text is firm-level and concise; expand if you want more detail.

---

## 6 · Matters Page (`matters.html`)

### 6a. US Coverage Map
- Replaced stylized SVG map with a **real US states outline map**.
- Data source: `us-atlas` TopoJSON dataset (public, loaded from CDN).
- Projection: Albers USA (handles Alaska/Hawaii inset).
- **Texas** highlighted in gold (primary state).
- **OK, LA, AR, NM, CO, FL, GA** highlighted in light blue (secondary states).
- All other states rendered in muted dark stroke.
- Loads on page render via D3.

### 6b. Region & Loss-Category Splits
- Regional split: 62% / 22% / 16% (sums to 100%)
- Loss categories: percentages sum to ~99% + cross-cutting category
- Ledger entries are properly anonymized (no client names)

---

## 7 · Practice Areas Page (`practice-areas.html`)

No content changes — wiring updates only:
- Anchor links cleaned: `#defects`, `#envelope`, `#insurance`, `#structural`, `#code`, `#testimony`
- All six service blocks use consistent A–E (5-point) structure
- Links to Matters page resolve correctly

---

## 8 · Contact Page (`contact.html`)

No content changes — wiring updates only.

---

## 9 · Video Loading Workaround

**Issue:** The preview environment doesn't support HTTP byte-range requests, so native `<video src="...">` fails to play large MP4 files.

**Current implementation:** Both `credentials.html` and `process.html` use a fetch-as-blob workaround:
```js
const r = await fetch('assets/credentials-hero.mp4');
v.src = URL.createObjectURL(await r.blob());
```

**For production:** Replace with native progressive playback (faster initial paint):
```html
<video src="assets/credentials-hero.mp4"
       preload="metadata"
       autoplay loop muted playsinline
       poster="..."></video>
```

A code comment is left in each file noting this.

---

## 10 · Removed / Cleaned Up

- All `index v1.html`, `index v2.html`, `credentials v1.html`, `credentials v2.html`, `credentials v3.html`, `process v1.html`, `practice-areas v1.html`, `matters v1.html`, `contact v2.html` files **deleted**.
- The `uploads/` folder (Claude-internal scratch space) **deleted**.
- "V2 Preview" badge anchors removed from all page footers.
- `.v2-badge` and `.v2-badge::before` CSS removed from `assets/v2.css`.

---

## 11 · Known Pre-existing Issues (NOT introduced by this update)

- `assets/logo-footer.mp4` is referenced in the footer of every page but the file is missing. Console will show a resource load error. Either upload the file or remove the reference.
- `assets/hero.mp4` was referenced on the old home page hero. Removed in this iteration.

---

## How to Apply These Changes via Claude Code

Recommended workflow:

1. **Back up your live site** (or branch in git).
2. Copy this entire project folder into a working directory next to your live site.
3. **Restore your live `assets/logo-white.png`** — overwrite the one in this project.
4. **Restore your live `assets/logo-footer.mp4`** if you have one.
5. Diff the two folders. The following files are the canonical updates:
   - `assets/styles.css` — nav changes
   - `assets/v2.css` — all signature component styles
   - `assets/site.js` — nav scroll handler, video loader
   - `assets/v2.js` — v2 component scripts
   - `credentials.html` — full rewrite
   - `process.html` — hero video added
   - `matters.html` — real US map
   - `index.html`, `practice-areas.html`, `contact.html` — link updates only
6. Compress the two new MP4s before deploying (see top of this document).
7. Verify the timeline-strip section on Credentials uses the new styling (see §4d).

---
