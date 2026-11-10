import { Mail, Phone } from 'lucide-react';
import { site } from '../data/site';
import { useScrolled } from '../hooks';
import { WhatsAppIcon } from './ui/Icons';

/**
 * Always-visible contact buttons (bottom-right) from the first page load.
 * Labels show from tablet width up; on phones the round buttons stand alone (each has an accessible name).
 */
const actions = [
  {
    label: 'WhatsApp',
    aria: 'Chat with Pyramid Incorporation on WhatsApp',
    href: site.whatsapp.link,
    external: true,
    color: 'bg-[#25D366] hover:bg-[#1ebe5b]',
    icon: <WhatsAppIcon className="size-6 sm:size-7" />,
  },
  {
    label: 'Call Now',
    aria: `Call Pyramid Incorporation on ${site.phones[0].display}`,
    href: site.phones[0].tel,
    color: 'bg-[#2563EB] hover:bg-[#1d4fd8]',
    icon: <Phone className="size-5 sm:size-6" aria-hidden="true" strokeWidth={2} />,
  },
  {
    label: 'Email Us',
    aria: `Email Pyramid Incorporation at ${site.email}`,
    href: `mailto:${site.email}`,
    color: 'bg-[#6366F1] hover:bg-[#5457e6]',
    icon: <Mail className="size-5 sm:size-6" aria-hidden="true" strokeWidth={2} />,
  },
];

/*
  Desktop/laptop behaviour: labels are shown on load; once the page is scrolled they fold away and only the
  icons remain. Hovering near the buttons (the nav has extra padding as a hover zone) or tabbing to them brings
  the labels back. Phones always show icons only.
*/
const labelCollapsed =
  'sm:pointer-events-none sm:translate-x-3 sm:opacity-0 ' +
  'sm:group-hover/fab:pointer-events-auto sm:group-hover/fab:translate-x-0 sm:group-hover/fab:opacity-100 ' +
  'sm:group-focus-within/fab:pointer-events-auto sm:group-focus-within/fab:translate-x-0 sm:group-focus-within/fab:opacity-100';

export default function FloatingContact() {
  const collapsed = useScrolled(80);

  return (
    <nav aria-label="Quick contact" className="group/fab fixed bottom-2 right-2 z-40 p-2 sm:bottom-2 sm:right-2 sm:p-4">
      <ul className="flex flex-col items-end gap-3">
        {actions.map((a) => (
          <li key={a.label}>
            <a
              href={a.href}
              aria-label={a.aria}
              {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-3"
            >
              <span
                className={`hidden rounded-md bg-white px-4 py-2 text-[0.9375rem] font-semibold text-navy shadow-[0_4px_14px_rgb(8_22_41/0.18)] ring-1 ring-black/5 transition-[opacity,transform] duration-200 ease-out sm:block ${
                  collapsed ? labelCollapsed : ''
                }`}
              >
                {a.label}
              </span>
              <span
                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_18px_rgb(8_22_41/0.28)] transition-colors sm:size-14 ${a.color}`}
              >
                {a.icon}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
