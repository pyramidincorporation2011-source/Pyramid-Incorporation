import { process } from '../data/process';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="process-title"
          title="How we work"
          intro="You know what we found, what we recommend and what it costs before any work begins."
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, i) => (
            <li key={step.title} className="border-t-2 border-navy pt-5">
              <p className="text-sm font-semibold text-muted">Step {i + 1}</p>
              <h3 className="mt-1 text-xl text-navy">{step.title}</h3>
              <p className="mt-3 text-base text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
