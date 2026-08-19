import type { Page } from '@playwright/test'

/** Every route the site serves, including one that should 404. */
export const routes = [
  '/',
  '/about',
  '/committee',
  '/events',
  '/events/alumni-meet-2026',
  '/gallery',
  '/membership',
  '/contact',
  '/no-such-page',
]

function channel(c: number): number {
  const s = c / 255
  return s > 0.04045 ? ((s + 0.055) / 1.055) ** 2.4 : s / 12.92
}

/** WCAG relative luminance. */
export function luminance([r, g, b]: number[]): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** WCAG contrast ratio between two RGB triples. */
export function contrast(a: number[], b: number[]): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Parse a computed `rgb(...)` string into a triple. */
export function parseRgb(value: string): number[] {
  const parts = value.match(/[\d.]+/g)
  if (!parts) throw new Error(`could not parse colour: ${value}`)
  return parts.slice(0, 3).map(Number)
}

/** Resolve a CSS custom property to a concrete rgb() triple. */
export async function resolveToken(page: Page, name: string): Promise<number[]> {
  const value = await page.evaluate((token) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    const probe = document.createElement('div')
    probe.style.color = raw
    document.body.appendChild(probe)
    const resolved = getComputedStyle(probe).color
    probe.remove()
    return resolved
  }, name)
  return parseRgb(value)
}

/** Scroll the whole page so anything lazy-loaded actually loads. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(400)
}
