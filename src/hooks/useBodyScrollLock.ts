import { useEffect } from 'react'

/** Freeze the page behind a modal surface without the scroll position jumping. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const { body } = document
    const previous = body.style.overflow
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = previous
      body.style.paddingRight = ''
    }
  }, [active])
}
