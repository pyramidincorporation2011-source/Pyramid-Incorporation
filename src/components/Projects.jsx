import { useMemo, useState } from 'react';
import { gallery } from '../data/gallery';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Img from './ui/Img';
import Lightbox from './ui/Lightbox';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'company', label: 'Our projects' },
  { id: 'representative', label: 'Representative' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(null);

  const items = useMemo(() => {
    if (filter === 'company') return gallery.filter((g) => g.isCompanyPhoto);
    if (filter === 'representative') return gallery.filter((g) => !g.isCompanyPhoto);
    return gallery;
  }, [filter]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="projects-title"
          title="Projects"
          intro="Photos from our sites, mostly terrace waterproofing. Photos marked “Representative” are licensed stock images, not our work."
        />

        <div role="group" aria-label="Filter photos" className="no-scrollbar -mx-5 mt-10 flex gap-8 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`-mb-px shrink-0 border-b-2 pb-3 text-base font-medium transition-colors ${
                filter === f.id ? 'border-navy text-navy' : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.src}>
              <figure>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="relative block w-full overflow-hidden rounded-xs bg-mist"
                  aria-label={`View larger: ${item.caption}`}
                  aria-haspopup="dialog"
                >
                  <Img
                    image={item.src}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full object-cover transition-opacity hover:opacity-90"
                  />
                  {!item.isCompanyPhoto && (
                    <span className="absolute left-3 top-3 rounded-xs bg-white/90 px-2 py-1 text-xs font-semibold text-text">Representative image</span>
                  )}
                </button>
                <figcaption className="mt-3 text-[0.9375rem] text-text">
                  {item.caption}
                  {item.isCompanyPhoto && <span className="block text-sm text-muted">Pyramid Incorporation project</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </section>
  );
}
