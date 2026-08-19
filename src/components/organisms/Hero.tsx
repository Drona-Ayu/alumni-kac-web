import { motion } from 'motion/react'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { Logo } from '@/components/atoms/Logo'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'
import { asset } from '@/lib/asset'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const enter = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: crossFade }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { ...springs.move, delay },
        }

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* The roundel itself, oversized and bled off the right edge. A still
          backdrop, not a moving one: a full-viewport animated field is exactly
          what §14 asks us not to build. overflow-hidden keeps the bleed from
          widening the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={asset('/brand/logo-mark.svg')}
          alt=""
          className="absolute -top-[30%] -right-[22%] h-[175%] w-auto opacity-[0.18] blur-[100px] dark:opacity-25"
        />
        <div className="from-canvas/0 via-canvas/50 to-canvas absolute inset-0 bg-gradient-to-b" />
      </div>

      <Container>
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.div {...enter(0)}>
            <span className="border-line bg-surface/70 text-ink-muted inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] backdrop-blur-sm">
              <Logo variant="mark" height={1.05} title={null} />
              Reg. No. {site.registrationNumber}
            </span>
          </motion.div>

          <motion.div {...enter(0.05)}>
            <Heading as="h1" size="display" className="text-balance">
              {site.name}
            </Heading>
          </motion.div>

          <motion.div {...enter(0.1)} className="flex flex-col gap-3">
            <Text size="lead" tone="muted" className="max-w-2xl text-pretty">
              {site.tagline} {site.shortName} is the alumni association of {site.institution}.
            </Text>
          </motion.div>

          <motion.div {...enter(0.15)} className="mt-2 flex flex-wrap gap-3">
            <Button to="/membership" size="lg">
              Join the association
              <Icon name="arrow-right" size={1.1} />
            </Button>
            <Button to="/events" size="lg" variant="secondary">
              See what&rsquo;s on
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
