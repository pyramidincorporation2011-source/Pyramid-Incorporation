import { useId, useState } from 'react';
import { site, whatsappLink } from '../data/site';
import { services } from '../data/services';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();
const OTHER = 'Other / Not sure';
const empty = { name: '', phone: '', email: '', service: '', message: '', company: '' };

/** Accepts 10-digit Indian mobile numbers, with optional +91 / 0 prefix and spaces or dashes. */
export function normalisePhone(value) {
  const digits = value.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (!normalisePhone(v.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number, e.g. 98909 53541.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address, or leave it blank.';
  return e;
}

function buildWhatsAppMessage(v) {
  const lines = ['Hello Pyramid Incorporation, I would like to make an enquiry.', '', `Name: ${v.name.trim()}`, `Phone: ${v.phone.trim()}`];
  if (v.email.trim()) lines.push(`Email: ${v.email.trim()}`);
  if (v.service) lines.push(`Service: ${v.service}`);
  if (v.message.trim()) lines.push(`Message: ${v.message.trim()}`);
  return lines.join('\n');
}

const linkCls = 'text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-title"
              title="Contact us"
              intro="Tell us about the problem and we'll arrange a site inspection. Inspection and consultation are free. We take on work in Nagpur and in other states."
            />

            <dl className="mt-10 divide-y divide-line border-y border-line">
              <ContactRow label="Phone">
                {site.phones.map((p) => (
                  <a key={p.tel} href={p.tel} className={`block w-fit ${linkCls}`}>
                    {p.display}
                  </a>
                ))}
              </ContactRow>
              <ContactRow label="WhatsApp">
                <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Message us on WhatsApp<span className="sr-only"> (opens WhatsApp)</span>
                </a>
              </ContactRow>
              <ContactRow label="Email">
                <a href={`mailto:${site.email}`} className={`[overflow-wrap:anywhere] ${linkCls}`}>
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow label="Office">
                <address className="not-italic">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a href={site.mapsLink} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block text-[0.9375rem] font-semibold ${linkCls}`}>
                  Get directions<span className="sr-only"> (opens Google Maps)</span>
                </a>
              </ContactRow>
              <ContactRow label="Hours">{site.hours.display}</ContactRow>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>

        <iframe
          title={`Map showing the Pyramid Incorporation office: ${site.address.oneLine}`}
          src={site.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-14 block h-80 w-full rounded-xs border border-line"
        />
      </Container>
    </section>
  );
}

function ContactRow({ label, children }) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
      <dt className="text-[0.9375rem] font-semibold text-muted">{label}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  );
}

function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const id = (n) => `${uid}-${n}`;

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const check = () => {
    const e = validate(values);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(id(first))?.focus();
    return !first;
  };

  const sendWhatsApp = () => {
    if (!check()) return;
    window.open(whatsappLink(buildWhatsAppMessage(values)), '_blank', 'noopener,noreferrer');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      sendWhatsApp();
      return;
    }
    if (!check()) return;
    if (values.company) {
      // Honeypot filled: almost certainly a bot. Pretend success, send nothing.
      setStatus('success');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website enquiry${values.service ? `: ${values.service}` : ''}`,
          from_name: 'Pyramid Incorporation website',
          name: values.name.trim(),
          phone: normalisePhone(values.phone),
          email: values.email.trim() || undefined,
          service: values.service || 'Not specified',
          message: values.message.trim() || '(no message)',
          botcheck: false,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || 'Request failed');
      setStatus('success');
      setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xs border border-line bg-mist p-8 sm:p-10">
        <h3 className="text-2xl text-navy">Thank you. Your enquiry has been sent.</h3>
        <p className="mt-3 text-text">
          We'll call you back shortly. For anything urgent, call{' '}
          <a href={site.phones[0].tel} className={`font-semibold ${linkCls}`}>
            {site.phones[0].display}
          </a>
          .
        </p>
        <Button variant="outlineDark" className="mt-8" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const field =
    'block w-full rounded-xs border bg-white px-4 py-3 text-base text-text placeholder:text-muted/70 focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#2f6fd6]';
  const border = (n) => (errors[n] ? 'border-[#B42318]' : 'border-[#c9ced6]');
  const label = 'mb-2 block text-[0.9375rem] font-semibold text-text';
  const errorText = 'mt-2 text-sm text-[#B42318]';

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xs border border-line bg-mist p-6 sm:p-10" aria-labelledby={id('title')}>
      <h3 id={id('title')} className="text-2xl text-navy">
        Send an enquiry
      </h3>
      <p className="mt-2 text-[0.9375rem] text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className={label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? id('name-err') : undefined}
            value={values.name}
            onChange={update}
            className={`${field} ${border('name')}`}
          />
          {errors.name && (
            <p id={id('name-err')} className={errorText}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? id('phone-err') : undefined}
            value={values.phone}
            onChange={update}
            className={`${field} ${border('phone')}`}
          />
          {errors.phone && (
            <p id={id('phone-err')} className={errorText}>
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? id('email-err') : undefined}
            value={values.email}
            onChange={update}
            className={`${field} ${border('email')}`}
          />
          {errors.email && (
            <p id={id('email-err')} className={errorText}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('service')} className={label}>
            Service required
          </label>
          <select
            id={id('service')}
            name="service"
            value={values.service}
            onChange={update}
            className={`${field} ${border('service')} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230B1F3A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value={OTHER}>{OTHER}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className={label}>
            Message <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={4}
            placeholder="Where is the leak, and how long has it been there?"
            value={values.message}
            onChange={update}
            className={`${field} ${border('message')} resize-y`}
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id('company')}>Company</label>
          <input id={id('company')} name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-xs border border-[#B42318]/30 bg-white p-4 text-[0.9375rem] text-[#8A1C12]">
          Sorry, the form couldn't be sent. Please try again, use WhatsApp, or call {site.phones[0].display}.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {WEB3FORMS_KEY ? (
          <>
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </Button>
            <Button type="button" size="lg" variant="outlineDark" onClick={sendWhatsApp}>
              Send via WhatsApp instead
            </Button>
          </>
        ) : (
          <Button type="submit" size="lg">
            Send enquiry on WhatsApp
          </Button>
        )}
      </div>
      <p className="mt-4 text-sm text-muted">
        {WEB3FORMS_KEY
          ? 'Your details are used only to respond to your enquiry.'
          : 'This opens WhatsApp with your enquiry filled in, ready to send. Your details are used only to respond to you.'}
      </p>
    </form>
  );
}
