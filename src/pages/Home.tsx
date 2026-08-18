import { site } from '@/content/site'
import { upcomingEvents } from '@/content/events'
import { albums } from '@/content/gallery'
import { Hero } from '@/components/organisms/Hero'
import { StatsBand } from '@/components/organisms/StatsBand'
import { NoticeBoard } from '@/components/organisms/NoticeBoard'
import { AboutIntro } from '@/components/organisms/AboutIntro'
import { EventsList } from '@/components/organisms/EventsList'
import { GalleryGrid } from '@/components/organisms/GalleryGrid'
import { MembershipCTA } from '@/components/organisms/MembershipCTA'
import { Button } from '@/components/atoms/Button'
import { usePageMeta } from '@/lib/document'

export function Home() {
  usePageMeta('', site.description)

  return (
    <>
      <Hero />
      <StatsBand />
      <NoticeBoard limit={3} />
      <AboutIntro />
      <EventsList
        id="upcoming"
        eyebrow="Calendar"
        title="Coming up"
        lede="Meetings, academic programmes and camps open to alumni."
        events={upcomingEvents().slice(0, 3)}
        tone="sunken"
        action={
          <Button to="/events" variant="secondary">
            All events
          </Button>
        }
      />
      <GalleryGrid
        id="gallery-preview"
        eyebrow="Gallery"
        title="From the last few gatherings"
        lede="Tap a photo to open it — then swipe or throw to move through the set."
        albums={albums.slice(0, 1)}
      />
      <MembershipCTA />
    </>
  )
}
