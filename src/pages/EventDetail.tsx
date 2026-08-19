import { Link, useParams } from 'react-router-dom'
import { findEvent } from '@/content/events'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Heading } from '@/components/atoms/Heading'
import { formatDateRange, isPast } from '@/lib/date'
import { usePageMeta } from '@/lib/document'
import { NotFound } from './NotFound'

export function EventDetail() {
  const { slug } = useParams()
  const event = slug ? findEvent(slug) : undefined

  usePageMeta(event?.title ?? 'Event', event?.summary)

  if (!event) {
    return <NotFound title="We could not find that event" />
  }

  const past = isPast(event.endDate ?? event.date)

  return (
    <>
      <div className="border-line border-b pt-28 pb-16 sm:pt-40 sm:pb-20 lg:pb-24">
        <Container width="prose">
          {/* Always a way back out (§16 wayfinding). */}
          <Link
            to="/events"
            className="text-ink-muted hover:text-leaf mb-6 inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
          >
            <Icon name="arrow-left" size={1} />
            All events
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {past ? <Badge>Past event</Badge> : <Badge tone="leaf">Upcoming</Badge>}
              {event.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <Heading as="h1" size="h1" className="text-balance">
              {event.title}
            </Heading>

            <div className="text-ink-muted flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" size={1.05} />
                {formatDateRange(event.date, event.endDate)}
                {event.time ? ` · ${event.time}` : ''}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" size={1.05} />
                {event.venue}
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container width="prose">
          <div className="flex flex-col gap-5">
            <Text size="lead" className="text-pretty">
              {event.summary}
            </Text>
            {event.body?.map((para) => (
              <Text key={para.slice(0, 24)} tone="muted" className="text-pretty">
                {para}
              </Text>
            ))}
          </div>

          {event.registerUrl && !past ? (
            <div className="mt-10">
              <Button href={event.registerUrl} size="lg">
                Register
                <Icon name="external" size={1.05} />
              </Button>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
