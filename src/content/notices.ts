import type { Notice } from './types'

/**
 * TODO: replace with the association's actual announcements.
 * Pinned notices sort to the top; the rest are newest-first.
 */
export const notices: Notice[] = [
  {
    title: 'Alumni register: add your details',
    date: '2026-06-01',
    body: 'The batch-wise register is open. Adding your current practice location and contact details is what makes the network usable for everyone else.',
    link: { label: 'Add your details', href: '/membership' },
    pinned: true,
  },
  {
    title: 'Membership renewal for 2026–27 is open',
    date: '2026-05-12',
    body: 'Annual memberships may be renewed from now until the general body meeting. Life members need take no action.',
    link: { label: 'Renew membership', href: '/membership' },
  },
  {
    title: 'Call for CME topic proposals',
    date: '2026-04-02',
    body: 'The academic subcommittee is collecting proposals for the next continuing medical education programme. Write to us with a topic and a suggested resource person.',
    link: { label: 'Write to the committee', href: '/contact' },
  },
]

export function sortedNotices(): Notice[] {
  return [...notices].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1
    return b.date.localeCompare(a.date)
  })
}
