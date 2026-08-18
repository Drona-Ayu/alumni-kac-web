import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue } from 'motion/react'
import type { GalleryImage } from '@/content/types'
import { Icon } from '@/components/atoms/Icon'
import { IconButton } from '@/components/atoms/IconButton'
import { asset } from '@/lib/asset'
import { useDragAxis } from '@/hooks/useDragAxis'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'

type Props = {
  images: GalleryImage[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

/**
 * Full-screen photo viewer with paging by throw.
 *
 * The page you land on is chosen from where the flick was *going*, not from
 * where the finger lifted (§6), and the spring that carries you there starts at
 * the finger's exact release speed, so there is no seam between the drag and
 * the animation (§5). A slow drag that does not project past the halfway point
 * springs back — the gesture is always reversible right up to the release.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: Props) {
  const open = index !== null
  const reduced = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)

  const snapPoints = useCallback(() => images.map((_, i) => -i * width), [images, width])

  const { dragging, settleTo, handlers } = useDragAxis({
    axis: 'x',
    value: x,
    getBounds: () => [-(images.length - 1) * width, 0],
    getSnapPoints: snapPoints,
    getDimension: () => Math.max(1, width),
    spring: reduced ? crossFade : springs.sheet,
    // Paging moves one card at a time however hard it is thrown — a flick
    // should feel decisive, not like it lost your place.
    maxSnapStep: 1,
    enabled: open && images.length > 1,
    // Report the destination the moment it is chosen so the counter and the
    // caption are already telling you where you are going (§8).
    onCommit: (_, i) => onIndexChange(i),
  })

  useBodyScrollLock(open)

  useLayoutEffect(() => {
    if (!open) return
    const node = trackRef.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect.width ?? 0)
    })
    observer.observe(node)
    setWidth(node.clientWidth)
    return () => observer.disconnect()
  }, [open])

  /* Keep the track aligned to the current page whenever the index or the
     viewport changes from outside the gesture. */
  useLayoutEffect(() => {
    if (!open || width === 0 || index === null) return
    const target = -index * width
    if (dragging) return
    if (Math.abs(x.get() - target) < 0.5) return
    settleTo(target, reduced ? crossFade : springs.move)
  }, [open, width, index, dragging, settleTo, reduced, x])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndexChange(Math.min(images.length - 1, (index ?? 0) + 1))
      if (e.key === 'ArrowLeft') onIndexChange(Math.max(0, (index ?? 0) - 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, index, images.length, onClose, onIndexChange])

  if (!open || index === null) return null
  const current = images[index]

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? crossFade : { duration: 0.18, ease: 'easeOut' }}
      className="fixed inset-0 z-100 flex flex-col bg-black/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
        <span className="text-sm font-semibold tracking-[0.04em] text-white/80 tabular-nums">
          {index + 1} / {images.length}
        </span>
        <IconButton label="Close photo viewer" tone="onScrim" onClick={onClose}>
          <Icon name="close" />
        </IconButton>
      </div>

      <div ref={trackRef} className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div className="flex h-full" style={{ x, touchAction: 'pan-y' }} {...handlers}>
          {images.map((image, i) => (
            <div
              key={image.src + i}
              className="flex h-full shrink-0 items-center justify-center px-4"
              style={{ width: width || '100%' }}
              aria-hidden={i !== index}
            >
              <img
                src={asset(image.src)}
                alt={image.alt}
                draggable={false}
                loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                className="max-h-full max-w-full rounded-xl object-contain select-none"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="min-h-16 px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-balance text-white/75">
          {current?.caption ?? current?.alt}
        </p>
        {images.length > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-3">
            <IconButton
              label="Previous photo"
              tone="onScrim"
              onClick={() => onIndexChange(Math.max(0, index - 1))}
            >
              <Icon name="arrow-left" />
            </IconButton>
            <IconButton
              label="Next photo"
              tone="onScrim"
              onClick={() => onIndexChange(Math.min(images.length - 1, index + 1))}
            >
              <Icon name="arrow-right" />
            </IconButton>
          </div>
        ) : null}
      </div>
    </motion.div>,
    document.body,
  )
}
