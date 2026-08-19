import { Link } from 'react-router-dom'
import type { EventItem } from '@/content/types'
import { Badge } from '@/components/atoms/Badge'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { dateParts, formatDateRange, isPast } from '@/lib/date'
import { usePressable } from '@/hooks/usePressable'
import { cn } from '@/lib/cn'

/**
 * The whole card is the target. A "read more" link beside a card the reader has
 * already decided to open is a smaller hit area for no reason — the heading
 * carries the accessible name, and the surrounding link is marked hidden so it
 * is announced once, not twice.
 */
export function EventCard({ event }: { event: EventItem }) {
  const { day, month } = dateParts(event.date)
  const past = isPast(event.endDate ?? event.date)
  const { pressed, pressHandlers } = usePressable()

  return (
    <article className="relative">
      <div
        className={cn(
          'bg-surface border-line flex h-full flex-col gap-4 rounded-3xl border p-5 sm:p-6',
          'shadow-chip transition-[scale,box-shadow] duration-100 ease-out motion-reduce:transition-none',
          pressed ? 'scale-[0.985]' : 'scale-100',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="bg-leaf-soft flex flex-col items-center rounded-2xl px-3 py-2">
            <span className="font-display text-leaf text-2xl leading-none font-semibold tracking-[-0.02em]">
              {day}
            </span>
            <span className="text-leaf mt-1 text-[0.625rem] font-semibold tracking-[0.1em]">
              {month}
            </span>
          </div>
          {past ? <Badge>Past</Badge> : <Badge tone="leaf">Upcoming</Badge>}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="t-h3">
            <Link
              to={`/events/${event.slug}`}
              className="text-ink no-underline after:absolute after:inset-0 after:content-['']"
              {...pressHandlers}
            >
              {event.title}
            </Link>
          </h3>
          <Text size="small" tone="muted" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={0.95} />
              {formatDateRange(event.date, event.endDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="pin" size={0.95} />
              {event.venue}
            </span>
          </Text>
        </div>

        <Text size="small" tone="muted" className="text-pretty">
          {event.summary}
        </Text>

        <span className="text-leaf mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold">
          Details
          <Icon name="arrow-right" size={1} />
        </span>
      </div>
    </article>
  )
}
