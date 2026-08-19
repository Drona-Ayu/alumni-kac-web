import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'motion/react'
import type { NavItem } from '@/content/types'
import { Icon } from '@/components/atoms/Icon'
import { IconButton } from '@/components/atoms/IconButton'
import { Text } from '@/components/atoms/Text'
import { useDragAxis } from '@/hooks/useDragAxis'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

type Props = {
  open: boolean
  onClose: () => void
  items: NavItem[]
}

/**
 * The navigation sheet.
 *
 * It enters upward and leaves downward along the same path (§7), it can be
 * dragged and thrown closed with its momentum respected (§5, §6), it resists
 * rather than stops when dragged the wrong way (§9), and it can be caught
 * mid-flight and reversed without a jump (§3) because the gesture always picks
 * up the live on-screen value.
 */
export function MobileNavSheet({ open, onClose, items }: Props) {
  const [mounted, setMounted] = useState(open)
  const reduced = usePrefersReducedMotion()
  const sheetRef = useRef<HTMLDivElement>(null)
  const heightRef = useRef(1)

  const y = useMotionValue(0)

  /* The scrim tracks the drag continuously — the background lifts back as the
     sheet comes down, so feedback lives during the gesture, not after it (§1). */
  const scrimOpacity = useTransform(y, (value) =>
    Math.max(0, Math.min(1, 1 - value / Math.max(1, heightRef.current))),
  )

  const measure = useCallback(() => {
    heightRef.current = Math.max(1, sheetRef.current?.offsetHeight ?? 1)
    return heightRef.current
  }, [])

  const spring = reduced ? crossFade : springs.sheet

  const { dragging, settleTo, handlers } = useDragAxis({
    axis: 'y',
    value: y,
    getBounds: () => [0, measure()],
    getSnapPoints: () => [0, measure()],
    getDimension: measure,
    spring,
    // Reported when the sheet has actually landed off-screen, not when the
    // throw was released. Until then it is still on screen and still grabbable
    // — a sheet caught and dragged back mid-flight was never closed, and
    // telling the header otherwise would leave the two disagreeing (§3).
    // Feedback during the flight is not deferred by this: the scrim is derived
    // from the sheet's live position, so the background lifts continuously
    // from the first pixel of the drag (§1).
    onSettle: (target) => {
      if (target > 0) {
        setMounted(false)
        onClose()
      }
    },
  })

  // Mount on the same pass that `open` turns true, so the opening animation
  // can start from the very first committed frame.
  if (open && !mounted) setMounted(true)

  useLayoutEffect(() => {
    if (!mounted) return
    const height = measure()

    if (open) {
      // Only start from off-screen if we are not already on screen; if the
      // reader re-opened while it was still closing, the spring re-targets
      // from wherever it is.
      if (y.get() >= height) y.set(height)
      settleTo(0, spring)
      return
    }

    const controls = settleTo(height, spring)
    void controls.finished.then(() => setMounted(false)).catch(() => {})
  }, [open, mounted, measure, settleTo, spring, y])

  useBodyScrollLock(mounted)
  useFocusTrap(sheetRef, mounted && open)

  useEffect(() => {
    if (!mounted) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-90 md:hidden">
      {/* Dim to focus (§12): a modal task pushes everything else back. */}
      <motion.button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        style={{ opacity: scrimOpacity }}
        className="bg-scrim absolute inset-0 h-full w-full cursor-default"
      />

      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{ y, touchAction: 'none' }}
        className={cn(
          'material-sheet absolute inset-x-0 bottom-0 rounded-t-[1.75rem] pb-[max(1.25rem,env(safe-area-inset-bottom))]',
          // Without this the browser starts its own text/link drag partway
          // through ours and fires pointercancel, stranding the sheet
          // wherever the gesture happened to be when it was killed.
          'touch-none select-none',
          dragging && 'cursor-grabbing',
        )}
        {...handlers}
      >
        {/* The grab handle is the affordance: it says this surface is physical
            before the reader has touched it. */}
        <div className="flex justify-center pt-3 pb-1">
          <span className="bg-line-strong h-1 w-10 rounded-full" aria-hidden="true" />
        </div>

        <div className="flex items-center justify-between px-5 pb-1">
          <Text as="span" size="label" tone="faint">
            {site.shortName}
          </Text>
          <IconButton label="Close menu" onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </div>

        <nav>
          <ul className="flex flex-col px-3 pb-3">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  draggable={false}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold no-underline',
                      isActive ? 'bg-leaf-soft text-leaf' : 'text-ink',
                    )
                  }
                >
                  {item.label}
                  <Icon name="chevron-right" className="opacity-40" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>,
    document.body,
  )
}
