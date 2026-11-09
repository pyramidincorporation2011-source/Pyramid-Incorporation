import { useMemo, useState } from 'react';
import { services, serviceCategories } from '../data/services';
import { whatsappLink } from '../data/site';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Img from './ui/Img';
import Modal from './ui/Modal';
import Button from './ui/Button';

const enquiry = (title) => `Hello Pyramid Incorporation, I'd like to enquire about ${title}.`;

/** Column span for the closing panel so it always completes the last grid row. */
const fill = (n) => {
  const sm = n % 2 === 0 ? 'sm:col-span-2' : 'sm:col-span-1';
  const lg = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'][n % 3];
  return `${sm} ${lg}`;
};

export default function Services() {
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const shown = useMemo(() => (filter === 'all' ? services : services.filter((s) => s.category === filter)), [filter]);
  const current = services.find((s) => s.id === openId);

  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="services-title"
          title="Our services"
          intro="Waterproofing, grouting and structural repair for homes, apartments and commercial premises. Each job is matched to the right system for the structure."
        />

        <div role="group" aria-label="Filter services" className="no-scrollbar -mx-5 mt-10 flex gap-8 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0">
          {serviceCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`-mb-px shrink-0 border-b-2 pb-3 text-base font-medium transition-colors ${
                filter === c.id ? 'border-navy text-navy' : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} of {services.length} services
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <li key={s.id} className="flex flex-col overflow-hidden rounded-xs border border-line bg-white">
              <Img
                image={s.image}
                alt={s.alt}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl text-navy">{s.title}</h3>
                <p className="mt-3 flex-1 text-base text-muted">{s.short}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.9375rem] font-semibold">
                  <button
                    type="button"
                    onClick={() => setOpenId(s.id)}
                    className="text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
                    aria-haspopup="dialog"
                  >
                    Learn more<span className="sr-only"> about {s.title}</span>
                  </button>
                  <a
                    href={whatsappLink(enquiry(s.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17733D] underline decoration-[#17733D]/30 underline-offset-4 hover:decoration-[#17733D]"
                  >
                    Enquire on WhatsApp<span className="sr-only"> about {s.title} (opens WhatsApp)</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
          <li className={`flex flex-col justify-center gap-8 rounded-xs bg-navy p-8 text-white sm:p-10 ${fill(shown.length)}`}>
            <div className="max-w-lg">
              <h3 className="text-2xl">Not sure which service you need?</h3>
              <p className="mt-3 text-lg text-muted-light">
                Leaks often show up far from where they start. We'll inspect the site and tell you what's actually needed. The inspection is free.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" variant="light">
                Book a site inspection
              </Button>
              <Button
                href={whatsappLink('Hello Pyramid Incorporation, I have a leakage problem and would like a site inspection.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlineLight"
              >
                Message us on WhatsApp
              </Button>
            </div>
          </li>
        </ul>
      </Container>

      <Modal open={Boolean(current)} onClose={() => setOpenId(null)} labelledBy="service-dialog-title" describedBy="service-dialog-desc">
        {current && (
          <article>
            <Img image={current.image} alt={current.alt} sizes="(min-width: 768px) 768px, 100vw" className="aspect-[21/9] w-full object-cover" />
            <div className="p-6 sm:p-8">
              <h3 id="service-dialog-title" className="text-2xl text-navy sm:text-3xl">
                {current.title}
              </h3>
              <p id="service-dialog-desc" className="mt-3 text-lg text-text">
                {current.short}
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="text-lg text-navy">What we do</h4>
                  <ul className="bullet-list mt-3 space-y-2 text-base text-text">
                    {current.whatWeDo.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg text-navy">Typical signs you need it</h4>
                  <ul className="bullet-list mt-3 space-y-2 text-base text-text">
                    {current.signs.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
                <Button href="#contact" onClick={() => setOpenId(null)}>
                  Request a site inspection
                </Button>
                <Button href={whatsappLink(enquiry(current.title))} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                  Enquire on WhatsApp
                </Button>
              </div>
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}
