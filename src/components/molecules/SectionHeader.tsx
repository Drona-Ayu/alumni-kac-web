import type { ReactNode } from 'react'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/lib/cn'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  lede?: string
  /** A single action, right-aligned from `sm` up. */
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  size?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  action,
  as = 'h2',
  size = 'h2',
  className,
}: Props) {
  return (
    <div
      className={cn('flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between', className)}
    >
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow ? (
          <Text as="p" size="label" tone="brass">
            {eyebrow}
          </Text>
        ) : null}
        <Heading id={id} as={as} size={size}>
          {title}
        </Heading>
        {lede ? (
          <Text size="lead" tone="muted" className="text-pretty">
            {lede}
          </Text>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
