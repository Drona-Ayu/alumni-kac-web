import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled far enough that content actually sits
 * beneath the floating chrome. The scroll-edge effect keys off this, so the
 * fade appears only where there is something to separate from (§12) — a
 * divider that is always drawn is decoration, not information.
 */
export function useScrolledUnder(threshold = 8): boolean {
  const [under, setUnder] = useState(false)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      setUnder(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return under
}
