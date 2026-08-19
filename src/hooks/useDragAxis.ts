import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, type AnimationPlaybackControls, type MotionValue } from 'motion/react'
import type { Transition } from 'motion/react'
import { clampElastic, nearest, project, VelocityTracker } from '@/lib/physics'

/** Movement required before we commit to a direction — §10 hysteresis. */
const SLOP = 10

export type DragAxisOptions = {
  axis: 'x' | 'y'
  /** The value being dragged. The caller owns it so it can also be animated. */
  value: MotionValue<number>
  /** Hard-ish limits; past these the drag rubber-bands instead of stopping. */
  getBounds: () => [min: number, max: number]
  /** Resting positions the gesture may land on. */
  getSnapPoints: () => number[]
  /** Reference size used for rubber-band resistance (usually the element's). */
  getDimension: () => number
  /** Fired once the release animation has settled on a snap point. */
  onSettle?: (point: number, index: number) => void
  /** Fired as soon as the target is chosen, before the animation finishes. */
  onCommit?: (point: number, index: number) => void
  spring?: Transition
  /** Cap how many snap points a single flick may cross (paging wants 1). */
  maxSnapStep?: number
  enabled?: boolean
}

/**
 * One gesture engine, shared by the nav sheet and the gallery lightbox.
 *
 * It implements the parts of the skill that make a drag feel physical:
 *   §2  1:1 tracking via Pointer Events + setPointerCapture, so the surface
 *       stays glued to the finger even outside the element's bounds.
 *   §3  Interruptible: pointerdown stops any in-flight animation and starts
 *       from the *presentation* value, so grabbing something mid-flight picks
 *       it up where it visibly is rather than snapping to where it was headed.
 *   §5  Velocity handoff: the release velocity becomes the spring's initial
 *       velocity, so there is no seam between dragging and animating.
 *   §6  Momentum projection: the target is the snap point nearest where the
 *       gesture was *going*, not where the finger happened to lift.
 *   §9  Rubber-banding past the bounds.
 *  §10  A slop threshold before committing, and the slop is consumed so
 *       tracking stays 1:1 without a visible jump at commit.
 */
export function useDragAxis({
  axis,
  value,
  getBounds,
  getSnapPoints,
  getDimension,
  onSettle,
  onCommit,
  spring = { type: 'spring', bounce: 0.2, duration: 0.3 },
  maxSnapStep,
  enabled = true,
}: DragAxisOptions) {
  const [dragging, setDragging] = useState(false)
  const playback = useRef<AnimationPlaybackControls | null>(null)
  const tracker = useRef(new VelocityTracker())
  const gesture = useRef({
    pointerId: -1,
    origin: 0,
    startValue: 0,
    committed: false,
    dimension: 0,
  })

  useEffect(() => () => playback.current?.stop(), [])

  const coord = useCallback(
    (e: { clientX: number; clientY: number }) => (axis === 'x' ? e.clientX : e.clientY),
    [axis],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return
      if (e.pointerType === 'mouse' && e.button !== 0) return

      // Grab the live on-screen value, not the target we were animating to.
      playback.current?.stop()
      playback.current = null

      const g = gesture.current
      g.pointerId = e.pointerId
      g.origin = coord(e)
      g.startValue = value.get()
      g.committed = false
      g.dimension = Math.max(1, getDimension())

      tracker.current.reset()
      tracker.current.add(g.origin, e.timeStamp)
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [coord, enabled, getDimension, value],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const g = gesture.current
      if (g.pointerId !== e.pointerId) return

      const point = coord(e)
      tracker.current.add(point, e.timeStamp)
      const delta = point - g.origin

      if (!g.committed) {
        if (Math.abs(delta) < SLOP) return
        // Consume the slop: the movement spent proving intent must not also
        // move the surface, or it jumps 10px the instant the drag commits.
        g.origin += Math.sign(delta) * SLOP
        g.committed = true
        setDragging(true)
      }

      const [min, max] = getBounds()
      value.set(clampElastic(g.startValue + (point - g.origin), min, max, g.dimension))
    },
    [coord, getBounds, value],
  )

  const finish = useCallback(
    (e: React.PointerEvent) => {
      const g = gesture.current
      if (g.pointerId !== e.pointerId) return
      g.pointerId = -1

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      if (!g.committed) return
      g.committed = false
      setDragging(false)

      // Record where the pointer actually left the surface before reading the
      // velocity, so the measurement window always ends at the release.
      tracker.current.add(coord(e), e.timeStamp)
      const velocity = tracker.current.velocity(e.timeStamp)
      const current = value.get()
      const points = getSnapPoints()
      if (points.length === 0) return

      // Where would this gesture coast to if we let it? Snap from there.
      let target = nearest(current + project(velocity), points)

      if (maxSnapStep != null) {
        const sorted = [...points].sort((a, b) => a - b)
        const from = sorted.indexOf(nearest(g.startValue, sorted))
        const to = sorted.indexOf(target)
        const step = Math.max(-maxSnapStep, Math.min(maxSnapStep, to - from))
        target = sorted[Math.max(0, Math.min(sorted.length - 1, from + step))]!
      }

      const index = points.indexOf(target)
      onCommit?.(target, index)

      playback.current?.stop()
      const controls = animate(value, target, {
        ...spring,
        // The seam between finger and physics: continue at the exact speed
        // the finger was moving (§5).
        velocity,
      })
      playback.current = controls
      // Only the animation still in charge gets to report a settle — an
      // interrupted one has been superseded and must stay silent.
      void controls.finished
        .then(() => {
          if (playback.current === controls) onSettle?.(target, index)
        })
        .catch(() => {})
    },
    [coord, getSnapPoints, maxSnapStep, onCommit, onSettle, spring, value],
  )

  /**
   * Animate to a snap point without a gesture (a button, a keyboard arrow).
   * Still starts from the presentation value, so it is safe to call mid-flight.
   */
  const settleTo = useCallback(
    (target: number, transition: Transition = spring) => {
      playback.current?.stop()
      playback.current = animate(value, target, transition)
      return playback.current
    },
    [spring, value],
  )

  return {
    dragging,
    settleTo,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
    },
  }
}
