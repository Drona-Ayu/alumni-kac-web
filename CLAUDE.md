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

`src/components/atoms/Logo.tsx` renders it, in two variants: `mark` (the
roundel) and `lockup` (roundel + "hAyAL"). It is **inline SVG, not an `<img>`** —
the wordmark is filled with `currentColor` so it follows the theme, and
`currentColor` cannot cross an `<img>` boundary. The roundel keeps its true
brand colours in every theme.

The two figures are the K: mark + wordmark reads _KhAyAL_.

Chrome composes the mark and the wordmark at its own proportions rather than
scaling the supplied lockup, which is badge-shaped and would put the wordmark at
about 9px in a header. Paths live in the generated `logoPaths.ts` — regenerate
from `brand/logo-master.png`, never hand-edit.

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

## Commands

```
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck
npm run lint
npm run format
```
