import { Link } from 'react-router-dom'
import { home } from '@/content/home'
import type { QuickLink } from '@/content/types'
import { Container } from '@/components/atoms/Container'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { usePressable } from '@/hooks/usePressable'
import { cn } from '@/lib/cn'

function Tile({ link }: { link: QuickLink }) {
  const { pressed, pressHandlers } = usePressable()

  return (
    <Link
      to={link.to}
      className={cn(
        'border-line bg-surface flex h-full flex-col items-center gap-2.5 rounded-2xl border px-4 py-6 text-center no-underline',
        'shadow-chip transition-[scale,border-color] duration-100 ease-out motion-reduce:transition-none',
        'hover:border-leaf',
        pressed ? 'scale-[0.97]' : 'scale-100',
      )}
      {...pressHandlers}
    >
      <span className="bg-leaf-soft text-leaf flex h-11 w-11 items-center justify-center rounded-full">
        <Icon name={link.icon} size={1.35} />
      </span>
      <span className="t-body text-ink font-semibold">{link.label}</span>
      <Text size="small" tone="muted" className="text-pretty">
        {link.description}
      </Text>
    </Link>
  )
}

/**
 * The row of destinations directly under the hero — the first question a
 * visitor has is "where do I go", and this answers it without making them
 * read the nav (§16 wayfinding).
 *
 * It sits half over the hero on wider screens, so the page begins before the
 * fold ends rather than after a full screen of photograph.
 */
export function QuickLinks() {
  return (
    /* Pulled up over the hero, but with its own room underneath: the tiles
       used to end exactly where the next section began, which only became
       visible once that section gained a background of its own. */
    <div className="relative z-10 -mt-10 pb-16 sm:-mt-14 sm:pb-20 lg:pb-24">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {home.quickLinks.map((link) => (
            <li key={link.to} className="flex">
              <div className="w-full">
                <Tile link={link} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}
