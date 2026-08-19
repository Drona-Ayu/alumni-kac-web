const LONG = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const SHORT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' })

function parse(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1)
}

/** "20 December 2026" */
export function formatDate(iso: string): string {
  return LONG.format(parse(iso))
}

/** A date range that does not repeat itself: "11–13 October 2026". */
export function formatDateRange(iso: string, isoEnd?: string): string {
  if (!isoEnd || isoEnd === iso) return formatDate(iso)
  const start = parse(iso)
  const end = parse(isoEnd)
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${formatDate(isoEnd)}`
  }
  return `${SHORT.format(start)} – ${formatDate(isoEnd)}`
}

/** Split for a calendar-chip layout. */
export function dateParts(iso: string): { day: string; month: string; year: string } {
  const d = parse(iso)
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(d).toUpperCase(),
    year: String(d.getFullYear()),
  }
}

export function isPast(iso: string, now = new Date()): boolean {
  return parse(iso) < new Date(now.getFullYear(), now.getMonth(), now.getDate())
}
