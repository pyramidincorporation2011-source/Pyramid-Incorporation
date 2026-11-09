const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs font-semibold text-[0.9375rem] leading-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-navy text-white hover:bg-navy-2',
  light: 'bg-white text-navy hover:bg-mist',
  outlineLight: 'border border-white/60 text-white hover:bg-white hover:text-navy',
  outlineDark: 'border border-navy text-navy hover:bg-navy hover:text-white',
  whatsapp: 'bg-[#17733D] text-white hover:bg-[#125c31]',
};

const sizes = {
  sm: 'h-10 px-4',
  md: 'h-12 px-6',
  lg: 'h-[3.25rem] px-7 text-base',
};

export default function Button({ as, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const Tag = as ?? (href ? 'a' : 'button');
  const extra = Tag === 'button' && !props.type ? { type: 'button' } : {};
  return (
    <Tag href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...extra} {...props}>
      {children}
    </Tag>
  );
}
