import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'
import { contrast, luminance } from './helpers'

/**
 * Contrast over a photograph, measured from the rendered pixels.
 *
 * The design tokens cannot answer this — they have no idea what the photograph
 * is doing behind the type. This check caught the registration chip sitting at
 * 3.30:1 over the brightest part of the frame, because its backing was
 * white-tinted; darkening it is what fixed it, and blur alone would not have.
 *
 * Every threshold is asserted against the *brightest patch* under the text,
 * not the average, because the average hides exactly the case that fails.
 */
type Target = { selector: string; label: string; min: number }

const TARGETS: Target[] = [
  { selector: 'main h1', label: 'headline', min: 3 },
  { selector: 'main p.t-lead', label: 'lede', min: 4.5 },
  { selector: 'main section span.rounded-full', label: 'registration chip', min: 4.5 },
]

test('white hero type clears AA over the photograph', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const boxes: Record<string, { x: number; y: number; width: number; height: number } | null> = {}
  for (const t of TARGETS) {
    boxes[t.label] = await page.locator(t.selector).first().boundingBox()
  }

  // Hide the glyphs but keep every backdrop painted — including the chip's own
  // background, which is part of what the text actually sits on.
  await page.addStyleTag({
    content: `main h1, main p.t-lead { visibility: hidden !important }
              main section span.rounded-full { color: transparent !important }
              main section span.rounded-full svg { visibility: hidden !important }`,
  })
  await page.waitForTimeout(200)

  const viewport = page.viewportSize()!
  const shot = await page.screenshot({
    clip: { x: 0, y: 0, width: viewport.width, height: Math.min(viewport.height, 900) },
  })
  const png = PNG.sync.read(shot)

  for (const t of TARGETS) {
    const box = boxes[t.label]
    expect(box, `${t.label} is present`).not.toBeNull()
    if (!box) continue

    // The screenshot is in device pixels; the box is in CSS pixels.
    const scale = png.width / viewport.width
    let brightest: number[] = [0, 0, 0]
    let peak = -1
    const x0 = Math.max(0, Math.round(box.x * scale))
    const x1 = Math.min(png.width, Math.round((box.x + box.width) * scale))
    const y0 = Math.max(0, Math.round(box.y * scale))
    const y1 = Math.min(png.height, Math.round((box.y + box.height) * scale))

    for (let y = y0; y < y1; y += 3) {
      for (let x = x0; x < x1; x += 3) {
        const i = (png.width * y + x) << 2
        const px = [png.data[i], png.data[i + 1], png.data[i + 2]]
        const l = luminance(px)
        if (l > peak) {
          peak = l
          brightest = px
        }
      }
    }
    expect(peak, `${t.label} region was sampled`).toBeGreaterThanOrEqual(0)

    const ratio = contrast([255, 255, 255], brightest)
    await testInfo.attach(`${t.label} worst-case contrast`, {
      body: `${ratio.toFixed(2)}:1 against rgb(${brightest.join(', ')}) — needs ${t.min}`,
      contentType: 'text/plain',
    })
    expect(ratio, `white ${t.label} on its brightest backdrop pixel`).toBeGreaterThanOrEqual(t.min)
  }
})

test('the hero photograph is served at a sane size', async ({ page }) => {
  const images: { name: string; bytes: number }[] = []
  page.on('response', async (r) => {
    if (r.request().resourceType() !== 'image') return
    try {
      images.push({ name: r.url().split('/').pop() ?? '', bytes: (await r.body()).length })
    } catch {
      /* a cancelled request is not a failure */
    }
  })

  await page.goto('/', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  await page.waitForTimeout(1200)

  const total = images.reduce((a, i) => a + i.bytes, 0) / 1024
  expect(total, `home page imagery (${images.map((i) => i.name).join(', ')})`).toBeLessThan(700)

  // srcSet must actually be picking a variant, not falling back to the JPEG.
  const heroSrc = await page.evaluate(() => {
    const img = document.querySelector('section img') as HTMLImageElement | null
    return img?.currentSrc ?? ''
  })
  expect(heroSrc, 'hero resolves to a WebP variant').toMatch(/-\d+\.webp$/)
})
