import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/data/site.js';
import { services } from './src/data/services.js';

/** JSON-LD built from src/data/site.js so business details live in one place. */
function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}icon-512.png`,
    image: `${site.url}og-image.jpg`,
    telephone: site.phones.map((p) => p.e164),
    email: site.email,
    foundingDate: String(site.foundedYear),
    founder: { '@type': 'Person', name: site.proprietor },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Nagpur' },
      { '@type': 'AdministrativeArea', name: 'Vidarbha' },
      { '@type': 'Country', name: 'India' },
    ],
    hasMap: site.mapsLink,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    taxID: site.gstin,
    keywords: site.seoKeywords.join(', '),
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Waterproofing and structural repair services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.short,
          serviceType: s.title,
          provider: { '@id': `${site.url}#business` },
          areaServed: 'Nagpur, Vidarbha and other states in India',
        },
      })),
    },
    subjectOf: site.press.map((p) => ({
      '@type': 'Article',
      headline: p.title,
      url: p.href,
      publisher: { '@type': 'Organization', name: p.publication },
    })),
    sameAs: [...site.listings.map((l) => l.href), ...site.social.map((s) => s.href)],
  };
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

/** Injects JSON-LD, and (in production) preloads for the LCP hero image and the main fonts. */
function criticalAssets() {
  return {
    name: 'critical-assets',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const tags = [
          { tag: 'meta', attrs: { name: 'keywords', content: site.seoKeywords.join(', ') }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'geo.region', content: 'IN-MH' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'geo.placename', content: 'Nagpur' }, injectTo: 'head' },
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd(), injectTo: 'head' },
        ];
        if (ctx.bundle) {
          const files = Object.keys(ctx.bundle);
          // Art-directed hero: one preload per breakpoint, matching the <picture> in Hero.jsx.
          const srcset = (name) =>
            files
              .map((f) => [f, f.match(new RegExp(`(?:^|/)${name}-(\\d+)-[\\w-]+\\.webp$`))])
              .filter(([, m]) => m)
              .sort((a, b) => Number(a[1][1]) - Number(b[1][1]))
              .map(([f, m]) => `/${f} ${m[1]}w`)
              .join(', ');
          for (const [name, media] of [
            ['hero-portrait', '(max-width: 639px)'],
            ['hero', '(min-width: 640px)'],
          ]) {
            const imagesrcset = srcset(name);
            if (imagesrcset) {
              tags.push({
                tag: 'link',
                attrs: { rel: 'preload', as: 'image', type: 'image/webp', imagesrcset, imagesizes: '100vw', media, fetchpriority: 'high' },
                injectTo: 'head',
              });
            }
          }
          for (const re of [/source-sans-3-latin-wght-normal-[\w-]+\.woff2$/, /jost-latin-wght-normal-[\w-]+\.woff2$/]) {
            const font = files.find((f) => re.test(f));
            if (font) {
              tags.push({
                tag: 'link',
                attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
                injectTo: 'head',
              });
            }
          }
        }
        return tags;
      },
    },
  };
}

/**
 * Content-Security-Policy and other security headers.
 * Production headers are set in netlify.toml / vercel.json; they are mirrored here for `npm run preview`
 * so the policy can be tested locally. Keep all three in sync.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  'frame-src https://www.google.com',
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

export default defineConfig({
  plugins: [react(), tailwindcss(), criticalAssets()],
  preview: { headers: securityHeaders },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
        },
      },
    },
  },
});
