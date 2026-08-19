import type { Story } from './types'

/**
 * TODO: every entry below is a placeholder. Replace them with real alumni who
 * have agreed to be quoted, and add `photo: '/stories/name.jpg'` once portraits
 * are available — without one the card falls back to initials, which is a
 * complete state rather than a gap.
 *
 * Ask permission before publishing anyone's name, batch or photograph.
 */
export const stories: Story[] = [
  {
    name: 'Dr. A. Nair',
    batch: 'BAMS 2004',
    role: 'Physician, district hospital',
    place: 'Kannur',
    quote:
      'The training at Pariyaram was thorough in a way I only understood later, in practice. The association is how I have stayed in touch with the teachers who gave it.',
  },
  {
    name: 'Dr. S. Menon',
    batch: 'BAMS 2007',
    role: 'Post-graduate, Panchakarma',
    place: 'Kozhikode',
    quote:
      'A senior I met through the alumni register talked me through my post-graduate entrance. I have since done the same for two juniors.',
  },
  {
    name: 'Dr. M. Devi',
    batch: 'BAMS 2009',
    role: 'Own practice',
    place: 'Payyanur',
    quote:
      'Setting up alone is daunting. Having a group of people who trained where you trained, a phone call away, makes it considerably less so.',
  },
]
