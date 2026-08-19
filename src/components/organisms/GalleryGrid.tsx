import { useState } from 'react'
import type { Album } from '@/content/types'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Text } from '@/components/atoms/Text'
import { GalleryTile } from '@/components/molecules/GalleryTile'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Reveal } from '@/components/molecules/Reveal'
import { Lightbox } from './Lightbox'

type Props = {
  albums: Album[]
  id?: string
  eyebrow?: string
  title: string
  lede?: string
  tone?: 'canvas' | 'sunken'
}

export function GalleryGrid({ albums, id, eyebrow, title, lede, tone = 'canvas' }: Props) {
  /** Which album is open, and where in it — one lightbox serves them all. */
  const [viewing, setViewing] = useState<{ album: number; image: number } | null>(null)
  const active = viewing !== null ? albums[viewing.album] : undefined

  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <SectionHeader id={id} eyebrow={eyebrow} title={title} lede={lede} className="mb-10" />

        <div className="flex flex-col gap-14">
          {albums.map((album, albumIndex) => (
            <div key={album.slug} className="flex flex-col gap-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="t-h3">{album.title}</h3>
                <Text as="span" size="label" tone="faint">
                  {album.year}
                </Text>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {album.images.map((image, imageIndex) => (
                  <li key={image.src}>
                    <Reveal delay={Math.min(imageIndex, 5) * 0.03}>
                      <GalleryTile
                        image={image}
                        onOpen={() => setViewing({ album: albumIndex, image: imageIndex })}
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Lightbox
        images={active?.images ?? []}
        index={viewing?.image ?? null}
        onIndexChange={(image) => setViewing((v) => (v ? { ...v, image } : v))}
        onClose={() => setViewing(null)}
      />
    </Section>
  )
}
