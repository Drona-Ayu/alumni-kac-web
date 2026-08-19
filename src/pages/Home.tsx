import { site } from '@/content/site'
import { albums } from '@/content/gallery'
import { Hero } from '@/components/organisms/Hero'
import { QuickLinks } from '@/components/organisms/QuickLinks'
import { StatsBand } from '@/components/organisms/StatsBand'
import { AboutIntro } from '@/components/organisms/AboutIntro'
import { UpdatesBand } from '@/components/organisms/UpdatesBand'
import { StoriesBand } from '@/components/organisms/StoriesBand'
import { GalleryGrid } from '@/components/organisms/GalleryGrid'
import { MembershipCTA } from '@/components/organisms/MembershipCTA'
import { usePageMeta } from '@/lib/document'

export function Home() {
  usePageMeta('', site.description)

  return (
    <>
      <Hero />
      <QuickLinks />
      <StatsBand />
      <AboutIntro />
      {/* Notices and the next event, once. The full lists are on their own
          pages — carrying them here as well would put the same three notices
          on screen twice. */}
      <UpdatesBand />
      <StoriesBand />
      <GalleryGrid
        id="gallery-preview"
        eyebrow="Gallery"
        title="The campus, and the people in it"
        lede="Tap a photo to open it — then swipe, or throw it, to move through the set."
        albums={albums.slice(0, 1)}
        tone="sunken"
      />
      <MembershipCTA />
    </>
  )
}
