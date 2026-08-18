import { about } from '@/content/about'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { MilestoneItem } from '@/components/molecules/MilestoneItem'
import { Reveal } from '@/components/molecules/Reveal'
import { StatsBand } from '@/components/organisms/StatsBand'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function About() {
  usePageMeta(
    'About',
    `About ${site.name} (${site.shortName}), the alumni association of ${site.institution}.`,
  )

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`${site.shortName} — ${site.name}`}
        lede={`Registered under number ${site.registrationNumber}, and open to every graduate of ${site.institution}.`}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal className="flex flex-col gap-5">
              {about.intro.map((para) => (
                <Text key={para.slice(0, 24)} size="lead" className="max-w-prose text-pretty">
                  {para}
                </Text>
              ))}
            </Reveal>

            <Reveal delay={0.06} className="flex flex-col gap-6">
              <div className="bg-leaf text-on-leaf shadow-panel rounded-3xl p-7">
                <Text as="p" size="label" className="text-on-leaf/70">
                  Mission
                </Text>
                <p className="t-h3 mt-3 text-balance">{about.mission}</p>
              </div>
              <div className="border-line bg-surface rounded-3xl border p-7">
                <Text as="p" size="label" tone="brass">
                  Vision
                </Text>
                <p className="t-h3 text-ink mt-3 text-balance">{about.vision}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <StatsBand />

      <Section aria-labelledby="objectives">
        <Container>
          <SectionHeader
            id="objectives"
            eyebrow="What we do"
            title="Our objectives"
            lede="The work the association has set itself, as adopted by the general body."
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.objectives.map((objective, i) => (
              <li key={objective.title}>
                <Reveal delay={Math.min(i, 5) * 0.04}>
                  <div className="border-line bg-surface flex h-full flex-col gap-3 rounded-3xl border p-6">
                    <span className="bg-brass-soft text-brass flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="t-h3">{objective.title}</h3>
                    <Text size="small" tone="muted" className="text-pretty">
                      {objective.body}
                    </Text>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="milestones">
        <Container>
          <SectionHeader
            id="milestones"
            eyebrow="Timeline"
            title="How we got here"
            className="mb-12"
          />
          <ol className="max-w-3xl">
            {about.milestones.map((milestone) => (
              <MilestoneItem key={milestone.year + milestone.title} milestone={milestone} />
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="college">
        <Container width="prose">
          <Reveal className="flex flex-col gap-5">
            <Text as="p" size="label" tone="brass">
              The college
            </Text>
            <Heading id="college" size="h2" className="text-balance">
              {about.college.heading}
            </Heading>
            {about.college.body.map((para) => (
              <Text key={para.slice(0, 24)} tone="muted" className="text-pretty">
                {para}
              </Text>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
