import { reviews } from '../data/reviews';
import { site } from '../data/site';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

const google = site.listings.find((l) => l.name === 'Google Business');

/** Google-style star rating (yellow stars), with the rating announced to screen readers. */
function Stars({ rating, size = 'size-4' }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="flex" role="img" aria-label={`Rated ${rating} out of 5 on Google`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={`${size} ${i <= rating ? 'text-[#FBBC04]' : 'text-[#d6d9de]'}`}>
            <path
              fill="currentColor"
              d="M10 1.5l2.6 5.3 5.9.9-4.25 4.15 1 5.85L10 14.95 4.75 17.7l1-5.85L1.5 7.7l5.9-.9L10 1.5z"
            />
          </svg>
        ))}
      </span>
      <span className="text-sm text-muted">Google review</span>
    </div>
  );
}

export default function Reviews() {
  const featured = reviews.find((r) => r.featured);
  const others = reviews.filter((r) => !r.featured);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-title" title="What our clients say" intro="Reviews from homeowners and businesses on our Google Business profile." />
          <a
            href={google.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
          >
            Read all reviews on Google<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {featured && (
          <figure className="mt-10 rounded-xs border border-line bg-mist p-8 sm:p-10">
            <Stars rating={featured.rating} size="size-5" />
            <blockquote className="mt-4 max-w-4xl font-display text-xl leading-relaxed text-navy sm:text-2xl">
              <p>“{featured.text}”</p>
            </blockquote>
            <figcaption className="mt-6 text-base">
              <span className="font-semibold text-text">{featured.name}</span>
              {featured.service && <span className="text-muted">, {featured.service.toLowerCase()}</span>}
            </figcaption>
          </figure>
        )}

        <ul className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {others.map((r) => (
            <li key={r.name} className="mb-6 break-inside-avoid">
              <figure className="rounded-xs border border-line bg-mist p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 text-base text-text">
                  <p>
                    “{r.text}
                    {r.truncated ? ' …' : ''}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 text-[0.9375rem]">
                  <span className="font-semibold text-text">{r.name}</span>
                  {r.service && <span className="text-muted">, {r.service.toLowerCase()}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-muted">Quoted unedited from public Google reviews. “…” marks a review shortened by Google.</p>
      </Container>
    </section>
  );
}
