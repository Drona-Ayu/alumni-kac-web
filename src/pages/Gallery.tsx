import { albums } from '@/content/gallery'
import { site } from '@/content/site'
import { GalleryGrid } from '@/components/organisms/GalleryGrid'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function Gallery() {
  usePageMeta('Gallery', `Photographs from ${site.shortName} meets, programmes and camps.`)

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photographs"
        lede="Open any photo to view it full screen — then swipe, or throw it, to move through the set."
      />
      <GalleryGrid albums={albums} title="Albums" id="albums" />
    </>
  )
}
