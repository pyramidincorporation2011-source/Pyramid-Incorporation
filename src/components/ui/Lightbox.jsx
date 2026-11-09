import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useFocusTrap, useLockBodyScroll, useMounted } from '../../hooks';
import { getImage } from '../../lib/images';

/**
 * Dependency-free lightbox.
 * Keyboard: ←/→ to navigate, Esc to close. Touch: swipe left/right.
 * items: [{ src, alt, caption, isCompanyPhoto }]
 */
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const open = index !== null && index >= 0;
  useLockBodyScroll(open);
  const ref = useFocusTrap(open, onClose);
  const touch = useRef(null);
  const mounted = useMounted();
  const count = items.length;

  const go = useCallback(
    (dir) => onIndexChange((i) => (i + dir + count) % count),
    [count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  const item = open ? items[index] : null;
  const img = item ? getImage(item.src) : null;

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && img && (
        <m.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm text-white/70" aria-live="polite">
              <span className="tabular-nums">
                {index + 1} / {count}
              </span>
            </p>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="inline-flex size-11 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10"
              aria-label="Close photo viewer"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <m.img
              key={item.src}
              src={img.largest}
              srcSet={img.srcSet}
              sizes="(min-width: 640px) 80vw, 100vw"
              alt={item.alt}
              width={img.width}
              height={img.height}
              className="max-h-full w-auto max-w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-sm bg-ink/60 text-white transition-colors hover:bg-white/15 sm:left-4"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-sm bg-ink/60 text-white transition-colors hover:bg-white/15 sm:right-4"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pb-6 pt-4 text-center sm:px-6">
            <p className="text-base font-medium text-white">{item.caption}</p>
            <p className="mt-1 text-sm text-white/70">
              {item.isCompanyPhoto ? 'Pyramid Incorporation project' : 'Representative image'}
            </p>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
