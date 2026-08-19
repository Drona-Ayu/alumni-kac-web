import { motion } from 'motion/react'
import { site } from '@/content/site'
import { home } from '@/content/home'
import { campusPhotos, photoWidths } from '@/content/photos'
import { Container } from '@/components/atoms/Container'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { Img } from '@/components/atoms/Img'
import { Logo } from '@/components/atoms/Logo'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { springs, crossFade } from '@/lib/motion'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const photo = campusPhotos[home.heroPhoto]

  const enter = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: crossFade }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { ...springs.move, delay },
        }

  return (
    <section className="relative isolate">
      {/* The photograph, full bleed. A still backdrop, not a moving one: a
          full-viewport animated field is exactly what §14 asks us not to
          build. */}
      <div className="absolute inset-0 -z-10">
        <Img
          src={photo.src}
          alt=""
          widths={photoWidths}
          sizes="100vw"
          // The LCP element: eager, high priority, decoded synchronously.
          priority
          position={photo.position}
          ratio="auto"
          className="h-full w-full"
        />
        {/* Two scrims, not one. The vertical gradient anchors the type to the
            bottom of the frame; the flat wash underneath guarantees the
            contrast floor even where the photograph is bright. Verified by
            sampling the rendered pixels, not by assuming. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/10" />
      </div>

      <Container>
        <div className="flex min-h-[32rem] max-w-3xl flex-col justify-end gap-6 pt-40 pb-16 sm:min-h-[38rem] sm:pt-48 sm:pb-24">
          <motion.div {...enter(0)}>
            {/* Dark backing, not light: measured against the rendered photo,
                a white-tinted chip left the white type at 3.3:1 over the
                brightest part of the frame. Darkening the backdrop is what
                buys the contrast — blur alone does not. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-white backdrop-blur-md">
              <Logo variant="mark" height={1.05} title={null} />
              Reg. No. {site.registrationNumber}
            </span>
          </motion.div>

          <motion.div {...enter(0.05)}>
            <Heading as="h1" size="display" className="text-balance text-white">
              {site.name}
            </Heading>
          </motion.div>

          <motion.p {...enter(0.1)} className="t-lead max-w-2xl text-pretty text-white/90">
            {site.tagline} {site.shortName} is the alumni association of {site.institution}.
          </motion.p>

          <motion.div {...enter(0.15)} className="mt-2 flex flex-wrap gap-3">
            <Button to="/membership" size="lg">
              Join the association
              <Icon name="arrow-right" size={1.1} />
            </Button>
            {/* Not `ghost`: a transparent button disappears over a photograph. */}
            <Button to="/events" size="lg" variant="secondary">
              See what&rsquo;s on
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
