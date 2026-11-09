import logoDark from '../../assets/brand/logo-horizontal-dark.svg';
import logoLight from '../../assets/brand/logo-horizontal.svg';

/** Horizontal brand lockup. `tone="dark"` is for navy/ink backgrounds. */
export default function Logo({ tone = 'dark', className = 'h-9 w-auto' }) {
  return (
    <img
      src={tone === 'dark' ? logoDark : logoLight}
      alt="Pyramid Incorporation"
      width="2208"
      height="355"
      className={className}
      decoding="async"
    />
  );
}
