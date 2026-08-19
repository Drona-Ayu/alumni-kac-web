import { stories } from '@/content/stories'
import type { Story } from '@/content/types'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Avatar } from '@/components/atoms/Avatar'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Reveal } from '@/components/molecules/Reveal'

function StoryCard({ story }: { story: Story }) {
  return (
    <figure className="border-line bg-surface flex h-full flex-col gap-5 rounded-3xl border p-6 sm:p-7">
      <Icon name="quote" size={1.6} className="text-brass" />
      <blockquote className="t-body text-ink flex-1 text-pretty">{story.quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="w-12 shrink-0">
          <Avatar name={story.name} photo={story.photo} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="t-body text-ink font-semibold">{story.name}</span>
          <Text size="small" tone="muted">
            {[story.role, story.batch, story.place].filter(Boolean).join(' · ')}
          </Text>
        </div>
      </figcaption>
    </figure>
  )
}

export function StoriesBand() {
  if (stories.length === 0) return null

  return (
    <Section aria-labelledby="stories">
      <Container>
        <SectionHeader
          id="stories"
          eyebrow="Alumni stories"
          title="Where Pariyaram led"
          lede="Graduates on what the college gave them, and what the association has been good for since."
          className="mb-10"
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {stories.slice(0, 3).map((story, i) => (
            <li key={story.name} className="flex">
              <Reveal delay={i * 0.05} className="flex w-full">
                <div className="w-full">
                  <StoryCard story={story} />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
