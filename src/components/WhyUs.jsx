import { reasons } from '../data/values';
import { site, experienceLabel } from '../data/site';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

export default function WhyUs() {
  const list = reasons.filter((r) => r.id !== 'established');

  return (
    <section id="why-us" aria-labelledby="why-title" className="bg-navy py-20 text-white sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading tone="dark" id="why-title" title="What you can expect from us" />
          <p className="mt-5 text-lg text-muted-light">
            We have been fixing leaks and repairing structures since {site.foundedYear}. Our Google reviews keep mentioning the same things: work
            finished on time, a careful team and fair rates.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line-dark pt-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-1 text-[0.9375rem] text-muted-light">In business</dt>
              <dd className="order-1 font-display text-4xl font-medium">{experienceLabel()}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 mt-1 text-[0.9375rem] text-muted-light">Projects completed</dt>
              <dd className="order-1 font-display text-4xl font-medium">{site.projects}</dd>
            </div>
          </dl>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {list.map((r) => (
            <li key={r.id} className="border-t border-line-dark py-6">
              <h3 className="text-xl">{r.title}</h3>
              <p className="mt-2 text-base text-muted-light">{r.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
