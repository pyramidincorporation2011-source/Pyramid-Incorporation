# Pyramid Incorporation website

Single-page website for **Pyramid Incorporation**, waterproofing and structural repair contractors in Nagpur since
2010. It replaces the old template site at https://www.pyramidincorporation.com/.

Built with React 19 + Vite 8, Tailwind CSS v4, `motion` and `lucide-react`, with self-hosted fonts (Jost for headings, Source Sans 3 for text). The page
is **prerendered to static HTML** at build time and then hydrated, so content shows before JavaScript loads.

Measured locally with Lighthouse on the production build:

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 95 | 100 | 100 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

## Design approach

The look is modelled on established construction and waterproofing companies (Sika India, Fosroc, Dr. Fixit,
Turner) rather than on template or AI-generated landing pages:

- White header with the full-colour logo, plus a thin navy bar for hours, phone, email and WhatsApp.
- Solid white and light-grey sections, one navy section and a navy footer. No background patterns, grids or gradients
  (apart from the dark overlay that keeps hero text readable).
- Plain section headings without numbered labels; navy buttons and underlined text links; no decorative icons.
- Jost (a geometric typeface close to the "INCORPORATION" lettering in the logo) for headings at medium weight, and
  Source Sans 3 for body text.
- No scroll animations. Motion is used only for the menu, service details and photo viewer.
- The logo's gold appears only in the logo itself.

## Quick start

