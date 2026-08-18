import { useCallback, useRef, useState } from 'react'

/** §10: a little hit padding, and dragging away cancels — dragging back re-arms. */
const HIT_SLOP = 14

/**
 * Press feedback that starts on pointer-*down* (§1).
 *
 * Waiting for `click` to show that something was pressed puts a whole gesture's
 * worth of latency between the intent and the response, and directness "falls
 * off a cliff". This reports pressed the instant the pointer lands, and keeps
 * reporting continuously — sliding a finger off the control un-presses it,
 * sliding back on re-presses it, exactly like a physical button under a thumb.
 */
export function usePressable() {
  const [pressed, setPressed] = useState(false)
  const origin = useRef<{ id: number; rect: DOMRect } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    origin.current = { id: e.pointerId, rect: e.currentTarget.getBoundingClientRect() }
    e.currentTarget.setPointerCapture(e.pointerId)
    setPressed(true)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const o = origin.current
    if (!o || o.id !== e.pointerId) return
    const { rect } = o
    const inside =
      e.clientX >= rect.left - HIT_SLOP &&
      e.clientX <= rect.right + HIT_SLOP &&
      e.clientY >= rect.top - HIT_SLOP &&
      e.clientY <= rect.bottom + HIT_SLOP
    setPressed(inside)
  }, [])

  const release = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (origin.current?.id !== e.pointerId) return
    origin.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setPressed(false)
  }, [])

  return {
    pressed,
    pressHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: release,
      onPointerCancel: release,
      onLostPointerCapture: () => setPressed(false),
    },
  }
}
