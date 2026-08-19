import { test, expect } from '@playwright/test'

/**
 * The interaction guarantees the design rests on. Each of these corresponds to
 * a bug that shipped and was caught here:
 *
 *  - the drag threshold was added to the surface's position instead of
 *    subtracted from the pointer's travel, so the sheet jumped 10px on commit;
 *  - Tailwind v4 emits `scale:` as its own property, so a transition on
 *    `transform` never eased the press at all;
 *  - grabbing the sheet on a nav link started a native link-drag, which fired
 *    pointercancel and stranded the gesture mid-flight.
 */

test.describe('navigation sheet', () => {
  test.skip(({ isMobile }) => !isMobile, 'the sheet only exists below md')

  test('tracks the pointer, and a throw dismisses it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Open menu' }).click()

    const sheet = page.getByRole('dialog', { name: 'Site menu' })
    await expect(sheet).toBeVisible()
    await page.waitForTimeout(650)

    const readY = () =>
      page.evaluate(() => {
        const el = document.querySelector('[role="dialog"]')
        return el ? new DOMMatrixReadOnly(getComputedStyle(el).transform).m42 : null
      })

    expect(Math.abs((await readY()) ?? 99), 'sheet settles at rest').toBeLessThan(2)

    const box = (await sheet.boundingBox())!
    const x = box.x + box.width / 2
    const top = box.y + 20

    // Drag down slowly, then hold still so the release carries no momentum.
    await page.mouse.move(x, top)
    await page.mouse.down()
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(x, top + i * 12)
      await page.waitForTimeout(55)
    }
    // 96px of travel, less the 10px the gesture spends proving intent.
    expect(Math.abs(((await readY()) ?? 0) - 86), 'tracks 1:1 with the slop consumed').toBeLessThan(
      8,
    )

    await page.waitForTimeout(260)
    await page.mouse.up()
    await page.waitForTimeout(750)
    await expect(sheet, 'a release without momentum springs back').toBeVisible()

    /* Now throw it. The travel is deliberately about a third of the sheet's
       height — short of the halfway point, so position alone would spring it
       back and only the projected momentum can dismiss it.

       The arithmetic matters for stability, not just for the assertion. After
       the 10px the gesture spends proving intent, the release sits ~0.33h down
       and needs the projection to carry it past 0.5h. project() turns even a
       sluggish 200px/s into ~100px of travel, which clears that with room —
       so a CI runner dispatching pointer moves slowly still produces a throw,
       instead of the test failing on an app that behaved correctly. */
    const throwDistance = Math.round(box.height * 0.36)
    await page.mouse.move(x, top)
    await page.mouse.down()
    for (let i = 1; i <= 4; i++) {
      await page.mouse.move(x, top + Math.round((throwDistance * i) / 4))
    }
    await page.mouse.up()
    await expect(sheet, 'a flick dismisses on projected momentum').toHaveCount(0, { timeout: 5000 })
  })

  test('can be caught mid-close and pulled back', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Open menu' }).click()
    const sheet = page.getByRole('dialog', { name: 'Site menu' })
    await expect(sheet).toBeVisible()
    await page.waitForTimeout(700)

    const box = (await sheet.boundingBox())!
    const x = box.x + box.width / 2
    const readY = () =>
      page.evaluate(() => {
        const el = document.querySelector('[role="dialog"]')
        return el ? new DOMMatrixReadOnly(getComputedStyle(el).transform).m42 : null
      })

    await page.mouse.move(x, box.y + 20)
    await page.mouse.down()
    for (let i = 1; i <= 4; i++) {
      await page.mouse.move(x, box.y + 20 + i * 12)
      await page.waitForTimeout(14)
    }
    await page.mouse.up()
    await page.waitForTimeout(40)

    // Grab near the bottom of the viewport, not the bottom of the sheet: on a
    // tall-density phone the sheet's lower edge sits below the fold, and this
    // point stays over the sheet through the whole flight rather than racing
    // its moving top edge.
    const viewport = page.viewportSize()!
    const grabY = viewport.height - 40
    await page.mouse.move(x, grabY)
    await page.mouse.down()
    await page.waitForTimeout(60)
    const atGrab = await readY()
    await page.waitForTimeout(280)
    const held = await readY()

    expect(atGrab, 'still in flight when grabbed').not.toBeNull()
    expect(
      Math.abs((held ?? 0) - (atGrab ?? 0)),
      'grabbing freezes the sheet at its live on-screen value',
    ).toBeLessThan(3)
    expect(held ?? 0, 'frozen short of the animation target').toBeLessThan(box.height * 0.9)

    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(x, grabY - i * 18)
      await page.waitForTimeout(22)
    }
    await page.waitForTimeout(200)
    await page.mouse.up()
    await page.waitForTimeout(800)

    await expect(sheet, 'a sheet caught mid-close stays open').toBeVisible()
    // Scoped to the header: the sheet's own close button and its scrim carry
    // the same accessible name, so an unscoped query matches three elements.
    await expect(
      page.locator('header').getByRole('button', { name: 'Close menu' }),
      'and the header still agrees it is open',
    ).toHaveCount(1)
  })
})

test('press feedback lands on pointer-down and cancels on drag-away', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const link = page.getByRole('link', { name: /Join the association/ }).first()
  await expect(link).toBeVisible()

  // Tailwind v4 emits `scale` as its own property, not inside `transform`.
  const scale = () =>
    page.evaluate(() => {
      const el = [...document.querySelectorAll('a')].find((a) =>
        a.textContent?.includes('Join the association'),
      )
      return el ? parseFloat(getComputedStyle(el).scale) || 1 : 1
    })

  const box = (await link.boundingBox())!
  const rest = await scale()

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.waitForTimeout(160)
  expect(await scale(), 'shrinks on pointer-down, not on click').toBeLessThan(rest - 0.005)

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 220)
  await page.waitForTimeout(140)
  expect(Math.abs((await scale()) - rest), 'dragging away cancels the press').toBeLessThan(0.005)
  await page.mouse.up()
})

test('reduced motion still reveals content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const unrevealed = await page.evaluate(
    () =>
      [...document.querySelectorAll('main *')].filter((el) => {
        const r = el.getBoundingClientRect()
        const inView = r.top < window.innerHeight && r.bottom > 0 && r.height > 40
        const decorative = el.closest('[aria-hidden="true"]') !== null
        return inView && !decorative && Number(getComputedStyle(el).opacity) < 0.9
      }).length,
  )
  // Reduced motion means a cross-fade, not the absence of feedback — content
  // must still end up visible.
  expect(unrevealed, 'in-view elements left under 0.9 opacity').toBe(0)
})
