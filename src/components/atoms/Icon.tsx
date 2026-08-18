import { cn } from '@/lib/cn'

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-right'
  | 'close'
  | 'menu'
  | 'calendar'
  | 'pin'
  | 'mail'
  | 'phone'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'whatsapp'
  | 'external'
  | 'sun'
  | 'moon'
  | 'auto'
  | 'check'
  | 'lotus'

/**
 * Stroke icons on a 24-unit grid, `currentColor` throughout, so an icon
 * inherits the tone of whatever it sits beside instead of being a fixed swatch.
 */
const PATHS: Record<IconName, string> = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  calendar: 'M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  phone: 'M7 3h3l2 5-2.5 1.5a12 12 0 005 5L16 12l5 2v3a2 2 0 01-2 2A16 16 0 015 5a2 2 0 012-2z',
  facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 011-1z',
  instagram:
    'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z M12 16a4 4 0 100-8 4 4 0 000 8z M17.5 6.5h.01',
  youtube: 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3z M10 9.5l5 2.5-5 2.5z',
  whatsapp:
    'M3.5 20.5l1.4-4.6A8 8 0 1112 20a8 8 0 01-4-1.1z M9 9.5c0 3 2.5 5.5 5.5 5.5l.5-1.5-2-1-1 1a5 5 0 01-1.5-1.5l1-1-1-2z',
  external: 'M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h4',
  sun: 'M12 17a5 5 0 100-10 5 5 0 000 10z M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z',
  auto: 'M12 3a9 9 0 100 18zM12 3a9 9 0 010 18',
  check: 'M5 13l4 4L19 7',
  lotus:
    'M12 21c-4.5 0-8-2.8-8-6 0 0 3-1 5 1 0-4 1.6-7 3-9 1.4 2 3 5 3 9 2-2 5-1 5-1 0 3.2-3.5 6-8 6z',
}

type Props = {
  name: IconName
  className?: string
  /** Size in rem so icons scale with the reader's text size (§15). */
  size?: number
}

export function Icon({ name, className, size = 1.25 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={`${size}rem`}
      height={`${size}rem`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
