import type { GalleryImage } from '@/content/types'
import { Img } from '@/components/atoms/Img'
import { usePressable } from '@/hooks/usePressable'
import { cn } from '@/lib/cn'

type Props = {
  image: GalleryImage
  onOpen: () => void
  ratio?: string
}

export function GalleryTile({ image, onOpen, ratio = '4/3' }: Props) {
  const { pressed, pressHandlers } = usePressable()

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group relative block w-full overflow-hidden rounded-2xl',
        'transition-[scale] duration-100 ease-out motion-reduce:transition-none',
        pressed ? 'scale-[0.975]' : 'scale-100',
      )}
      {...pressHandlers}
    >
      <Img src={image.src} alt={image.alt} ratio={ratio} className="rounded-2xl" />
      {image.caption ? <span className="sr-only">{image.caption}</span> : null}
      <span
        aria-hidden="true"
        className="ring-line-strong pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset"
      />
    </button>
  )
}
