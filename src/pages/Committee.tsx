import { committee } from '@/content/committee'
import { site } from '@/content/site'
import { Section } from '@/components/atoms/Section'
import { Container } from '@/components/atoms/Container'
import { Text } from '@/components/atoms/Text'
import { CommitteeGrid } from '@/components/organisms/CommitteeGrid'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function Committee() {
  usePageMeta(
    'Committee',
    `Office bearers and executive committee of ${site.name} for ${committee.term}.`,
  )

  return (
    <>
      <PageHeader
        eyebrow="Committee"
        title="Who runs the association"
        lede={`The executive committee for the ${committee.term} term, elected by the general body.`}
      />

      <Section aria-labelledby="office-bearers">
        <CommitteeGrid
          id="office-bearers"
          eyebrow="Office bearers"
          title="Office bearers"
          people={committee.officeBearers}
        />
      </Section>

      <Section tone="sunken" aria-labelledby="executive">
        <CommitteeGrid
          id="executive"
          eyebrow="Executive committee"
          title="Executive committee members"
          people={committee.executiveMembers}
          density="compact"
        />
      </Section>

      {committee.note ? (
        <Container width="prose">
          <Text size="small" tone="faint" className="py-10 text-center text-pretty">
            {committee.note}
          </Text>
        </Container>
      ) : null}
    </>
  )
}
