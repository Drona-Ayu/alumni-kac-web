import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePressable } from '@/hooks/usePressable'

type Props = {
  /** Required: an icon alone tells assistive tech nothing. */
  label: string
  children: ReactNode
  onClick?: () => void
  className?: string
  tone?: 'chrome' | 'onScrim'
}

export function IconButton({ label, children, onClick, className, tone = 'chrome' }: Props) {
  const { pressed, pressHandlers } = usePressable()
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
        'transition-[scale,background-color] duration-100 ease-out motion-reduce:transition-none',
        pressed ? 'scale-[0.92]' : 'scale-100',
        tone === 'chrome' && 'text-ink hover:bg-leaf-soft',
        tone === 'onScrim' && 'bg-white/12 text-white backdrop-blur-md hover:bg-white/22',
        className,
      )}
      {...pressHandlers}
    >
      {children}
    </button>
  )
}
