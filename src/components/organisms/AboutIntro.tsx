import { about } from '@/content/about'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { Reveal } from '@/components/molecules/Reveal'

export function AboutIntro() {
  return (
    <Section aria-labelledby="about-intro">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <Text as="p" size="label" tone="brass">
              Who we are
            </Text>
            <Heading id="about-intro" size="h1">
              An association for every batch that has passed through Pariyaram
            </Heading>
            {about.intro.map((para) => (
              <Text key={para.slice(0, 24)} tone="muted" className="max-w-prose text-pretty">
                {para}
              </Text>
            ))}
            <div className="mt-2">
              <Button to="/about" variant="secondary">
                More about {site.shortName}
                <Icon name="arrow-right" size={1} />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col gap-6">
            <div className="bg-leaf text-on-leaf shadow-panel rounded-3xl p-7 sm:p-9">
              <Text as="p" size="label" className="text-on-leaf/70">
                Mission
              </Text>
              <p className="t-h3 mt-3 text-balance">{about.mission}</p>
            </div>
            <div className="border-line bg-surface rounded-3xl border p-7 sm:p-9">
              <Text as="p" size="label" tone="brass">
                Vision
              </Text>
              <p className="t-h3 text-ink mt-3 text-balance">{about.vision}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
