import { useState } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/asset'

type Props = {
  src: string
  alt: string
  /** CSS aspect-ratio, e.g. '3/2'. Reserves the box so nothing reflows. */
  ratio?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

/**
 * An image that never shifts the layout: the box is reserved by aspect-ratio
 * before the file arrives, and the picture fades up once it has decoded rather
 * than snapping in. A jumping layout is the most visible kind of carelessness
 * (§16.7), and it is entirely avoidable.
 */
export function Img({ src, alt, ratio = '3/2', className, imgClassName, priority }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn('bg-sunken relative overflow-hidden', className)}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={asset(src)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover',
          'transition-opacity duration-500 ease-out motion-reduce:transition-none',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
