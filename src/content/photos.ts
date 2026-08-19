/**
 * The association's own photographs of the college.
 *
 * Masters live in `brand/photos/` and are never served; the files referenced
 * here are the derivatives in `public/campus/`. Regenerate them with the photo
 * script rather than hand-editing, and keep the width ladder in step.
 */

/**
 * The WebP variants that exist beside every `.jpg` below, as `name-{w}.webp`.
 * The originals are 1022–1086px wide, so the ladder stops at 1024 — a wider
 * rung would be an upscale, costing bytes and adding no detail.
 */
export const photoWidths = [480, 800, 1024]

export type CampusPhoto = {
  src: string
  /** Written for someone who cannot see it — this is content, not decoration. */
  alt: string
  caption: string
  /** object-position for the crop, when the subject is off-centre. */
  position?: string
}

export type CampusPhotoKey = 'entrance' | 'building' | 'road' | 'ground'

/* Typed as a plain Record rather than `as const satisfies`: the latter narrows
   each entry to its own literal shape, so the two photos without a `position`
   would not have the property at all and callers could not read it. */
export const campusPhotos: Record<CampusPhotoKey, CampusPhoto> = {
  entrance: {
    src: '/campus/campus-entrance.jpg',
    alt: 'The college entrance arch in heavy rain, its Theyyam mural lit by a streetlamp, with the wet approach road in the foreground.',
    caption: 'The entrance on the Pariyaram road, mid-monsoon.',
    position: 'center 55%',
  },
  building: {
    src: '/campus/college-building.jpg',
    alt: 'The main college building seen through rain and dense trees, its name board and lit entrance glowing against the dark green.',
    caption: 'Government Ayurveda Medical College, Pariyaram.',
    position: 'center 60%',
  },
  road: {
    src: '/campus/campus-road.jpg',
    alt: 'The road alongside a teaching block after rain, lit windows reflected in the wet tarmac beneath overhanging trees.',
    caption: 'The road past the teaching block at dusk.',
  },
  ground: {
    src: '/campus/flooded-ground.jpg',
    alt: 'Folding chairs standing in a flooded college ground under falling rain, with bunting and an SFI GAVC sign behind them.',
    caption: 'The ground after a downpour, chairs still waiting.',
  },
}
