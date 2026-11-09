/**
 * Projects & Gallery.
 *
 * isCompanyPhoto: true  → genuine Pyramid Incorporation site photo ("Pyramid Incorporation project").
 * isCompanyPhoto: false → licensed stock photo, always labelled "Representative image".
 *
 * To add your own photo: copy it into src/assets/originals/projects/ (e.g. project-07.jpg),
 * run `npm run images`, then add one line below with src: 'projects/project-07'.
 */
export const gallery = [
  {
    src: 'projects/project-03',
    alt: 'Worker spreading a dark waterproofing coat across a terrace slab with a squeegee',
    caption: 'Applying a waterproofing coat on a residential terrace',
    isCompanyPhoto: true,
  },
  {
    src: 'projects/project-02',
    alt: 'Worker hosing down a terrace slab, with a bucket of mixed material and a paddle mixer in the foreground',
    caption: 'Terrace surface preparation and material mixing',
    isCompanyPhoto: true,
  },
  {
    src: 'projects/project-01',
    alt: 'Cement-based coat being spread over a terrace slab, with a mixing pan and material buckets',
    caption: 'Cementitious coat on a terrace slab',
    isCompanyPhoto: true,
  },
  {
    src: 'projects/project-05',
    alt: 'Terrace with a fresh cementitious coat carried up the base of the parapet walls',
    caption: 'Terrace coating carried up the parapet walls',
    isCompanyPhoto: true,
  },
  {
    src: 'projects/project-04',
    alt: 'Large open terrace with a freshly applied coating, trees and a water tank in the background',
    caption: 'Coating on a large open terrace',
    isCompanyPhoto: true,
  },
  {
    src: 'projects/project-06',
    alt: 'Freshly coated concrete slab next to a steel-roofed shed',
    caption: 'Coated slab beside a steel-roofed shed',
    isCompanyPhoto: true,
  },
  {
    src: 'stock/rep-exterior',
    alt: 'Worker on a scaffold painting the exterior wall of a building',
    caption: 'Exterior wall work from a scaffold',
    isCompanyPhoto: false,
  },
  {
    src: 'stock/rep-building',
    alt: 'Multi-storey brick and concrete building under construction',
    caption: 'Building under construction',
    isCompanyPhoto: false,
  },
];

export const aboutPhoto = gallery[0];
