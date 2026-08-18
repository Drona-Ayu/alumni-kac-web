/**
 * Momentum projection (§6). Apple's own function from the Designing Fluid
 * Interfaces sample code — an exponential decay, deliberately *not* the
 * textbook v²/(2a). Given a release velocity in px/s it returns how much
 * further the content would travel if you let it coast.
 *
 * Use it to choose the target: snap to the point nearest the projected
 * endpoint, not the point nearest where the finger happened to lift. That is
 * what makes a flick feel like a throw rather than a nudge.
 */
export function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/**
 * Rubber-banding (§9). Past a boundary the surface keeps following the finger
 * but yields progressively less. A hard stop reads as frozen; continuous
 * resistance reads as "still alive, but there is nothing more here".
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  if (dimension <= 0) return overshoot
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/** Clamp with rubber-band resistance outside the range instead of a hard stop. */
export function clampElastic(value: number, min: number, max: number, dimension: number): number {
  if (value < min) return min - rubberband(min - value, dimension)
  if (value > max) return max + rubberband(value - max, dimension)
  return value
}

/** Pick the entry of `points` closest to `value`. */
export function nearest(value: number, points: readonly number[]): number {
  return points.reduce((best, p) => (Math.abs(p - value) < Math.abs(best - value) ? p : best))
}

type Sample = { position: number; time: number }

/**
 * A short rolling history of pointer samples (§2). Velocity taken from the
 * single last move event is noisy and often reads zero on the frame the finger
 * lifts; a window over the last few samples is what actually matches the
 * gesture the user made.
 */
export class VelocityTracker {
  private samples: Sample[] = []
  private readonly windowMs: number

  constructor(windowMs = 100) {
    this.windowMs = windowMs
  }

  add(position: number, time = performance.now()) {
    this.samples.push({ position, time })
    const cutoff = time - this.windowMs * 2
    while (this.samples.length > 2 && this.samples[0]!.time < cutoff) this.samples.shift()
  }

  /**
   * px/s over the sample window, or 0 when there is not enough history.
   *
   * Samples outside the window are deliberately not used as a fallback: a
   * finger that has been resting for a moment is not moving, and reporting its
   * last motion would throw a surface the reader had already stopped.
   */
  velocity(now = performance.now()): number {
    const window = this.samples.filter((s) => now - s.time <= this.windowMs)
    if (window.length < 2) return 0
    const first = window[0]!
    const last = window[window.length - 1]!
    const dt = last.time - first.time
    if (dt <= 0) return 0
    return ((last.position - first.position) / dt) * 1000
  }

  reset() {
    this.samples = []
  }
}
