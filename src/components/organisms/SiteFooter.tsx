import { Link } from 'react-router-dom'
import { site } from '@/content/site'
import { Container } from '@/components/atoms/Container'
import { Logo } from '@/components/atoms/Logo'
import { Text } from '@/components/atoms/Text'
import { SocialLinks } from '@/components/molecules/SocialLinks'

export function SiteFooter() {
  return (
    <footer className="bg-sunken border-line mt-24 border-t">
      <Container width="wide">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            {/* The footer has room, so the subtitle lines actually read here. */}
            <Logo height={5.5} title={`${site.shortName} — ${site.name}`} />
            <Text size="small" tone="muted" className="max-w-sm text-pretty">
              {site.name} — the alumni association of {site.institution}.
            </Text>
            <Text size="small" tone="faint">
              Reg. No. {site.registrationNumber}
            </Text>
            <SocialLinks links={site.socials} />
          </div>

          <nav aria-label="Footer">
            <Text as="h2" size="label" tone="faint" className="mb-4">
              Pages
            </Text>
            <ul className="flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-ink-muted hover:text-leaf text-sm font-medium no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Text as="h2" size="label" tone="faint" className="mb-4">
              Reach us
            </Text>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-ink-muted hover:text-leaf text-sm font-medium break-words no-underline"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="text-ink-muted hover:text-leaf text-sm font-medium no-underline"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <Text size="small" tone="muted" className="max-w-56 text-pretty">
                  {site.contact.addressLines.slice(1).join(', ')}
                </Text>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-line flex flex-col gap-2 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <Text size="small" tone="faint">
            © {new Date().getFullYear()} {site.name}. Registered {site.established}.
          </Text>
          <Text size="small" tone="faint">
            {site.location}
          </Text>
        </div>
      </Container>
    </footer>
  )
}
