import { useMemo, useState } from 'react'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Button } from '@/components/atoms/Button'
import { Field, FieldRow } from '@/components/atoms/Field'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { ContactRow } from '@/components/molecules/ContactRow'
import { SocialLinks } from '@/components/molecules/SocialLinks'

type Errors = { name?: string; email?: string; message?: string }

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us who is writing.'
  if (!values.email.trim()) errors.email = 'We need an address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'That does not look like an email address.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two, so we can help.'
  return errors
}

/**
 * A static site has no server to post to, so the form composes a mail message
 * and hands it to the reader's own mail client. That is stated plainly on the
 * button rather than discovered after pressing it — §16.3, no surprises about
 * where someone's words are going.
 */
export function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const errors = useMemo(() => validate(values), [values])
  const showError = (field: keyof Errors) => (touched[field] ? errors[field] : undefined)
  const valid = Object.keys(errors).length === 0

  const mailto = useMemo(() => {
    const subject = values.subject.trim() || `Message from ${values.name.trim() || 'an alumnus'}`
    const body = `${values.message}\n\n—\n${values.name}\n${values.email}`
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [values])

  return (
    <Container>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <ContactRow icon="mail" label="Email">
              <a href={`mailto:${site.contact.email}`} className="hover:text-leaf break-words">
                {site.contact.email}
              </a>
            </ContactRow>
            <ContactRow icon="phone" label="Phone">
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="hover:text-leaf">
                {site.contact.phone}
              </a>
            </ContactRow>
            <ContactRow icon="pin" label="Address">
              <address className="not-italic">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {site.contact.mapUrl ? (
                <a
                  href={site.contact.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-leaf mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
                >
                  Open in maps
                  <Icon name="external" size={0.95} />
                </a>
              ) : null}
            </ContactRow>
          </div>

          <div className="flex flex-col gap-3">
            <Text as="p" size="label" tone="faint">
              Elsewhere
            </Text>
            <SocialLinks links={site.socials} />
          </div>
        </div>

        <form
          className="border-line bg-surface flex flex-col gap-5 rounded-3xl border p-6 sm:p-8"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <FieldRow>
            <Field
              label="Your name"
              required
              value={values.name}
              autoComplete="name"
              onChange={(name) => setValues((v) => ({ ...v, name }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              error={showError('name')}
            />
            <Field
              label="Email"
              type="email"
              required
              value={values.email}
              autoComplete="email"
              onChange={(email) => setValues((v) => ({ ...v, email }))}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={showError('email')}
            />
          </FieldRow>

          <Field
            label="Subject"
            value={values.subject}
            placeholder="Membership, an event, something else"
            onChange={(subject) => setValues((v) => ({ ...v, subject }))}
          />

          <Field
            as="textarea"
            label="Message"
            required
            value={values.message}
            onChange={(message) => setValues((v) => ({ ...v, message }))}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            error={showError('message')}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {valid ? (
              <Button href={mailto} size="lg">
                Open in your mail app
                <Icon name="arrow-right" size={1.1} />
              </Button>
            ) : (
              /* Not disabled: a dead control tells you nothing about why.
                 Pressing it reveals what still needs filling in. */
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setTouched({ name: true, email: true, message: true })}
              >
                Open in your mail app
              </Button>
            )}
            <Text size="small" tone="faint" className="max-w-xs text-pretty">
              This opens a pre-filled message in your own mail app — nothing is sent from this page.
            </Text>
          </div>
        </form>
      </div>
    </Container>
  )
}
