import { site } from '@/content/site'
import { Section } from '@/components/atoms/Section'
import { ContactSection } from '@/components/organisms/ContactSection'
import { PageHeader } from './PageHeader'
import { usePageMeta } from '@/lib/document'

export function Contact() {
  usePageMeta('Contact', `How to reach ${site.name} at ${site.institution}.`)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="For membership, events, or anything the committee can help with."
      />
      <Section>
        <ContactSection />
      </Section>
    </>
  )
}
