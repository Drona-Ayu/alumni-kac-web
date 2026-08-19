import { pastEvents, upcomingEvents } from '@/content/events'
import { site } from '@/content/site'
import { EventsList } from '@/components/organisms/EventsList'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function Events() {
  usePageMeta('Events', `Meetings, CME programmes, camps and gatherings held by ${site.shortName}.`)

  const upcoming = upcomingEvents()
  const past = pastEvents()

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Meetings, programmes and camps"
        lede="Everything the association has scheduled, and everything it has already held."
      />

      <EventsList
        id="upcoming"
        eyebrow="Ahead"
        title="Coming up"
        events={upcoming}
        empty="Nothing on the calendar at the moment. New dates are announced on the noticeboard first."
      />

      {past.length > 0 ? (
        <EventsList id="past" eyebrow="Behind" title="Already held" tone="sunken" events={past} />
      ) : null}
    </>
  )
}
