import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'

type Props = {
  children: ReactNode
  /** Stagger within a group, in seconds. Keep it small — this is punctuation. */
  delay?: number
  className?: string
}

/**
 * A short settle as a section comes into view.
 *
 * Deliberately restrained: no overshoot, because nothing here carried momentum
 * — the reader scrolled, they did not throw this (§4). Under reduced motion it
 * becomes a plain cross-fade, which still marks the arrival without moving
 * anything across the viewport (§14).
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={reduced ? crossFade : { ...springs.move, delay }}
    >
      {children}
    </motion.div>
  )
}
