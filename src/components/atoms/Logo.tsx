import { useId } from 'react'

import { cn } from '@/lib/cn'
import { figurePath, geometry, quadrants, wordmarkPath } from './logoPaths'

const { markSize, circle, wordmarkBox } = geometry

/**
 * How tall the wordmark stands relative to the roundel in the chrome lockup.
 *
 * The supplied artwork is a badge: a large roundel beside comparatively small
 * type, which is right on a letterhead and wrong in a 64px header — the
 * wordmark would land at about 9px and read as a smudge. Chrome therefore
 * composes the two parts at its own proportions, the way brands ship a
 * separate horizontal lockup for navigation. 0.58 puts the cap height at
 * roughly 15px against a 36px roundel.
 */
const WORDMARK_SCALE = 0.58

type Props = {
  /** `mark` is the roundel alone; `lockup` sets the wordmark beside it. */
  variant?: 'mark' | 'lockup'
  /** Roundel height in rem, so the logo scales with the reader's text size. */
  height?: number
  /**
   * Accessible name. Pass `null` inside an already-labelled link, otherwise
   * the name is announced twice.
   */
  title?: string | null
  className?: string
}

/** The roundel: four exact quadrants with the figures clipped to the circle. */
function Mark({ height, label }: { height: number; label?: string }) {
  // The logo appears more than once per page, and two elements sharing a DOM
  // id is invalid — so the clip gets a unique one.
  const clipId = useId()
  return (
    <svg
      viewBox={`0 0 ${markSize} ${markSize}`}
      height={`${height}rem`}
      width={`${height}rem`}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className="block shrink-0"
    >
      <clipPath id={clipId}>
        <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {quadrants.map((q) => (
          <path key={q.fill} fill={q.fill} d={q.d} />
        ))}
        {/* The two figures together form the K: mark + wordmark reads KhAyAL. */}
        <path fill="#000" fillRule="evenodd" d={figurePath} />
      </g>
    </svg>
  )
}

/**
 * The association's logo, inlined rather than fetched through an `<img>`.
 *
 * Inlining is what makes the wordmark theme-aware: it is filled with
 * `currentColor`, which cannot cross an `<img>` boundary. The roundel keeps its
 * true brand colours in every theme — a logo that restyles itself stops being
 * the logo — while the type follows the surrounding text colour, so the lockup
 * stays legible on parchment and on near-black alike.
 */
export function Logo({ variant = 'lockup', height = 2.25, title = 'KhAyAL', className }: Props) {
  if (variant === 'mark') {
    return (
      <span className={cn('inline-flex', className)}>
        <Mark height={height} label={title ?? undefined} />
      </span>
    )
  }

  return (
    <span
      className={cn('inline-flex items-center gap-2.5', className)}
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
    >
      <Mark height={height} />
      <svg
        viewBox={`${wordmarkBox.x} ${wordmarkBox.y} ${wordmarkBox.w} ${wordmarkBox.h}`}
        height={`${height * WORDMARK_SCALE}rem`}
        width={`${height * WORDMARK_SCALE * (wordmarkBox.w / wordmarkBox.h)}rem`}
        aria-hidden="true"
        focusable="false"
        className="block shrink-0"
      >
        <path fill="currentColor" fillRule="evenodd" d={wordmarkPath} />
      </svg>
    </span>
  )
}
