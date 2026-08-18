import { sortedNotices } from '@/content/notices'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { NoticeItem } from '@/components/molecules/NoticeItem'
import { Reveal } from '@/components/molecules/Reveal'

export function NoticeBoard({ limit }: { limit?: number }) {
  const notices = limit ? sortedNotices().slice(0, limit) : sortedNotices()
  if (notices.length === 0) return null

  return (
    <Section tone="sunken" aria-labelledby="notices">
      <Container>
        <SectionHeader
          eyebrow="Noticeboard"
          id="notices"
          title="What needs your attention"
          lede="Announcements from the committee, newest first."
          className="mb-10"
        />
        <Reveal>
          <div className="border-line bg-surface rounded-3xl border px-6 py-2 sm:px-8">
            {notices.map((notice) => (
              <NoticeItem key={notice.title} notice={notice} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
