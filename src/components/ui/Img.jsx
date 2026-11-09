import { getImage } from '../../lib/images';

/**
 * Responsive WebP image from the generated manifest.
 * Lazy by default; pass priority for the LCP image.
 */
export default function Img({ image, alt, sizes = '100vw', priority = false, className = '', ...props }) {
  const img = getImage(image);
  if (!img) return null;
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      {...props}
    />
  );
}
