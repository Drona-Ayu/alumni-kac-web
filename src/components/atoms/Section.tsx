import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  /** Tone separates structural regions without needing a rule between them. */
  tone?: 'canvas' | 'sunken' | 'leaf'
  className?: string
  id?: string
  'aria-labelledby'?: string
}

const TONE = {
  canvas: 'bg-canvas text-ink',
  sunken: 'bg-sunken text-ink',
  leaf: 'bg-leaf text-on-leaf',
} as const

export function Section({ children, tone = 'canvas', className, id, ...rest }: Props) {
  return (
    <section
      id={id}
      className={cn('py-16 sm:py-20 lg:py-24', TONE[tone], className)}
      aria-labelledby={rest['aria-labelledby']}
    >
      {children}
    </section>
  )
}
