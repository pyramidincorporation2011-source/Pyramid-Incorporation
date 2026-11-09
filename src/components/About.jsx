import { site, experienceLabel } from '../data/site';
import { values } from '../data/values';
import { aboutPhoto } from '../data/gallery';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Img from './ui/Img';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="about-title" title="About Pyramid Incorporation" />
            <div className="mt-6 space-y-5 text-lg text-text">
              <p>
                Pyramid Incorporation is a waterproofing and structural repair firm based in Ravi Nagar, Nagpur. Since {site.foundedYear} we have
                completed more than {site.projects.replace('+', '')} projects for homes, apartments, clinics, studios and other buildings, in
                Nagpur, across Vidarbha and in other states.
              </p>
              <p>
                Every job starts with finding where the water is actually coming from. We then recommend the system that suits the structure, and
                apply it with proper surface preparation and testing. {site.materialSupply}
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Proprietor</dt>
                <dd className="mt-1 font-medium text-navy">{site.proprietor}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Experience</dt>
                <dd className="mt-1 font-medium text-navy">{experienceLabel()}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Office</dt>
                <dd className="mt-1 font-medium text-navy">Ravi Nagar, Nagpur</dd>
              </div>
            </dl>

            {site.press.map((p) => (
              <p key={p.href} className="mt-8 text-[0.9375rem] text-muted">
                Featured in {p.publication}:{' '}
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
                >
                  {p.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ))}
          </div>

          <figure className="lg:col-span-5">
            <Img
              image={aboutPhoto.src}
              alt={aboutPhoto.alt}
              sizes="(min-width: 1024px) 420px, 100vw"
              className="aspect-[4/5] w-full rounded-xs object-cover sm:max-w-md lg:max-w-none"
            />
            <figcaption className="mt-3 text-sm text-muted">{aboutPhoto.caption}. Pyramid Incorporation project.</figcaption>
          </figure>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-2xl text-navy">Our mission</h3>
            <p className="mt-3 text-lg text-text">{site.mission}</p>
          </div>
          <div>
            <h3 className="text-2xl text-navy">Our vision</h3>
            <p className="mt-3 text-lg text-text">{site.vision}</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl text-navy">What we stand for</h3>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="border-t border-line py-4 text-lg text-text">
                {v.title}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
