import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { useFocusTrap, useLockBodyScroll, useMounted } from '../../hooks';

/**
 * Accessible dialog: role="dialog", aria-modal, labelled by `labelledBy`,
 * focus trapped, Esc and backdrop click close, focus returns to the trigger.
 */
export default function Modal({ open, onClose, labelledBy, describedBy, children, className = '' }) {
  useLockBodyScroll(open);
  const ref = useFocusTrap(open, onClose);
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <m.div
            className="absolute inset-0 bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative max-h-[92dvh] w-full overflow-y-auto rounded-t-md bg-white text-text shadow-2xl outline-none sm:max-w-3xl sm:rounded-md ${className}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-sm bg-white/90 text-navy shadow transition-colors hover:bg-white"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
