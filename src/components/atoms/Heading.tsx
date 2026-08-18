import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Level and size are separate on purpose. The heading level is a document
 * structure decision (screen readers navigate by it); the size is a visual
 * hierarchy decision. Conflating them forces one to be wrong.
 */
type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'display' | 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
  id?: string
}

const SIZE = {
  display: 't-display',
  h1: 't-h1',
  h2: 't-h2',
  h3: 't-h3',
} as const

export function Heading({ as: Tag = 'h2', size = 'h2', children, className, id }: Props) {
  return (
    <Tag id={id} className={cn(SIZE[size], 'text-ink text-balance', className)}>
      {children}
    </Tag>
  )
}
