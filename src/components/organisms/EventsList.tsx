import type { EventItem } from '@/content/types'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Text } from '@/components/atoms/Text'
import { EventCard } from '@/components/molecules/EventCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Reveal } from '@/components/molecules/Reveal'
import type { ReactNode } from 'react'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  lede?: string
  events: EventItem[]
  action?: ReactNode
  tone?: 'canvas' | 'sunken'
  /** Copy shown when there is nothing to list — an answer, not a blank space. */
  empty?: string
}

export function EventsList({
  id,
  eyebrow,
  title,
  lede,
  events,
  action,
  tone = 'canvas',
  empty = 'Nothing scheduled just now. Notices go up here as soon as dates are fixed.',
}: Props) {
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <SectionHeader
          id={id}
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          action={action}
          className="mb-10"
        />

        {events.length === 0 ? (
          <div className="border-line rounded-3xl border border-dashed px-6 py-14 text-center">
            <Text tone="muted">{empty}</Text>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <li key={event.slug} className="flex">
                <Reveal delay={Math.min(i, 5) * 0.04} className="flex w-full">
                  <div className="w-full">
                    <EventCard event={event} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
