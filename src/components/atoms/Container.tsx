import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  /** `prose` narrows to a comfortable reading measure for long-form copy. */
  width?: 'default' | 'wide' | 'prose'
  className?: string
}

export function Container({ children, width = 'default', className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        width === 'default' && 'max-w-6xl',
        width === 'wide' && 'max-w-7xl',
        width === 'prose' && 'max-w-3xl',
        className,
      )}
    >
      {children}
    </div>
  )
}
