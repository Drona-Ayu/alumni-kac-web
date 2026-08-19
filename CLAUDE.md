# KhAyAL Alumni Website

Website for the **Kannur Ayurveda College Alumni Association (KhAyAL)** — the
alumni association of Government Ayurveda Medical College, Pariyaram.
Registration number **KNR/CA/355/2024**.

Static React site. No backend, no database, no CMS: everything the site shows
comes from typed modules in `src/content/`.

## Stack

| Piece   | Choice                                                                      |
| ------- | --------------------------------------------------------------------------- |
| Build   | Vite 8 + React 19 + TypeScript (strict)                                     |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/styles/theme.css`, no config file) |
| Motion  | `motion` — springs, gesture animation                                       |
| Routing | React Router (`basename` from `import.meta.env.BASE_URL`)                   |
| Lint    | oxlint · Format: prettier                                                   |
| Deploy  | GitHub Pages via `.github/workflows/deploy.yml`                             |

## Design rules

**All interactive work follows `.claude/skills/apple-design/SKILL.md`.** Read it
before touching anything that moves. The section numbers cited in code comments
(§1, §3, §6 …) refer to it.

The parts that matter most in practice:

- **Feedback starts on pointer-down, never on release.** `usePressable` exists
  for this; use it rather than `:active` or a click handler.
- **Springs, not keyframes, for anything a person can touch.** Presets live in
  `src/lib/motion.ts` and are the only spring values in the codebase:

  | Preset           | Damping / Response | Use                        |
  | ---------------- | ------------------ | -------------------------- |
  | `springs.move`   | 1.0 / 0.4          | reposition, reveal, layout |
  | `springs.snap`   | 1.0 / 0.28         | small chrome               |
  | `springs.rotate` | 0.8 / 0.4          | rotation, scale-in         |
  | `springs.sheet`  | 0.8 / 0.3          | sheets, drawers, lightbox  |

  Critically damped (`bounce: 0`) is the default. **Overshoot is earned by
  momentum** — put bounce on something the reader flicked, never on something
  that merely appeared.

- **Every animation is interruptible.** Animate from the live presentation
  value, never from the logical target. `useDragAxis` does this; new gesture
  code should use it rather than re-implementing pointer tracking.
- **Release velocity is handed to the spring, and the landing point comes from
  the projection**, not from where the finger lifted (`project()` in
  `src/lib/physics.ts`).
- **Chrome is translucent and content scrolls under it**, separated by a
  scroll-edge fade rather than a 1px rule.
- **Tracking is size-specific.** Use the `.t-*` classes in `src/index.css`;
  never set a global `letter-spacing`.
- **Three accessibility preferences are honoured at the token layer:**
  `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`.
  Reduced motion means a cross-fade, not the absence of feedback.

## The logo

`src/components/atoms/Logo.tsx` renders it, in two variants: `lockup` (the
supplied artwork entire — roundel, overlapping `h`, wordmark and both subtitle
lines) and `mark` (the roundel alone). **Use the lockup as drawn.** The overlap
between the `h` and the roundel is what makes it read as this association's
logo; pulling the parts into a tidier arrangement loses that.

It is **inline SVG, not an `<img>`** — the wordmark and subtitle are filled with
`currentColor` so they follow the theme, and `currentColor` cannot cross an
`<img>` boundary. The roundel keeps its true brand colours in every theme.

The two figures are the K: mark + wordmark reads _KhAyAL_.

Paths live in the generated `logoPaths.ts`, all in one coordinate space —
regenerate from `brand/logo-master.png`, never hand-edit.

`Logo` deliberately sets **no display utility** on its `<svg>`; callers own
layout. An earlier version hardcoded `inline-flex`, and a caller's `hidden`
could not override it — Tailwind orders utilities by property, not by the order
they are written — so below `sm` the header painted two logos at once. The
`data-logo` attribute exists so tests can find the logo without a selector that
also matches every icon in the chrome.

## Photographs

Masters in `brand/photos/` (never served), derivatives in `public/campus/`:
WebP at 480/800/1024 plus a JPEG fallback. The ladder stops at 1024 because the
originals are 1022–1086px wide — a wider rung would be an upscale.

`Img` renders a `<picture>` when given `widths`, because a srcSet of WebP alone
strands a browser that understands srcSet but not WebP. Always pass `sizes`;
without it the browser assumes `100vw` and over-fetches on every phone.

`src/content/photos.ts` is the single source of truth for the real photographs —
path, alt text, caption and focal point. The gallery and the hero both read it.

**Contrast over a photograph cannot be checked from the tokens.** The hero's
white type is verified by screenshotting it, sampling the brightest patch of the
rendered backdrop, and computing the ratio. That check is what caught the
registration chip sitting at 3.3:1 on a light-tinted background; darkening the
chip's own backing is what fixed it.

## Component structure

Atoms → molecules → organisms, and the boundary that keeps the site
configurable:

- `src/components/atoms/` — no content imports, no business logic. Props only.
- `src/components/molecules/` — small compositions of atoms. Props only.
- `src/components/organisms/` — **the only layer that reads `src/content/`.**
- `src/pages/` — compose organisms into routes.

If a component needs to know a name, a date or a photo, it takes it as a prop.
If it needs to know _which_ names, it is an organism.

## Editing content

Everything editable lives in `src/content/`. `types.ts` is the schema; the other
modules are the data. A missing or misspelled field fails `npm run typecheck`.

Placeholder data is marked `TODO:` — see the "Before publishing" list in
`README.md` for what still needs real values.

## Tests

`npm test` runs the Playwright suite in `tests/`, at two widths (1440 desktop,
Pixel 7 mobile). It runs against the **production build**, not the dev server —
the utility-class ordering bug that once painted two logos in the header only
exists in the bundled CSS.

| Spec               | Guards                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pages.spec.ts`    | No horizontal overflow, one `h1`, one `[data-logo]` in the header, no console errors, scroll restoration                                                     |
| `contrast.spec.ts` | Every token pair clears WCAG AA in both themes                                                                                                               |
| `hero.spec.ts`     | White hero type against the _brightest pixel_ of the photograph behind it; home-page image weight and that `srcSet` resolves to a variant                    |
| `gestures.spec.ts` | Sheet tracks 1:1, springs back without momentum, dismisses on a throw, can be caught mid-close; press feedback on pointer-down; reduced motion still reveals |

Every one of these corresponds to a bug that actually shipped. **A failing
interaction check means the interaction regressed until proven otherwise** — do
not reach for the retry. `retries: 1` in CI absorbs a slow runner; a genuine
break fails both attempts.

When a gesture test needs a threshold, derive it from the element's measured
geometry rather than a magic pixel count, so a slow CI runner does not turn
correct behaviour into a red build.

## Commands

```
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck
npm run lint
npm run format
npm test            # Playwright suite against the production build
```
