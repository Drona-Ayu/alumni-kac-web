import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { site } from '@/content/site'
import { Icon } from '@/components/atoms/Icon'
import { IconButton } from '@/components/atoms/IconButton'
import { Container } from '@/components/atoms/Container'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { MobileNavSheet } from './MobileNavSheet'
import { useScrolledUnder } from '@/hooks/useScrolledUnder'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * Floating translucent chrome (§12). Content scrolls underneath it rather than
 * being pushed below an opaque strip, and the separation between the two is a
 * soft scroll edge that appears only once there is something to separate from.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledUnder()
  const reduced = usePrefersReducedMotion()
  const location = useLocation()

  // Route changes close the menu; the sheet animates itself out along the path
  // it came in on. Adjusted during render rather than in an effect, so the
  // closed state is committed in the same pass as the new route — an effect
  // would paint one frame with the menu still open over the new page.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'material-chrome scroll-edge fixed inset-x-0 top-0 z-80',
          'transition-shadow duration-200 ease-out',
        )}
        style={{ '--scroll-edge-opacity': scrolled ? 1 : 0 } as React.CSSProperties}
      >
        <Container width="wide">
          <div className="flex h-16 items-center justify-between gap-4 md:h-18">
            <Link
              to="/"
              className="text-ink flex items-center gap-2.5 no-underline"
              aria-label={`${site.shortName} — home`}
            >
              <span className="bg-leaf text-on-leaf flex h-9 w-9 items-center justify-center rounded-full">
                <Icon name="lotus" size={1.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-[-0.02em]">
                  {site.shortName}
                </span>
                <span className="text-ink-faint mt-0.5 hidden text-[0.6875rem] font-medium tracking-[0.04em] sm:block">
                  Alumni Association
                </span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {site.nav.map((item) => (
                  <li key={item.to} className="relative">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'relative block rounded-full px-3.5 py-2 text-sm font-semibold no-underline',
                          'transition-colors duration-150 ease-out',
                          isActive ? 'text-leaf' : 'text-ink-muted hover:text-ink',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive ? (
                            /* One pill that travels between items rather than
                               fading out here and in over there — the movement
                               is what tells you the two are the same thing. */
                            <motion.span
                              layoutId="nav-active"
                              aria-hidden="true"
                              className="bg-leaf-soft absolute inset-0 rounded-full"
                              transition={reduced ? crossFade : springs.move}
                            />
                          ) : null}
                          <span className="relative">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <span className="md:hidden">
                <IconButton
                  label={menuOpen ? 'Close menu' : 'Open menu'}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <Icon name={menuOpen ? 'close' : 'menu'} />
                </IconButton>
              </span>
            </div>
          </div>
        </Container>
      </header>

      <MobileNavSheet open={menuOpen} onClose={() => setMenuOpen(false)} items={site.nav} />
    </>
  )
}
