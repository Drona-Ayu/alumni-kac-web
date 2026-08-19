import { useId } from 'react'

import { cn } from '@/lib/cn'
import { figurePath, geometry, quadrants, subtitlePath, wordmarkPath } from './logoPaths'

const { markSize, lockupWidth, lockupHeight, circle } = geometry

type Props = {
  /** `lockup` is the supplied artwork entire; `mark` is the roundel alone. */
  variant?: 'lockup' | 'mark'
  /** Height in rem, so the logo scales with the reader's text-size setting. */
  height?: number
  /**
   * Accessible name. Pass `null` inside an already-labelled link, otherwise
   * the name is announced twice.
   */
  title?: string | null
  className?: string
}

/**
 * The association's logo, drawn exactly as supplied.
 *
 * All the paths live in one coordinate space, so the lockup is a single `<svg>`
 * and the artwork's composition falls out of it for free — including the way
 * the `h` overlaps the roundel, which is the detail that makes it read as this
 * association's logo rather than a mark sitting next to some type.
 *
 * It is inlined rather than fetched through an `<img>` because the wordmark and
 * subtitle are filled with `currentColor`, and `currentColor` cannot cross an
 * `<img>` boundary. That is what lets the type flip to cream in dark mode while
 * the roundel keeps its true brand colours — a logo that restyles itself stops
 * being the logo.
 *
 * The two figures are the K: mark plus wordmark reads "KhAyAL".
 *
 * Note there is deliberately no display utility on the `<svg>`. An earlier
 * version hardcoded one, and a caller's `hidden` could not override it —
 * Tailwind orders utilities by property, not by the order they are written — so
 * the header painted the mark and the lockup at once. Callers own layout.
 */
export function Logo({ variant = 'lockup', height = 2.75, title = 'KhAyAL', className }: Props) {
  // The logo appears more than once per page, and two elements sharing a DOM
  // id is invalid — so the clip gets a unique one.
  const clipId = useId()
  const isMark = variant === 'mark'
  const width = isMark ? markSize : lockupWidth
  const boxHeight = isMark ? markSize : lockupHeight

  return (
    <svg
      viewBox={`0 0 ${width} ${boxHeight}`}
      height={`${height}rem`}
      width={`${height * (width / boxHeight)}rem`}
      role={title ? 'img' : 'presentation'}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      // Lets tests and anyone else find the logo unambiguously, rather than
      // guessing at an svg selector that also matches every icon in the chrome.
      data-logo={variant}
      className={cn('shrink-0', className)}
    >
      {/* The figures were clipped to the circle in the original artwork. */}
      <clipPath id={clipId}>
        <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {quadrants.map((q) => (
          <path key={q.fill} fill={q.fill} d={q.d} />
        ))}
        <path fill="#000" fillRule="evenodd" d={figurePath} />
      </g>

      {!isMark && (
        <>
          <path fill="currentColor" fillRule="evenodd" d={wordmarkPath} />
          {/* A shade lighter than the wordmark in the original; opacity carries
              that relationship into whatever colour currentColor resolves to. */}
          <path fill="currentColor" fillOpacity={0.78} fillRule="evenodd" d={subtitlePath} />
        </>
      )}
    </svg>
  )
}
