import { nav, site } from '../data/site';
import { services } from '../data/services';
import Container from './ui/Container';
import Logo from './ui/Logo';

const link = 'text-white/80 hover:text-white hover:underline underline-offset-4';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-24 pt-16 text-white sm:pb-10">
      <Container>
        <div className="grid gap-10 border-b border-line-dark pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo className="h-10 w-auto" />
            <p className="mt-5 max-w-sm text-[0.9375rem] text-muted-light">
              Waterproofing and structural repair contractors, based in Nagpur since {site.foundedYear} and working across multiple states. We also
              supply waterproofing chemicals.
            </p>
            {site.social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-5 text-[0.9375rem]">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-display text-base font-medium text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-base font-medium text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={link}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-base font-medium text-white">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-white/80">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={p.tel} className={link}>
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className={`[overflow-wrap:anywhere] ${link}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <address className="not-italic">{site.address.oneLine}</address>
              </li>
              <li>{site.hours.short}</li>
            </ul>

            <h2 className="mt-8 font-display text-base font-medium text-white">Find us on</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {[...site.listings, ...site.press.map((p) => ({ name: p.publication, href: p.href }))].map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {l.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-sm text-muted-light sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Pyramid Incorporation. All rights reserved.</p>
          <p>GSTIN {site.gstin}</p>
        </div>
      </Container>
    </footer>
  );
}
