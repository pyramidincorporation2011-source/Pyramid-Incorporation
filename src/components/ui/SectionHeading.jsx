/** Section title with an optional one-line introduction. */
export default function SectionHeading({ title, intro, id, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 id={id} className={`text-[2rem] sm:text-[2.5rem] ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${dark ? 'text-muted-light' : 'text-muted'}`}>{intro}</p>}
    </div>
  );
}
