/**
 * Single source of truth for business information.
 * Edit here; every section, the footer, the JSON-LD and the meta tags read from this file.
 * See the "Pre-launch checklist" in README.md for items to confirm with the owner.
 */

export const FOUNDED_YEAR = 2010;

/** Whole years since founding, e.g. 2026 → 16. */
export const yearsInBusiness = (now = new Date()) => now.getFullYear() - FOUNDED_YEAR;
/** Display form, e.g. "16+ years". Never hard-code this. */
export const experienceLabel = (now = new Date()) => `${yearsInBusiness(now)}+ years`;

const ADDRESS_LINES = ['G-4, Sai Regency, Ravi Nagar Square', 'Amravati Road, Nagpur', 'Maharashtra 440033'];
const ADDRESS_ONE_LINE = 'G-4, Sai Regency, Ravi Nagar Square, Amravati Road, Nagpur, Maharashtra 440033';

/** Primary WhatsApp number (digits only, with country code) – used for pre-filled messages. */
const WHATSAPP_NUMBER = '919890953541';

export const site = {
  name: 'Pyramid Incorporation',
  tagline: 'Waterproofing Specialist',
  url: 'https://www.pyramidincorporation.com/',
  description:
    'Waterproofing and structural repair contractors in Nagpur since 2010. Bathroom, terrace, tank and basement waterproofing, crack treatment, PU and cement grouting, core cutting and rebaring. Based in Nagpur, working across multiple states.',
  business: 'Waterproofing and structural repair agency',
  materialSupply: 'We also supply waterproofing chemicals and materials for contractors and builders.',
  proprietor: 'Nitten R Tiwarii',
  foundedYear: FOUNDED_YEAR,
  projects: '400+',
  projectsLabel: '400+ projects completed',
  serviceCount: 10,
  /** Based in Nagpur; the company also works in other states. */
  areaServed: ['Nagpur', 'Vidarbha', 'India'],

  phones: [
    { display: '+91 98909 53541', tel: 'tel:+919890953541', e164: '+919890953541' },
    { display: '+91 72494 90517', tel: 'tel:+917249490517', e164: '+917249490517' },
  ],
  whatsapp: {
    /** Business "click to chat" link (no pre-filled text). */
    link: 'https://wa.me/message/QE5NCTZBTL6HA1',
    number: WHATSAPP_NUMBER,
    display: '+91 98909 53541',
  },
  email: 'pyramidincorporation2011@gmail.com',

  address: {
    lines: ADDRESS_LINES,
    oneLine: ADDRESS_ONE_LINE,
    street: 'G-4, Sai Regency, Ravi Nagar Square, Amravati Road',
    locality: 'Nagpur',
    region: 'Maharashtra',
    postalCode: '440033',
    country: 'IN',
  },
  mapsLink: 'https://maps.app.goo.gl/TZuU1sx18kfyxD3V8',
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_ONE_LINE)}&output=embed`,

  hours: {
    display: 'Monday – Saturday, 9:00 AM – 7:00 PM',
    short: 'Mon–Sat · 9 AM – 7 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  gstin: '27ACLPT1798H1ZW',

  listings: [
    { name: 'Google Business', href: 'https://share.google/gVc44svbdGa6KMf4N' },
    { name: 'IndiaMART', href: 'https://www.indiamart.com/pyramid-incorporation/profile.html' },
    {
      name: 'Justdial',
      href: 'https://www.justdial.com/Nagpur/Pyramid-Incorporation-Opposite-Sengupta-Hospitalhanuman-Mandir-Ravi-Nagar/0712PX712-X712-140430102254-T5P9_BZDET',
    },
  ],
  /**
   * Search phrases the site should be found for. Used in the keywords meta tag and the JSON-LD business data.
   * Google ranks on the visible page text, title and description, so keep these phrases in the copy as well.
   */
  seoKeywords: [
    'waterproofing contractors in Nagpur',
    'waterproofing services Nagpur',
    'waterproofing company Nagpur',
    'bathroom waterproofing Nagpur',
    'toilet leakage repair',
    'terrace waterproofing Nagpur',
    'roof leakage solution',
    'terrace heat insulation',
    'water tank waterproofing',
    'underground tank leakage repair',
    'basement waterproofing',
    'wall dampness and seepage treatment',
    'crack repair and filling',
    'PU injection grouting Nagpur',
    'cement grouting',
    'expansion joint sealing',
    'concrete core cutting Nagpur',
    'rebaring and structural repair',
    'waterproofing chemicals supplier Nagpur',
    'waterproofing contractors Vidarbha',
    'waterproofing contractors Maharashtra',
  ],

  /** Add profiles as { name: 'Instagram', href: 'https://…' }. The footer renders this only when filled. */
  social: [],

  /**
   * Press coverage. Shown in About and the footer. Only the publication, headline and link are used:
   * the article's own figures (founding year, project count, percentages, ISO) are deliberately not repeated.
   */
  press: [
    {
      publication: 'SiliconIndia Homes',
      title: 'Pyramid Incorporation: Elevating the Standards of Waterproofing Across India',
      href: 'https://www.siliconindiahomes.com/home-tech/vendor/pyramid-incorporation-elevating-the-standards-of-waterproofing-across-india-cid-627.html',
    },
  ],

  mission:
    'Solve every leakage and dampness problem at its source, with honest assessment, the right system for the structure, and work that is done properly the first time.',
  vision:
    'To be the most trusted name in waterproofing, delivering long-lasting protection through sound diagnosis, quality materials and careful execution.',
};

/** Builds a wa.me link with a pre-filled message. */
export const whatsappLink = (text) =>
  text ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : site.whatsapp.link;

export const nav = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
];
