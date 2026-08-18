/**
 * The site's content schema.
 *
 * Everything the site renders is described here and supplied by the modules in
 * this folder. Components take props; only the modules know the association's
 * actual copy. Adding an event or a committee member is a data edit — no
 * component is touched, and a missing field is a compile error rather than a
 * blank space discovered in production.
 */

export type NavItem = {
  /** Router path. */
  to: string
  /** Name the destination by what is in it, never a vague umbrella (§16). */
  label: string
}

export type SocialLink = {
  label: string
  href: string
  /** Key into the icon set in components/atoms/Icon.tsx. */
  icon: 'facebook' | 'instagram' | 'youtube' | 'whatsapp' | 'mail' | 'phone'
}

export type SiteContent = {
  /** Full registered name of the association. */
  name: string
  /** The short name people actually use. */
  shortName: string
  /** How the association explains the short name. */
  shortNameMeaning: string
  registrationNumber: string
  institution: string
  institutionShort: string
  location: string
  tagline: string
  /** One or two sentences for the document description and social cards. */
  description: string
  contact: {
    email: string
    phone: string
    addressLines: string[]
    mapUrl?: string
  }
  socials: SocialLink[]
  nav: NavItem[]
  /** Shown in the footer beside the copyright. */
  established?: string
}

export type Objective = {
  title: string
  body: string
}

export type Milestone = {
  year: string
  title: string
  body: string
}

export type Stat = {
  /** Kept as a string so "500+" and "1998" are both expressible. */
  value: string
  label: string
}

export type AboutContent = {
  intro: string[]
  mission: string
  vision: string
  objectives: Objective[]
  milestones: Milestone[]
  stats: Stat[]
  college: {
    heading: string
    body: string[]
  }
}

export type Person = {
  name: string
  role: string
  /** Graduating batch, e.g. "BAMS 2011". */
  batch?: string
  place?: string
  email?: string
  phone?: string
  /** Path under /public or an imported asset URL. Falls back to initials. */
  photo?: string
}

export type CommitteeContent = {
  term: string
  officeBearers: Person[]
  executiveMembers: Person[]
  note?: string
}

export type EventItem = {
  slug: string
  title: string
  /** ISO date, e.g. "2026-01-24". Upcoming vs past is derived from this. */
  date: string
  endDate?: string
  /** Free text, e.g. "10:00 AM – 4:00 PM". */
  time?: string
  venue: string
  summary: string
  /** Paragraphs of detail shown on the event's own page. */
  body?: string[]
  cover?: string
  registerUrl?: string
  tags?: string[]
}

export type GalleryImage = {
  src: string
  /** Real alt text, written for someone who cannot see the photo. */
  alt: string
  caption?: string
}

export type Album = {
  slug: string
  title: string
  year: string
  cover: string
  images: GalleryImage[]
}

export type Notice = {
  title: string
  /** ISO date. */
  date: string
  body: string
  link?: { label: string; href: string }
  pinned?: boolean
}

export type MembershipContent = {
  intro: string
  eligibility: string[]
  benefits: Objective[]
  tiers: { name: string; fee: string; note: string }[]
  steps: { title: string; body: string }[]
  formUrl?: string
  bankDetails?: { label: string; value: string }[]
}
