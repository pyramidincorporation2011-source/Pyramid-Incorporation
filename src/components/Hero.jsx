import { site } from '../data/site';
import { getImage } from '../lib/images';
import Button from './ui/Button';

const facts = [
  { value: String(site.foundedYear), label: 'Established in Nagpur' },
  { value: site.projects, label: 'Projects completed' },
  { value: String(site.serviceCount), label: 'Specialised services' },
  { value: 'Free', label: 'Site inspection' },
];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="relative isolate overflow-hidden bg-navy text-white">
        <HeroImage />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        {/* Darkens the top edge so the tinted header blends into the photo. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/60 to-transparent" />

        <div className="container-x flex min-h-[40rem] flex-col justify-center pb-20 pt-36 lg:min-h-[46rem] lg:pt-48">
          <h1 id="hero-title" className="max-w-3xl text-[2.375rem] leading-[1.15] sm:text-5xl lg:text-[3.5rem]">
            Waterproofing and structural repair contractors
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            We find where the water is getting in and fix it at the source: bathrooms, terraces, water tanks, basements and concrete repair.
            Based in Nagpur since {site.foundedYear}, working across multiple states.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" variant="light" size="lg">
              Request a free site inspection
            </Button>
            <Button href="#services" variant="outlineLight" size="lg">
              View our services
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col py-7 sm:py-9 ${i % 2 === 1 ? 'border-l border-line pl-5 sm:pl-8' : ''} ${
                i >= 2 ? 'border-t border-line lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}
            >
              <dt className="order-2 mt-1 text-[0.9375rem] text-muted">{f.label}</dt>
              <dd className="order-1 font-display text-3xl font-medium text-navy sm:text-4xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Art-directed hero: portrait crop on phones, landscape from 640px. Preloaded via vite.config.js. */
function HeroImage() {
  const wide = getImage('stock/hero');
  const tall = getImage('stock/hero-portrait');
  return (
    <picture>
      {tall && <source media="(max-width: 639px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />}
      <img
        src={wide.src}
        srcSet={wide.srcSet}
        sizes="100vw"
        width={wide.width}
        height={wide.height}
        alt="Construction crew in hard hats and safety vests spreading concrete on a rooftop slab"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_50%]"
      />
    </picture>
  );
}
