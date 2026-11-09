import { leadership } from '../data/leadership';
import { site } from '../data/site';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Img from './ui/Img';

export default function Leadership() {
  const press = site.press[0];

  return (
    <section id="proprietor" aria-labelledby="proprietor-title" className="bg-mist py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-4">
          <Img
            image={leadership.photo}
            alt={leadership.photoAlt}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 360px, 100vw"
            className="aspect-[4/5] w-full max-w-[16rem] rounded-xs object-cover object-top sm:max-w-sm lg:max-w-none"
          />
          <figcaption className="mt-4">
            <span className="block font-display text-xl text-navy">{leadership.name}</span>
            <span className="text-[0.9375rem] text-muted">{leadership.role}</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-8">
          <SectionHeading id="proprietor-title" title="A note from our proprietor" />
          <p className="mt-6 text-lg text-text">{leadership.intro}</p>

          <blockquote className="my-10 border-l-2 border-navy pl-6">
            <p className="font-display text-2xl leading-snug text-navy sm:text-[1.75rem]">“{leadership.quote}”</p>
            <footer className="mt-3 text-[0.9375rem] text-muted">
              {leadership.name}, speaking to{' '}
              {press ? (
                <a
                  href={press.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
                >
                  {leadership.quoteSource}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                leadership.quoteSource
              )}
            </footer>
          </blockquote>

          <div className="space-y-4 text-lg text-text">
            {leadership.approach.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
