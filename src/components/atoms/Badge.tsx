import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  tone?: 'leaf' | 'brass' | 'neutral'
  className?: string
}

const TONE = {
  leaf: 'bg-leaf-soft text-leaf',
  brass: 'bg-brass-soft text-brass',
  neutral: 'bg-sunken text-ink-muted',
} as const

export function Badge({ children, tone = 'neutral', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.02em]',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
