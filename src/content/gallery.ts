import type { Album } from './types'
import { campusPhotos, photoWidths } from './photos'

/**
 * TODO: replace the placeholder graphics in `public/gallery/` with the
 * association's own photographs, and rewrite every `alt` to describe what is
 * actually in the picture. Alt text is content, not decoration — it is the
 * caption for someone who cannot see the image, so it belongs here beside the
 * rest of the copy rather than being invented by a component.
 *
 * Paths are absolute from the site root; the deployed base path is applied
 * automatically when the image renders.
 */
export const albums: Album[] = [
  /* The association's own photographs — the only real ones on the site so far.
     Alt text and captions live with the photos in `photos.ts`. */
  {
    slug: 'campus-monsoon',
    title: 'The campus in the monsoon',
    year: 'Pariyaram',
    cover: campusPhotos.entrance.src,
    images: [
      campusPhotos.entrance,
      campusPhotos.building,
      campusPhotos.road,
      campusPhotos.ground,
    ].map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      caption: photo.caption,
      widths: photoWidths,
      position: photo.position,
    })),
  },
  {
    slug: 'alumni-meet-2025',
    title: 'Alumni Meet',
    year: '2025',
    cover: '/gallery/meet-2025-01.svg',
    images: [
      {
        src: '/gallery/meet-2025-01.svg',
        alt: 'Placeholder graphic standing in for a photograph from the alumni meet.',
        caption: 'Alumni gathering on campus.',
      },
      {
        src: '/gallery/meet-2025-02.svg',
        alt: 'Placeholder graphic standing in for a photograph from the alumni meet.',
        caption: 'The formal session in the auditorium.',
      },
      {
        src: '/gallery/meet-2025-03.svg',
        alt: 'Placeholder graphic standing in for a photograph from the alumni meet.',
        caption: 'Batches meeting again after years.',
      },
      {
        src: '/gallery/meet-2025-04.svg',
        alt: 'Placeholder graphic standing in for a photograph from the alumni meet.',
        caption: 'Evening on the campus grounds.',
      },
    ],
  },
  {
    slug: 'cme-2025',
    title: 'CME Programme',
    year: '2025',
    cover: '/gallery/cme-2025-01.svg',
    images: [
      {
        src: '/gallery/cme-2025-01.svg',
        alt: 'Placeholder graphic standing in for a photograph from the CME programme.',
        caption: 'Opening session in the seminar hall.',
      },
      {
        src: '/gallery/cme-2025-02.svg',
        alt: 'Placeholder graphic standing in for a photograph from the CME programme.',
        caption: 'Clinical case discussion.',
      },
      {
        src: '/gallery/cme-2025-03.svg',
        alt: 'Placeholder graphic standing in for a photograph from the CME programme.',
        caption: 'Delegates at the close of the day.',
      },
    ],
  },
  {
    slug: 'medical-camp-2025',
    title: 'Medical Camp',
    year: '2025',
    cover: '/gallery/camp-2025-01.svg',
    images: [
      {
        src: '/gallery/camp-2025-01.svg',
        alt: 'Placeholder graphic standing in for a photograph from the medical camp.',
        caption: 'Consultation desks at the camp.',
      },
      {
        src: '/gallery/camp-2025-02.svg',
        alt: 'Placeholder graphic standing in for a photograph from the medical camp.',
        caption: 'Dispensing medicines on site.',
      },
      {
        src: '/gallery/camp-2025-03.svg',
        alt: 'Placeholder graphic standing in for a photograph from the medical camp.',
        caption: 'Volunteers at the close of the camp.',
      },
    ],
  },
]

export function findAlbum(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug)
}
