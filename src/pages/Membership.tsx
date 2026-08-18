import { membership } from '@/content/membership'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Reveal } from '@/components/molecules/Reveal'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function Membership() {
  usePageMeta('Membership', `How to join ${site.name} — eligibility, fees and the steps to enrol.`)

  return (
    <>
      <PageHeader eyebrow="Membership" title="Join the association" lede={membership.intro}>
        <div className="mt-4 flex flex-wrap gap-3">
          {membership.formUrl ? (
            <Button href={membership.formUrl} size="lg">
              Open the membership form
              <Icon name="external" size={1.05} />
            </Button>
          ) : (
            /* No live form yet — say so, and give the reader the route that
               does work rather than a button that goes nowhere. */
            <Button to="/contact" size="lg">
              Write to the secretary
              <Icon name="arrow-right" size={1.1} />
            </Button>
          )}
        </div>
      </PageHeader>

      <Section aria-labelledby="eligibility">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <Reveal className="flex flex-col gap-5">
              <Text as="p" size="label" tone="brass">
                Who can join
              </Text>
              <h2 id="eligibility" className="t-h2">
                Eligibility
              </h2>
              <ul className="flex flex-col gap-3">
                {membership.eligibility.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="bg-leaf-soft text-leaf mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      <Icon name="check" size={0.85} />
                    </span>
                    <Text tone="muted" className="text-pretty">
                      {line}
                    </Text>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="grid gap-5 sm:grid-cols-2">
                {membership.benefits.map((benefit) => (
                  <li
                    key={benefit.title}
                    className="border-line bg-surface flex flex-col gap-2 rounded-3xl border p-6"
                  >
                    <h3 className="t-h3">{benefit.title}</h3>
                    <Text size="small" tone="muted" className="text-pretty">
                      {benefit.body}
                    </Text>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="fees">
        <Container>
          <SectionHeader
            id="fees"
            eyebrow="Fees"
            title="Membership types"
            lede="As approved by the general body."
            className="mb-10"
          />
          <ul className="grid gap-5 sm:grid-cols-3">
            {membership.tiers.map((tier, i) => (
              <li key={tier.name}>
                <Reveal delay={i * 0.04}>
                  <div className="border-line bg-surface flex h-full flex-col gap-2 rounded-3xl border p-7">
                    <Text as="p" size="label" tone="faint">
                      {tier.name}
                    </Text>
                    <p className="font-display text-leaf text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-semibold tracking-[-0.02em]">
                      {tier.fee}
                    </p>
                    <Text size="small" tone="muted" className="text-pretty">
                      {tier.note}
                    </Text>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="steps">
        <Container>
          <SectionHeader id="steps" eyebrow="How to enrol" title="Three steps" className="mb-10" />
          <ol className="grid gap-6 sm:grid-cols-3">
            {membership.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.05} className="flex flex-col gap-3">
                  <span className="bg-leaf text-on-leaf flex h-10 w-10 items-center justify-center rounded-full font-semibold tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="t-h3">{step.title}</h3>
                  <Text size="small" tone="muted" className="text-pretty">
                    {step.body}
                  </Text>
                </Reveal>
              </li>
            ))}
          </ol>

          {membership.bankDetails && membership.bankDetails.length > 0 ? (
            <Reveal delay={0.1} className="mt-12">
              <div className="border-line bg-surface max-w-2xl rounded-3xl border p-7">
                <Text as="p" size="label" tone="brass" className="mb-5">
                  Where to pay
                </Text>
                <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {membership.bankDetails.map((detail) => (
                    <div key={detail.label} className="flex flex-col gap-0.5">
                      <dt className="t-small text-ink-faint">{detail.label}</dt>
                      <dd className="t-body text-ink font-medium">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
