import { Download, FileText } from 'lucide-react';
import { site } from '../data/site';
import Container from './ui/Container';

/** "Download our brochure" band. The file lives in public/ and is set in site.brochure (src/data/site.js). */
export default function Brochure() {
  const { href, fileName, size } = site.brochure;

  return (
    <section id="brochure" aria-labelledby="brochure-title" className="border-y border-line bg-mist py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex items-start gap-5">
            <FileText aria-hidden="true" className="mt-1 hidden h-10 w-10 shrink-0 text-navy sm:block" strokeWidth={1.5} />
            <div className="max-w-2xl">
              <h2 id="brochure-title" className="text-[1.75rem] text-navy sm:text-[2rem]">
                Download our brochure
              </h2>
              <p className="mt-3 text-lg text-muted">
                Our services, waterproofing systems and past work in one document. Save it for later or share it with your builder or society.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href={href}
              download={fileName}
              className="inline-flex h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-xs bg-navy px-7 text-base font-semibold leading-none text-white transition-colors duration-150 hover:bg-navy-2"
            >
              <Download aria-hidden="true" className="h-5 w-5" />
              Download brochure
            </a>
            <p className="mt-2 text-sm text-muted md:text-right">{size}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
