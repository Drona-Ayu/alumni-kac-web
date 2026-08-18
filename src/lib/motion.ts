import type { Transition } from 'motion/react'

/**
 * Apple ships two designer-facing spring parameters rather than the physics
 * triplet: damping ratio (overshoot) and response (how fast it reaches target).
 * Motion's `{ bounce, duration }` spring API is the same pair under different
 * names — `damping 1.0` is `bounce 0`, `damping ~0.8` is `bounce ~0.2`.
 *
 * `duration` here is NOT a fixed runtime. A spring has no duration; it settles
 * when the physics say it settles, and it re-targets from wherever it currently
 * is. That is precisely what makes it interruptible (§3).
 *
 * Default to critically damped. Overshoot is earned by momentum: it belongs on
 * something the user flicked, never on a menu that merely appeared (§4).
 */
export const springs = {
  /** Reposition, reveal, layout shifts. Apple: damping 1.0 / response 0.4. */
  move: { type: 'spring', bounce: 0, duration: 0.4 },
  /** Snappier variant for small chrome that should feel immediate. */
  snap: { type: 'spring', bounce: 0, duration: 0.28 },
  /** Rotation and scale-in. Apple: damping 0.8 / response 0.4. */
  rotate: { type: 'spring', bounce: 0.2, duration: 0.4 },
  /** Drawers, sheets, lightboxes. Apple: damping 0.8 / response 0.3. */
  sheet: { type: 'spring', bounce: 0.2, duration: 0.3 },
} as const satisfies Record<string, Transition>

/**
 * The reduced-motion equivalent. §14: reduced motion means a gentler,
 * non-vestibular feedback — not the absence of feedback. Opacity survives,
 * travel and overshoot do not.
 */
export const crossFade: Transition = { duration: 0.2, ease: 'easeOut' }

/** Pick the transition that matches the reader's motion preference. */
export function transitionFor(reduced: boolean, spring: Transition): Transition {
  return reduced ? crossFade : spring
}

/**
 * Mirrored easing for the two halves of a reversible transition (§7): the
 * outbound path and the return path use inverse control points, so a panel
 * comes back the way it left.
 */
export const mirrored = {
  out: [0.32, 0.72, 0, 1],
  in: [1, 0, 0.72, 0.32],
} as const
