import type { SiteContent } from './types'

/**
 * Identity and contact details.
 *
 * The association name, registration number and institution are confirmed.
 * Everything marked TODO is a placeholder shaped like the real thing so the
 * site renders complete — replace the values, not the structure.
 */
export const site: SiteContent = {
  name: 'Kannur Ayurveda College Alumni Association',
  shortName: 'KhAyAL',
  // TODO: confirm how the association expands or explains the name KhAyAL.
  shortNameMeaning: 'The alumni association of Government Ayurveda Medical College, Pariyaram',
  registrationNumber: 'KNR/CA/355/2024',
  institution: 'Government Ayurveda Medical College, Pariyaram',
  institutionShort: 'Govt. Ayurveda Medical College, Pariyaram',
  location: 'Pariyaram, Kannur, Kerala',
  tagline: 'The college stays with you. So do the people.',
  description:
    'The alumni association of Government Ayurveda Medical College, Pariyaram — connecting graduates across batches for academic exchange, mentorship and service.',

  contact: {
    // TODO: replace with the association's published contact details.
    email: 'khayal.alumni@example.org',
    phone: '+91 00000 00000',
    addressLines: [
      'Kannur Ayurveda College Alumni Association (KhAyAL)',
      'Government Ayurveda Medical College',
      'Pariyaram, Kannur',
      'Kerala 670503',
    ],
    // TODO: replace with the association's own map link.
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Government+Ayurveda+College+Pariyaram',
  },

  // TODO: replace with the association's real handles, or delete the entries.
  socials: [
    { label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
  ],

  /* Named for what they contain, not for safe umbrellas (§16). */
  nav: [
    { to: '/about', label: 'About' },
    { to: '/committee', label: 'Committee' },
    { to: '/events', label: 'Events' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/membership', label: 'Membership' },
    { to: '/contact', label: 'Contact' },
  ],

  established: '2024',
}
