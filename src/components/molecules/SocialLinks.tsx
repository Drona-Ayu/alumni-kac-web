import type { SocialLink } from '@/content/types'
import { Icon } from '@/components/atoms/Icon'
import { usePressable } from '@/hooks/usePressable'
import { cn } from '@/lib/cn'

function SocialButton({ link }: { link: SocialLink }) {
  const { pressed, pressHandlers } = usePressable()
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={link.label}
      className={cn(
        'border-line text-ink-muted hover:text-leaf hover:border-leaf inline-flex h-11 w-11 items-center justify-center rounded-full border',
        'transition-[scale,color,border-color] duration-100 ease-out motion-reduce:transition-none',
        pressed ? 'scale-[0.92]' : 'scale-100',
      )}
      {...pressHandlers}
    >
      <Icon name={link.icon} />
    </a>
  )
}

export function SocialLinks({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.href + link.label}>
          <SocialButton link={link} />
        </li>
      ))}
    </ul>
  )
}
