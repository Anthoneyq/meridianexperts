# Meridian Experts — Website

Next.js 14 (App Router) + TypeScript site for Meridian Experts.

## What's here

**12 pages, all real routes:**
- `/` — Homepage
- `/practice-areas` — Index of all practice areas
- `/practice-areas/[slug]` — Detail page for each of the 6 practice areas
- `/approach` — Methodology and differentiation
- `/process` — 6-step engagement workflow
- `/credentials` — Stats, testimonial, CV placeholder
- `/contact` — Case review form
- `/404` — Not found page

**Shared components:** Nav, Footer, Hero, PageHero, Reveal (scroll animation wrapper).

**SEO:** sitemap.xml and robots.txt auto-generated. Per-page metadata set.

## Running it locally

You'll need Node.js 18+ installed. Check with `node --version`.

```bash
cd meridian-site
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The dev server watches for changes and reloads automatically.

## Deploying to Vercel

**One-time setup:**

1. Push this folder to a new GitHub repository.

   ```bash
   cd meridian-site
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/meridian-experts.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click "Add New Project" → select your `meridian-experts` repo.
4. Vercel auto-detects Next.js. Click "Deploy."
5. In ~60 seconds, your site is live at `meridian-experts.vercel.app` (or similar).

**After that, every `git push` auto-deploys.** To make changes:

```bash
# edit files
git add .
git commit -m "describe what you changed"
git push
```

Vercel picks it up and redeploys automatically.

## Adding a custom domain

1. In Vercel project dashboard → Settings → Domains
2. Add `meridianexperts.com` (and `www.meridianexperts.com`)
3. Vercel shows you DNS records to add at your registrar (GoDaddy, Namecheap, etc.)
4. Update the domain and wait for propagation (usually minutes, up to 24 hours)

Also update `metadataBase` in `src/app/layout.tsx` and the base URL in `src/app/sitemap.ts` to your real domain.

## Wiring up the contact form

The form in `/contact` currently logs submissions to the browser console. To make it actually send email, you have a few options:

**Option A — Formspree (easiest, free tier):**
1. Sign up at formspree.io, create a form, get your endpoint URL.
2. In `src/app/contact/page.tsx`, change the `handleSubmit` function to POST to your Formspree endpoint.

**Option B — Resend + Next.js API route (more control):**
1. Sign up at resend.com, get an API key.
2. Create `src/app/api/contact/route.ts` with a POST handler that uses Resend.
3. Point the form submission at `/api/contact`.

I can wire up either option — just tell me which and I'll write the code.

## Things you'll need to replace before launch

**Real content:**
- Phone number (currently `(XXX) XXX-XXXX` — search-and-replace globally)
- Email (currently `intake@meridianexperts.com`)
- Stats on `/credentials` (currently `200+`, `12`, `40+`, `25yr` — edit `src/app/credentials/page.tsx` and `src/app/page.tsx`)
- Testimonial quote (currently placeholder)
- CV / credentials narrative on `/credentials` — search for `[Placeholder`

**Real assets:**
- The hero video URL is currently a third-party CloudFront link. For production, download the file, re-encode to 1080p H.264 (~2-3MB), upload to `/public/videos/`, and update the `src` in `src/components/Hero.tsx`.
- Add a favicon to `/public/favicon.ico`.
- Add Open Graph social share images to `/public/og-image.jpg` and wire them in `layout.tsx`.

**Legal:**
- Privacy policy, terms, conflict policy (footer links currently go nowhere)

## Editing content

Most copy lives in these files:

- **Practice area content:** `src/data/practice-areas.ts` — all 6 practice areas' text lives here. Edit this one file, all pages update.
- **Homepage:** `src/app/page.tsx`
- **Approach / Process / Credentials / Contact:** `src/app/<page>/page.tsx`
- **Nav links:** `src/components/Nav.tsx` (top of file, `links` array)
- **Footer:** `src/components/Footer.tsx`
- **Colors, fonts, spacing:** `src/styles/globals.css` (CSS variables at the top)

## Folder structure

```
meridian-site/
├── package.json              ← dependencies
├── next.config.js
├── tsconfig.json
├── public/                   ← static files (images, videos)
└── src/
    ├── app/                  ← routes (each folder = one URL)
    │   ├── layout.tsx        ← wraps every page with Nav + Footer
    │   ├── page.tsx          ← homepage
    │   ├── approach/
    │   ├── contact/
    │   ├── credentials/
    │   ├── practice-areas/
    │   │   ├── page.tsx      ← /practice-areas
    │   │   └── [slug]/       ← /practice-areas/anything
    │   │       └── page.tsx
    │   ├── process/
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── not-found.tsx
    ├── components/           ← reusable UI
    │   ├── Nav.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── PageHero.tsx
    │   └── Reveal.tsx
    ├── data/
    │   └── practice-areas.ts ← practice area content (single source of truth)
    └── styles/
        └── globals.css       ← all design tokens and styles
```

## What's not done yet

Deliberately left for follow-up conversations:

- Practice area content is comprehensive for structure, but each area's page could use richer narrative / case studies / photos. Currently all 6 pages render from the same template using data in `practice-areas.ts`.
- Credentials page has placeholders for CV content — needs your real background.
- Contact form is wired visually but not connected to a backend.
- No blog / insights section (could be added at `/insights` with MDX if you want thought leadership).
- Favicon, OG images, and real photography.

---

**Questions or changes?** Come back with this folder (or the repo link) and tell me what to change.
