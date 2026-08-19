import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * A new page starts at the top; going *back* returns you to where you were.
 * Overriding the browser's restored position on a back navigation is one of
 * those small betrayals that makes an interface feel unreliable.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, navigationType])

  return null
}
