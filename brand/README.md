# Brand assets

`logo-master.png` is the association's logo exactly as supplied — the master
artwork. It lives here rather than in `public/` so it is archived with the repo
but never shipped to the browser.

Everything the site actually uses is derived from it:

| Derived asset | What it is |
| --- | --- |
| `public/brand/logo-mark.svg` | the roundel alone |
| `public/brand/logo-wordmark.svg` | "hAyAL" alone, in `currentColor` |
| `public/brand/logo-full.svg` | the complete lockup |
| `public/favicon.svg` | the roundel |
| `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` | raster icons |
| `public/og-image.png` | social preview card |
| `src/components/atoms/logoPaths.ts` | the same paths, for the inline `<Logo>` |

The quadrants are authored as exact arcs; the figures and the type were traced
from the master with potrace and checked against it pixel-for-pixel (0.37%
differing pixels, all of it 1px edge antialiasing).

**The brand colours are green `#83C84B`, red `#ED3224`, teal `#0EA99A` and
orange `#F47720`.** They appear only inside the logo. The site's UI tokens in
`src/styles/theme.css` use darkened teal and orange instead, because the brand
values sit at 2.77:1 and 2.64:1 on the page background and are not legible as
text — see the note in that file before changing them.

If the artwork is ever revised, replace `logo-master.png` and re-run the tracing
and raster scripts; do not hand-edit the derived files.
