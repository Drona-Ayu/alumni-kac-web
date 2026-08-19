import { test, expect } from '@playwright/test'
import { routes, scrollThrough } from './helpers'

/**
 * The cheap structural checks, run over every route at both widths.
 *
 * The logo count is here because it caught a real bug: `Logo` used to bake a
 * display utility into its own element, a caller's `hidden` could not override
 * it — Tailwind orders utilities by property, not by the order they are
 * written — and the header painted two logos below the sm breakpoint.
 */
for (const route of routes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))

    await page.goto(route, { waitUntil: 'networkidle' })
    await scrollThrough(page)

    // Nothing may widen the page. A single overflowing child breaks every
    // horizontal gesture on a phone.
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(scrollWidth, 'horizontal overflow').toBeLessThanOrEqual(clientWidth + 1)

    await expect(page.locator('h1'), 'exactly one h1').toHaveCount(1)
    await expect(page.locator('header [data-logo]'), 'one logo in the header').toHaveCount(1)
    expect(errors, 'console errors').toEqual([])
  })
}

test('a new page starts at the top, but back restores position', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  // Wait for the hero photograph specifically, not every image: the ones below
  // the fold are loading="lazy" and never report complete until they scroll
  // into view, so waiting on all of them waits forever.
  await page.waitForFunction(() => {
    const hero = document.querySelector('section img')
    return !hero || (hero as HTMLImageElement).complete
  })
  await page.evaluate(() => window.scrollTo(0, 1200))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)

  await page.getByRole('link', { name: 'About', exact: true }).first().click()
  await expect(page).toHaveURL(/\/about$/)

  // Polled rather than slept on: under parallel load a fixed wait is a coin
  // toss, and a flaky check is worse than no check.
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 8000 }).toBeLessThan(80)

  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 8000 })
    .toBeGreaterThan(200)
})
