import { useState } from 'react'
import { cn } from '@/lib/cn'
import { asset, webpSrcSet } from '@/lib/asset'

type Props = {
  /** Canonical path, e.g. `/campus/campus-entrance.jpg`. */
  src: string
  alt: string
  /** CSS aspect-ratio, e.g. '3/2'. Reserves the box so nothing reflows. */
  ratio?: string
  /**
   * Widths of the WebP variants that exist beside `src`, by the convention
   * `name-{width}.webp`. Supplying these turns the element into a `<picture>`
   * that serves the smallest file the layout actually needs.
   */
  widths?: number[]
  /**
   * The `sizes` attribute — how wide this image renders at each breakpoint.
   * Without it the browser assumes 100vw and over-fetches on every phone.
   */
  sizes?: string
  className?: string
  imgClassName?: string
  /** Eager-load and decode synchronously. For the LCP image only. */
  priority?: boolean
  /** Focal point for the crop, e.g. 'center 30%'. */
  position?: string
}

/**
 * An image that never shifts the layout: the box is reserved by aspect-ratio
 * before the file arrives, and the picture fades up once it has decoded rather
 * than snapping in. A jumping layout is the most visible kind of carelessness
 * (§16.7), and it is entirely avoidable.
 *
 * With `widths`, it renders a `<picture>`: a WebP `<source>` carrying the
 * srcSet, and the original as the `<img>` fallback. `<picture>` rather than a
 * bare `srcSet` because a srcSet of WebP alone leaves a browser that
 * understands srcSet but not WebP with nothing it can use.
 */
export function Img({
  src,
  alt,
  ratio = '3/2',
  widths,
  sizes,
  className,
  imgClassName,
  priority,
  position,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  const imgClasses = cn(
    'h-full w-full object-cover',
    'transition-opacity duration-500 ease-out motion-reduce:transition-none',
    loaded ? 'opacity-100' : 'opacity-0',
    imgClassName,
  )

  const webpSet = webpSrcSet(src, widths)

  const img = (
    <img
      src={asset(src)}
      alt={alt}
      sizes={webpSet ? sizes : undefined}
      loading={priority ? 'eager' : 'lazy'}
      // The LCP image should not wait behind the decode queue.
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
      onLoad={() => setLoaded(true)}
      className={imgClasses}
      style={position ? { objectPosition: position } : undefined}
    />
  )

  return (
    <div
      className={cn('bg-sunken relative overflow-hidden', className)}
      style={{ aspectRatio: ratio }}
    >
      {webpSet ? (
        <picture>
          <source type="image/webp" srcSet={webpSet} sizes={sizes} />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  )
}
