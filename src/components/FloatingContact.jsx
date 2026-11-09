import { site } from '../data/site';
import { useScrolled } from '../hooks';
import { WhatsAppIcon } from './ui/Icons';

/** WhatsApp button (tablet and desktop) and a sticky Call / WhatsApp bar on phones. */
export default function FloatingContact() {
  const visible = useScrolled(400);
  return (
    <>
      <a
        href={site.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pyramid Incorporation on WhatsApp"
        className={`fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#17733D] text-white shadow-lg transition-opacity duration-200 hover:bg-[#125c31] sm:inline-flex ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        tabIndex={visible ? 0 : -1}
      >
        <WhatsAppIcon className="size-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] sm:hidden">
        <a href={site.phones[0].tel} className="flex h-14 items-center justify-center text-base font-semibold text-navy">
          Call us
        </a>
        <a
          href={site.whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center bg-[#17733D] text-base font-semibold text-white"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
