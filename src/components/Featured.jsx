import { site } from '../data/site';
import Container from './ui/Container';

/** Press coverage band ("Featured in …"). Entries come from site.press in src/data/site.js. */
export default function Featured() {
  if (!site.press.length) return null;

  return (
    <section aria-labelledby="featured-title" className="border-y border-line bg-mist py-12 sm:py-14">
      <Container>
        <h2 id="featured-title" className="sr-only">
          Featured in the press
        </h2>
        <ul className="grid gap-8">
          {site.press.map((p) => (
            <li key={p.href} className="grid items-center gap-4 md:grid-cols-12 md:gap-10">
              <p className="md:col-span-3">
                <span className="block text-[0.9375rem] text-muted">Featured in</span>
                <span className="mt-1 block font-display text-2xl font-medium text-navy">{p.publication}</span>
              </p>
              <p className="font-display text-xl leading-snug text-text sm:text-2xl md:col-span-6">“{p.title}”</p>
              <p className="md:col-span-3 md:text-right">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-xs border border-navy px-5 text-[0.9375rem] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Read the article
                  <span className="sr-only"> on {p.publication} (opens in a new tab)</span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
