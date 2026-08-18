import type { EventItem } from './types'

/**
 * TODO: replace with the association's actual programme.
 *
 * Upcoming and past are derived from `date` at render time, so nothing here
 * needs to be re-sorted or moved between lists as dates pass.
 */
export const events: EventItem[] = [
  {
    slug: 'annual-general-body-meeting-2026',
    title: 'Annual General Body Meeting',
    date: '2026-12-20',
    time: '10:00 AM – 4:00 PM',
    venue: 'College Auditorium, Pariyaram',
    summary:
      'The yearly meeting of the full alumni body: accounts, the year’s work, and the plan for the year ahead — followed by lunch and an open session.',
    body: [
      'The general body meeting is the one day in the year the whole association is in the same room. The committee presents the year’s accounts and activities, the general body raises what it wants raised, and proposals for the coming year are put to a vote.',
      'Registration opens at 9:30 AM in the auditorium foyer. Lunch is provided. Alumni bringing family are welcome — please indicate numbers when you register so we can plan.',
    ],
    tags: ['General body', 'On campus'],
  },
  {
    slug: 'cme-panchakarma-practice-2026',
    title: 'CME: Panchakarma in Contemporary Practice',
    date: '2026-10-11',
    time: '9:00 AM – 5:00 PM',
    venue: 'Seminar Hall, Govt. Ayurveda Medical College, Pariyaram',
    summary:
      'A full-day continuing medical education programme on Panchakarma protocols, case selection and documentation, led by senior alumni and department faculty.',
    body: [
      'The programme covers patient selection, protocol design, and the documentation practices that make clinical outcomes reportable. Sessions are led by department faculty together with alumni in active practice.',
      'Open to alumni and to final-year students of the college. Seats are limited; registration closes a week before the programme.',
    ],
    tags: ['CME', 'Clinical'],
  },
  {
    slug: 'alumni-meet-2026',
    title: 'Alumni Meet 2026',
    date: '2026-09-05',
    time: '4:00 PM onwards',
    venue: 'College Campus, Pariyaram',
    summary:
      'Batches from across the years back on campus for an evening — a short formal session, then food, music and the long conversations that are the actual point.',
    tags: ['Meet', 'On campus'],
  },
  {
    slug: 'medical-camp-payyanur-2026',
    title: 'Free Medical Camp, Payyanur',
    date: '2026-02-15',
    time: '8:00 AM – 2:00 PM',
    venue: 'Community Hall, Payyanur',
    summary:
      'General consultation and lifestyle-disorder screening run by alumni physicians, with medicines dispensed on site.',
    tags: ['Service', 'Camp'],
  },
  {
    slug: 'founders-day-2025',
    title: 'Founders’ Day and Teachers’ Felicitation',
    date: '2025-11-08',
    time: '10:00 AM – 1:00 PM',
    venue: 'College Auditorium, Pariyaram',
    summary:
      'The association honours retired faculty of the college, with alumni from the earliest batches returning to speak.',
    tags: ['Ceremony'],
  },
  {
    slug: 'first-general-body-2024',
    title: 'First General Body Meeting',
    date: '2024-08-17',
    venue: 'College Auditorium, Pariyaram',
    summary:
      'The meeting at which the constitution was adopted and the first executive committee elected, following the association’s registration.',
    tags: ['General body', 'Milestone'],
  },
]

/** Sorted soonest-first; anything today or later. */
export function upcomingEvents(now = new Date()): EventItem[] {
  const today = startOfDay(now)
  return events.filter((e) => endOf(e) >= today).sort((a, b) => a.date.localeCompare(b.date))
}

/** Sorted most-recent-first. */
export function pastEvents(now = new Date()): EventItem[] {
  const today = startOfDay(now)
  return events.filter((e) => endOf(e) < today).sort((a, b) => b.date.localeCompare(a.date))
}

export function findEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug)
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function endOf(e: EventItem): Date {
  const [y, m, d] = (e.endDate ?? e.date).split('-').map(Number)
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1)
}
