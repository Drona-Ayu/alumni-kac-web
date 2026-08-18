import { Container } from '@/components/atoms/Container'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { site } from '@/content/site'
import { usePageMeta } from '@/lib/document'

/**
 * A dead end still has to answer "where can I go from here" (§16 wayfinding),
 * so this offers the whole map rather than a single "go home".
 */
export function NotFound({ title = 'We could not find that page' }: { title?: string }) {
  usePageMeta('Not found')

  return (
    <Container width="prose">
      <div className="flex flex-col items-start gap-5 py-40">
        <Text as="p" size="label" tone="brass">
          404
        </Text>
        <Heading as="h1" size="h1">
          {title}
        </Heading>
        <Text size="lead" tone="muted" className="text-pretty">
          The link may be old, or the page may have moved. Everything on the site is one of these:
        </Text>
        <ul className="flex flex-wrap gap-2 pt-2">
          {site.nav.map((item) => (
            <li key={item.to}>
              <Button to={item.to} variant="secondary">
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <Button to="/">Back to the home page</Button>
        </div>
      </div>
    </Container>
  )
}
