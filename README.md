# Pyramid Incorporation — Website

Official website of **Pyramid Incorporation**, waterproofing and structural repair contractors based in Nagpur,
Maharashtra, since 2010.

**Live site:** https://www.pyramidincorporation.com/

> Proprietary software. © 2026 Pyramid Incorporation. All rights reserved. See [LICENSE](LICENSE).

---

## Contents

- [Overview](#overview)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Managing content](#managing-content)
- [Photos](#photos)
- [Enquiry form](#enquiry-form)
- [Search engine optimisation](#search-engine-optimisation)
- [Deployment](#deployment)
- [Security](#security)
- [Credits](#credits)
- [Quality](#quality)
- [Pre-launch checklist](#pre-launch-checklist)
- [Licence](#licence)

## Overview

A fast, single-page company website with these sections: Home, About, A note from our proprietor, Services,
How we work, What you can expect, Projects, Client reviews and Contact.

Key features:

- Ten service descriptions, each with a detail view and a pre-filled WhatsApp enquiry
- Project gallery with a full-screen photo viewer
- Verbatim Google reviews linked to the Google Business profile
- Enquiry form that sends by email (Web3Forms) or WhatsApp
- Click-to-call, WhatsApp and map links throughout, with a call/WhatsApp bar on phones
- Full search engine set-up: titles, descriptions, structured business data, sitemap and social previews

## Technology

| Area | Choice |
| --- | --- |
| Framework | React 19, Vite 8 |
| Styling | Tailwind CSS v4 |
| Fonts | Jost (headings) and Source Sans 3 (text), self-hosted |
| Motion | `motion`, used only for the menu, dialogs and photo viewer |
| Images | WebP in several sizes, generated with `sharp` |
| Rendering | Prerendered to static HTML at build time, then hydrated |
| Hosting | Cloudflare Pages (Netlify and Vercel configuration also included) |

## Getting started

Requirements: **Node.js 22** (see `.nvmrc`).

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build with prerendering, output in dist/
npm run preview    # serve the production build at http://localhost:4173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build and prerender the production site |
| `npm run preview` | Preview the production build locally |
| `npm run images` | Generate optimised WebP images from `src/assets/originals/` |
| `npm run brand` | Regenerate favicons, app icons and the social preview image |
| `npm run notices` | Regenerate third-party notices and credits (also runs on every build) |

## Project structure

```
src/
  components/          One component per page section
  components/ui/       Shared building blocks (Button, Modal, Lightbox, Img, …)
  data/                All editable content (see below)
  hooks/               Scroll, focus-trap and section-tracking helpers
  lib/images.js        Resolves image names to responsive WebP files
  assets/originals/    Source photos: projects/, stock/, team/
  assets/brand/        Logo files (SVG)
  entry-server.jsx     Used by the prerender step
scripts/               Image, brand and prerender scripts
public/                Favicons, manifest, robots.txt, sitemap.xml, social preview image
```

## Managing content

All text and business details live in `src/data/`. Edit a file there and redeploy; no other code changes are needed.

| File | Contents |
| --- | --- |
| `site.js` | Company details: phones, WhatsApp, email, address, map, hours, GSTIN, listings, press, mission, vision, project count, search keywords |
| `services.js` | The ten services: summary, "What we do", "Typical signs", photo and filter category |
| `leadership.js` | "A note from our proprietor": photo, profile and quote |
| `gallery.js` | Project photos and captions |
| `reviews.js` | Google review quotes (keep them word for word) |
| `process.js` | The five steps of "How we work" |
| `values.js` | Core values and "What you can expect" points |
| `credits.js` | Photo credits, quoted sources and trademark notice (feeds the credits file) |

Years of experience are calculated automatically from the founding year (`FOUNDED_YEAR` in `site.js`).
Social media links can be added to `site.social`; the footer shows them as soon as one is added.

**Content guideline:** publish only facts the company can stand behind. Avoid guarantees, warranty periods,
percentages, ratings or certifications unless they can be documented.

## Photos

To add or replace a photo:

1. Copy the photo (JPG, PNG or WebP, ideally 1600 px wide or more) into `src/assets/originals/projects/` for job
   photos, or `src/assets/originals/stock/` to replace a service or hero photo, keeping the same file name.
2. Run `npm run images`.
3. For a new gallery photo, add one line to `src/data/gallery.js`:

   ```js
   { src: 'projects/project-07', alt: 'What the photo shows', caption: 'Short caption', isCompanyPhoto: true },
   ```

4. Rebuild and deploy.

Company job photos are labelled "Pyramid Incorporation project". Licensed stock photos are labelled
"Representative image" and should be replaced with real job photos over time. When a stock photo is added or
replaced, update its credit in `src/data/credits.js`.

## Enquiry form

The form validates the name and a 10-digit Indian mobile number, and includes a hidden anti-spam field.

- **Default:** the form opens WhatsApp with the enquiry filled in, ready to send to +91 98909 53541.
- **By email:** create a free access key at [web3forms.com](https://web3forms.com) with the company email, then set it
  as an environment variable on the host (or in a local `.env` file, see `.env.example`):

  ```
  VITE_WEB3FORMS_KEY=your-access-key
  ```

  Enquiries are then emailed, and WhatsApp remains available as an alternative.

## Search engine optimisation

Already in place:

- Title, meta description, canonical URL, Open Graph and Twitter previews (`index.html`)
- Structured business data (JSON-LD `HomeAndConstructionBusiness`) with address, phones, hours, founding year,
  service catalogue, areas served, press coverage and listing links, generated from `site.js` and `services.js`
- Keywords meta tag and location tags, from `site.seoKeywords`
- `robots.txt` and `sitemap.xml`, one `h1`, descriptive headings and image alt text
- Prerendered HTML, so search engines see the full content without running JavaScript

**Keywords** are maintained in `seoKeywords` in `src/data/site.js` (for example "waterproofing contractors in
Nagpur", "terrace waterproofing Nagpur", "bathroom waterproofing Nagpur", "PU injection grouting Nagpur",
"waterproofing chemicals supplier Nagpur"). Google does not rank pages on the keywords tag. It ranks on the visible
text, title and description, so when targeting a new phrase, also use it naturally in the relevant service text.

**After launch** (these have the most effect on local search):

1. Add `https://www.pyramidincorporation.com/` as the website on the Google Business profile, IndiaMART and Justdial.
2. Verify the site in [Google Search Console](https://search.google.com/search-console) and submit
   `https://www.pyramidincorporation.com/sitemap.xml`.
3. Keep collecting Google reviews and adding real project photos to the Google Business profile.

## Deployment

The site is hosted on **Cloudflare Pages** (free plan; commercial use allowed). The domain is registered with GoDaddy
and its DNS is managed by Cloudflare.

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 22 (read from `.nvmrc`) |
| Headers | `public/_headers` (security and caching) |

Every push to the `main` branch on GitHub redeploys the site automatically.

**First-time set-up**

1. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, select the GitHub repository and enter the
   settings above.
2. Optionally add `VITE_WEB3FORMS_KEY` under **Settings → Variables and secrets**, then redeploy.
3. Add the domain to Cloudflare (**Add a domain**, Free plan). Check the imported DNS records, keep the email
   records (`MX` and `mail`), then change the nameservers in GoDaddy (**Domain → DNS → Nameservers**) to the two
   Cloudflare provides.
4. Once the domain is active, add `www.pyramidincorporation.com` and `pyramidincorporation.com` under the Pages
   project's **Custom domains**, and redirect the bare domain to `www` with a Redirect Rule.
5. In the domain's settings, turn off **Email Address Obfuscation** and **Rocket Loader** (not needed, and they
   alter the page).

`netlify.toml` and `vercel.json` are kept so the site can also be deployed to Netlify or Vercel if ever needed.

## Security

The site is static: there is no server, database, admin panel or login, so there is nothing on the server side to
break into. The protections in place:

- **Security headers** on every response (`public/_headers`; mirrored in `netlify.toml` and `vercel.json`): a strict Content-Security-Policy that
  only allows the site's own scripts, Web3Forms for the form and Google Maps for the map; HSTS (HTTPS only);
  clickjacking protection; no MIME sniffing; a restrictive Permissions-Policy and Referrer-Policy.
- **No secrets in the code.** The only key is the optional Web3Forms access key, which is designed to be public.
  Real secrets must never be added to the code or to `VITE_` variables, because those are visible in the browser.
- **Form hardening:** validation, length limits, a hidden honeypot field against spam bots, and all input is escaped
  by React. If spam becomes a problem, Web3Forms' hCaptcha can be enabled.
- **External links** open with `rel="noopener noreferrer"`.
- **Dependencies:** `npm audit` reports no known vulnerabilities. Run `npm audit` before each release.
- **Security contact:** `/.well-known/security.txt` (renew the `Expires` date yearly).

Account security matters as much as the code: turn on two-factor authentication for GitHub, Cloudflare,
GoDaddy and the email account.

## Credits

Third-party photographs, fonts, open-source software, quoted content and trademarks are credited in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The same notices, with the full licence texts, are published on the
site at `/third-party-notices.txt` and linked from the footer ("Credits & licences").

## Quality

Measured with Lighthouse on the production build:

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 93–95 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

Accessibility: keyboard navigation throughout, skip link, visible focus, labelled form fields with error messages,
focus-trapped menu and dialogs, WCAG AA contrast and reduced-motion support.

## Pre-launch checklist

- [ ] Opening hours (currently Monday–Saturday, 9:00 AM – 7:00 PM)
- [ ] States served: the site says "multiple states"; name them if preferred
- [ ] WhatsApp number used for pre-filled messages (+91 98909 53541)
- [ ] Proprietor section wording and quote
- [ ] Reviewers are happy to be shown by name
- [ ] Map pin position (replace `mapEmbed` in `site.js` with Google Maps' own embed link if needed)
- [ ] Domain email: confirm whether any `@pyramidincorporation.com` mailboxes are in use before changing DNS
- [ ] Optional: Web3Forms key for email enquiries

## Licence

Proprietary and confidential. © 2026 Pyramid Incorporation. All rights reserved.
No part of this project may be copied, modified or reused without written permission. See [LICENSE](LICENSE).
Third-party software, fonts and stock photographs remain under their own licences; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
