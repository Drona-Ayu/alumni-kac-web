import { cn } from '@/lib/cn'
import { asset } from '@/lib/asset'

type Props = {
  name: string
  photo?: string
  className?: string
}

function initials(name: string): string {
  return name
    .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * No photograph is a complete state, not a missing one — initials on the
 * association's own green read as intentional, which a grey silhouette does not.
 */
export function Avatar({ name, photo, className }: Props) {
  return (
    <div
      className={cn(
        'bg-leaf-soft text-leaf relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl',
        className,
      )}
    >
      {photo ? (
        <img
          src={asset(photo)}
          alt={`Portrait of ${name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-[-0.02em]"
        >
          {initials(name)}
        </span>
      )}
    </div>
  )
}