```bash
nvm use            # Node 22 (see .nvmrc); Vite 8 needs Node 20.19+ or 22.12+
npm install
npm run dev        # http://localhost:5173
npm run build      # production build + prerender → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Deploying

Both `netlify.toml` and `vercel.json` are included. Each runs `npm run build`, publishes `dist/`, serves hashed
`/assets/*` with a one-year immutable cache, and falls back to `index.html`.

1. Connect the repository on Netlify or Vercel. The settings are picked up automatically.
2. Optional: add `VITE_WEB3FORMS_KEY` as an environment variable (see below), then redeploy.
3. Point `www.pyramidincorporation.com` at the new host.

## Enquiry form

- **Without a key** (default): the form's main button is **Send via WhatsApp**. It validates the fields, then opens
  WhatsApp with the enquiry pre-filled to +91 98909 53541.
- **With a key**: create a free access key at https://web3forms.com using the company email, then put it in `.env` (copy
  `.env.example`) or in the hosting provider's environment variables:

  ```
  VITE_WEB3FORMS_KEY=your-access-key
  ```

  The form then emails enquiries via Web3Forms and shows success or error messages. **Send via WhatsApp** stays
  available next to it.
- Phone validation accepts 10-digit Indian mobile numbers (with or without +91 / 0, spaces or dashes).
- A hidden honeypot field silently drops most spam bots.

## Editing content

Everything editable lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `site.js` | Name, phones, WhatsApp, email, address, map, hours, GSTIN, listings, social links, press coverage (`press`), mission, vision, `FOUNDED_YEAR`. Also feeds the JSON-LD in `index.html`. |
| `services.js` | The 10 services: card text, "What we do", "Typical signs", image, category for the filter chips. |
| `gallery.js` | Projects & Gallery photos, captions and whether each is a company photo. |
| `reviews.js` | Google review quotes (verbatim). |
| `leadership.js` | "A note from our proprietor": photo, profile text and quote (written from the SiliconIndia Homes feature). |
| `process.js` | The five process steps. |
| `values.js` | Core values and Why Choose Us tiles. |

"Years of experience" is calculated from `FOUNDED_YEAR` and the current year (16+ in 2026). It is never hard-coded.

**Social media:** `site.social` is empty. Add entries like `{ name: 'Instagram', href: 'https://…' }` and the footer
shows them automatically.

## Replacing photos with your own

All photos go through one script that creates resized WebP versions (640 / 1024 / 1600 px) and a manifest.

1. Copy your photo (JPG, PNG or WebP, ideally at least 1600 px wide) into
   - `src/assets/originals/projects/`, for job photos (e.g. `project-07.jpg`), or
   - `src/assets/originals/stock/`, to replace a service or hero photo (e.g. replace `bathroom.jpg`, keeping the same name).
2. Run `npm run images`.
3. Edit **one line**:
   - New gallery photo: add a line to `src/data/gallery.js`:
     `{ src: 'projects/project-07', alt: 'What the photo shows', caption: 'Short caption', isCompanyPhoto: true },`
   - Service photo with a new name: change `image: 'stock/…'` (and `alt`) for that service in `src/data/services.js`.
     If you kept the same file name, no edit is needed.
4. Commit and deploy.

Use your own site photos wherever possible: real job photos build more trust than stock. When a service photo
becomes a real company photo, update `IMAGE_CREDITS.md`.

The six current company photos are only 400 px wide (that's all the old site had). Sending the original phone photos
would make the gallery and About photo much sharper.

## Brand assets

- `logo.pdf`: the new logo supplied by the owner. `scripts/extract-logo.py` (needs `pip install pymupdf`)
  extracts vector SVGs into `src/assets/brand/`: full, mark-only and horizontal lockup, each in light and dark versions.
- `npm run brand` regenerates `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`, the maskable
  icon and the 1200×630 `og-image.jpg` in `public/`.

## Project structure

```
src/
  components/         one component per section (Header, Hero, About, Services, Process, WhyUs,
                      Projects, Reviews, Contact, Footer, FloatingContact)
  components/ui/      Button, Container, SectionHeading, Modal, Lightbox, Img, Reveal, Logo, Icons
  data/               site, services, gallery, reviews, process, values
  hooks/              useScrolled, useActiveSection, useFocusTrap, useLockBodyScroll, useMounted
  lib/images.js       resolves image keys to responsive WebP srcsets
  assets/originals/   source photos (edit these)
  assets/projects|stock/  generated WebP variants (don't edit; run npm run images)
  entry-server.jsx    used by the prerender step
scripts/              optimize-images.mjs, generate-brand.mjs, prerender.mjs, extract-logo.py
public/               favicons, manifest, og-image, robots.txt, sitemap.xml
```

## Claims policy

The site only states facts that are verified or supplied by the owner:

- **Used:** since 2010, 400+ projects (confirmed by the owner), Nagpur-based and working across multiple states, 10 specialised services, free consultation / site inspection,
  verbatim Google reviews (supplied by the owner).
- **Not used:** "100% satisfaction guaranteed", warranty periods, percentages, star ratings or review counts, client
  logos, awards, ISO or other certifications, brand partnerships.

The "Client reviews" section was added at the owner's request. It quotes public Google reviews word for word, with
the reviewer's name as shown on Google, and links to the Google Business profile. Reviews without text and the one
negative review are not shown. No rating or review count is displayed.

## To confirm with the owner

- [x] **Project count:** 400+, confirmed by the owner. The company works outside Vidarbha in multiple states, so the
      site no longer limits projects or service area to Vidarbha.
- [ ] **States served:** the site says "multiple states". Name them (e.g. in the hero and JSON-LD `areaServed`) if wanted.
- [ ] **Founding year:** the site uses **2010** (brief and old website); the SiliconIndia Homes profile says 2011.
- [ ] **SiliconIndia Homes feature:** linked from About, the footer and the JSON-LD as press coverage (publication,
      headline, link only). Its "95% satisfaction" and "ISO 9001:2015" statements are **not** repeated on the site, per
      the claims policy. If the company does hold ISO 9001 certification, send the certificate before it is added.
- [ ] **Business hours:** Monday–Saturday, 9:00 AM – 7:00 PM was assumed.
- [ ] **Second phone** (+91 72494 90517): is it also on WhatsApp? Pre-filled WhatsApp messages go to +91 98909 53541.
- [ ] **Pre-filled WhatsApp number:** the business link `wa.me/message/QE5NCTZBTL6HA1` can't carry pre-filled text,
      so service enquiries and the form use `wa.me/919890953541?text=…`. Confirm this is the WhatsApp Business number.
- [ ] **Proprietor name spelling:** "Nitten R Tiwarii" is used as given (one review spells it "Mr Tiwari").
- [ ] **Material supply wording:** "We also supply waterproofing chemicals and materials for contractors and builders."
- [ ] **Proprietor section:** the profile text summarises the SiliconIndia Homes feature (diagnosis-first approach,
      low-disruption methods on occupied sites, monsoon working). Please check the wording and the quote; the photo is
      the one supplied in `Owner/`.
- [ ] **Reviews:** happy to show reviewers' names as they appear on Google? Remove any review from `reviews.js` if asked.
- [ ] **Map pin:** the embed searches the address text. If the pin lands slightly off, replace `mapEmbed` in `site.js`
      with the embed URL from Google Maps (Share → Embed a map).
- [ ] **Stock photos:** several services use related Indian site photos rather than the exact technique; replace them
      with company job photos when available.

## Accessibility notes

- Skip-to-content link, visible focus rings, one `h1`, labelled landmarks and headings.
- Mobile menu, service dialog and lightbox trap focus, close on Esc and return focus to the button that opened them.
  They also lock page scroll while open.
- The lightbox supports ←/→ keys and swipe on touch screens.
- Form fields have labels, `aria-invalid` and linked error messages, and focus moves to the first error.
- Animations respect `prefers-reduced-motion`.
- Colour pairs meet WCAG AA (body text `#1D2733`, secondary text `#55606E` on white; `#A9B3C1` on navy).
