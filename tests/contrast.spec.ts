import { test, expect } from '@playwright/test'
import { contrast, resolveToken } from './helpers'

/**
 * Foreground/background pairs that must clear WCAG AA.
 *
 * The site's teal and orange are darkened versions of the brand colours for
 * exactly this reason: the true brand teal sits at 2.77:1 on the page
 * background and the orange at 2.64:1, so neither is legible as body text.
 * This test is what stops someone "correcting" the tokens back.
 */
const PAIRS: [string, string, number][] = [
  ['--k-ink', '--k-canvas', 4.5],
  ['--k-ink-muted', '--k-canvas', 4.5],
  ['--k-ink-muted', '--k-surface', 4.5],
  ['--k-ink-muted', '--k-sunken', 4.5],
  ['--k-ink-faint', '--k-canvas', 3],
  ['--k-leaf', '--k-canvas', 4.5],
  ['--k-leaf', '--k-surface', 4.5],
  ['--k-leaf', '--k-sunken', 4.5],
  ['--k-leaf', '--k-leaf-soft', 4.5],
  ['--k-on-leaf', '--k-leaf', 4.5],
  ['--k-on-leaf', '--k-leaf-strong', 4.5],
  ['--k-brass', '--k-canvas', 4.5],
  ['--k-brass', '--k-sunken', 4.5],
  ['--k-brass', '--k-brass-soft', 4.5],
  ['--k-focus', '--k-canvas', 3],
]

for (const scheme of ['light', 'dark'] as const) {
  test(`design tokens clear AA in ${scheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/', { waitUntil: 'networkidle' })

    for (const [fg, bg, min] of PAIRS) {
      const ratio = contrast(await resolveToken(page, fg), await resolveToken(page, bg))
      expect(ratio, `${fg} on ${bg} (${scheme})`).toBeGreaterThanOrEqual(min)
    }
  })
}
