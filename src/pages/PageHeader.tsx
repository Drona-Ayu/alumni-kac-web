import type { ReactNode } from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

type Props = {
  eyebrow: string
  title: string
  lede?: string
  children?: ReactNode
}

/**
 * The top of every inner page, so "where am I" is answered the same way
 * everywhere (§16 familiarity + wayfinding). The extra top padding clears the
 * floating header, which content otherwise scrolls underneath.
 */
export function PageHeader({ eyebrow, title, lede, children }: Props) {
  return (
    <div className="border-line border-b pt-28 pb-16 sm:pt-40 sm:pb-20 lg:pb-24">
      <Container>
        <div className="flex max-w-3xl flex-col gap-4">
          <Text as="p" size="label" tone="brass">
            {eyebrow}
          </Text>
          <Heading as="h1" size="h1" className="text-balance">
            {title}
          </Heading>
          {lede ? (
            <Text size="lead" tone="muted" className="text-pretty">
              {lede}
            </Text>
          ) : null}
          {children}
        </div>
      </Container>
    </div>
  )
}
