import { Link } from 'react-router-dom'
import { sortedNotices } from '@/content/notices'
import { upcomingEvents } from '@/content/events'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Heading } from '@/components/atoms/Heading'
import { Reveal } from '@/components/molecules/Reveal'
import { dateParts, formatDateRange, formatDate } from '@/lib/date'

/**
 * Notices on the left, the next event on the right.
 *
 * This is the only place the home page carries either, deliberately: the full
 * lists live on their own pages, and repeating them here as well would put the
 * same three notices on screen twice.
 */
export function UpdatesBand() {
  const notices = sortedNotices().slice(0, 3)
  const next = upcomingEvents()[0]

  if (notices.length === 0 && !next) return null

  return (
    <Section tone="sunken" aria-labelledby="updates">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-4">
              <Heading id="updates" size="h2">
                Latest updates
              </Heading>
              <Link
                to="/events"
                className="text-leaf shrink-0 text-sm font-semibold no-underline hover:underline"
              >
                View all
              </Link>
            </div>

            <ul className="flex flex-col">
              {notices.map((notice) => (
                <li
                  key={notice.title}
                  className="border-line flex flex-col gap-1.5 border-b py-5 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <Text as="span" size="label" tone="faint">
                    {formatDate(notice.date)}
                  </Text>
                  <h3 className="t-h3">{notice.title}</h3>
                  <Text size="small" tone="muted" className="text-pretty">
                    {notice.body}
                  </Text>
                  {notice.link ? (
                    <Link
                      to={notice.link.href}
                      className="text-leaf mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold no-underline hover:underline"
                    >
                      {notice.link.label}
                      <Icon name="arrow-right" size={1} />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>

          {next ? (
            <Reveal delay={0.06}>
              <div className="bg-leaf text-on-leaf shadow-panel flex flex-col gap-5 rounded-3xl p-7 sm:p-8">
                <Text as="p" size="label" className="text-on-leaf/70">
                  Next event
                </Text>

                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 flex-col items-center rounded-2xl bg-white/15 px-3.5 py-2.5">
                    <span className="font-display text-3xl leading-none font-semibold tracking-[-0.02em]">
                      {dateParts(next.date).day}
                    </span>
                    <span className="mt-1 text-[0.625rem] font-semibold tracking-[0.1em]">
                      {dateParts(next.date).month}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="t-h3">{next.title}</h3>
                    <p className="text-on-leaf/85 text-sm">
                      {formatDateRange(next.date, next.endDate)}
                      {next.time ? ` · ${next.time}` : ''}
                    </p>
                    <p className="text-on-leaf/85 inline-flex items-start gap-1.5 text-sm">
                      <Icon name="pin" size={0.95} className="mt-0.5" />
                      {next.venue}
                    </p>
                  </div>
                </div>

                <p className="text-on-leaf/85 text-sm text-pretty">{next.summary}</p>

                <div className="mt-auto pt-1">
                  <Button to={`/events/${next.slug}`} variant="secondary" block>
                    Event details
                    <Icon name="arrow-right" size={1} />
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
