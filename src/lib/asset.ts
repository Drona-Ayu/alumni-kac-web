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
