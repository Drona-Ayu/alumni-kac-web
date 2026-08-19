/**
 * Resolve a root-relative content path against the deployed base path, so the
 * same `/gallery/x.svg` in the content modules works whether the site is served
 * from a domain root or from a GitHub Pages subpath.
 */
export function asset(path: string): string {
  if (/^(https?:|data:|blob:)/.test(path)) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

/**
 * Build a WebP srcSet from the convention `name-{width}.webp` sitting beside a
 * canonical `name.jpg`. Shared so the grid and the lightbox cannot drift into
 * two different ideas of where the variants live.
 */
export function webpSrcSet(src: string, widths?: number[]): string | undefined {
  if (!widths || widths.length === 0) return undefined
  const base = src.replace(/\.[a-z0-9]+$/i, '')
  return widths.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(', ')
}
