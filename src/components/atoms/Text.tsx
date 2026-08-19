import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  as?: ElementType
  size?: 'lead' | 'body' | 'small' | 'label'
  tone?: 'default' | 'muted' | 'faint' | 'leaf' | 'brass' | 'onLeaf'
  children: ReactNode
  className?: string
}

const SIZE = {
  lead: 't-lead',
  body: 't-body',
  small: 't-small',
  label: 't-label',
} as const

const TONE = {
  default: 'text-ink',
  muted: 'text-ink-muted',
  faint: 'text-ink-faint',
  leaf: 'text-leaf',
  brass: 'text-brass',
  onLeaf: 'text-on-leaf',
} as const

export function Text({
  as: Tag = 'p',
  size = 'body',
  tone = 'default',
  children,
  className,
}: Props) {
  return <Tag className={cn(SIZE[size], TONE[tone], className)}>{children}</Tag>
}
