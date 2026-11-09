import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { nav, site } from '../data/site';
import { useActiveSection, useFocusTrap, useLockBodyScroll, useMounted, useScrolled } from '../hooks';
import Logo from './ui/Logo';
import Button from './ui/Button';

const ids = nav.map((n) => n.id);

export default function Header() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/*
        Fixed over the hero photo with a light navy tint; turns solid navy once the page scrolls.
        The utility bar (contact details as plain text) folds away on scroll.
      */}
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-navy shadow-[0_2px_16px_rgb(8_22_41/0.35)]' : 'bg-ink/35'
        }`}
      >
      <div
        className={`hidden overflow-hidden border-b border-white/10 text-[0.875rem] text-white/80 transition-[height] duration-300 lg:block ${
          scrolled ? 'h-0 border-transparent' : 'h-10'
        }`}
        aria-hidden={scrolled ? 'true' : undefined}
      >
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <p>{site.hours.display}</p>
          <ul className="flex items-center gap-6">
            <li>
              <a href={site.phones[0].tel} className="hover:text-white" tabIndex={scrolled ? -1 : undefined}>
                {site.phones[0].display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white" tabIndex={scrolled ? -1 : undefined}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" className="hover:text-white" tabIndex={scrolled ? -1 : undefined}>
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <a href="#top" className="shrink-0" aria-label="Pyramid Incorporation, back to top">
            <Logo tone="dark" className="h-9 w-auto lg:h-10" />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`border-b-2 py-2 text-base font-medium transition-colors ${
                        isActive ? 'border-white text-white' : 'border-transparent text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Button href="#contact" size="sm" variant="light" className="px-5">
                Contact us
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-xs text-white hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}

function MobileMenu({ open, onClose, active }) {
  useLockBodyScroll(open);
  const ref = useFocusTrap(open, onClose);
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={ref}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-white text-text shadow-xl outline-none"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
              <span className="font-display text-lg text-navy">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-xs text-navy hover:bg-mist"
                aria-label="Close menu"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-2">
              <ul>
                {nav.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`#${item.id}`}
                      onClick={onClose}
                      aria-current={active === item.id ? 'location' : undefined}
                      className={`block py-4 text-lg font-medium ${active === item.id ? 'text-navy underline underline-offset-4' : 'text-text'}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid gap-3 border-t border-line p-5">
              <Button href="#contact" onClick={onClose}>
                Contact us
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button href={site.phones[0].tel} variant="outlineDark">
                  Call
                </Button>
                <Button href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                  WhatsApp
                </Button>
              </div>
              <p className="text-sm text-muted">{site.hours.display}</p>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
