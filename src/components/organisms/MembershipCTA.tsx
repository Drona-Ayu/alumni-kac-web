import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Icon } from '@/components/atoms/Icon'
import { Reveal } from '@/components/molecules/Reveal'
import { membership } from '@/content/membership'

export function MembershipCTA() {
  return (
    <Section aria-labelledby="join">
      <Container>
        <Reveal>
          <div className="bg-leaf text-on-leaf shadow-panel relative overflow-hidden rounded-[2rem] px-7 py-14 sm:px-14 sm:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/8 blur-2xl"
            />
            <div className="relative flex max-w-2xl flex-col gap-5">
              <Text as="p" size="label" className="text-on-leaf/70">
                Membership
              </Text>
              <Heading id="join" size="h1" className="text-on-leaf text-balance">
                Get on the register
              </Heading>
              <Text size="lead" className="text-on-leaf/85 text-pretty">
                {membership.intro}
              </Text>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button to="/membership" size="lg" variant="secondary">
                  How to join
                  <Icon name="arrow-right" size={1.1} />
                </Button>
                <Button
                  to="/contact"
                  size="lg"
                  variant="ghost"
                  className="text-on-leaf hover:bg-white/12"
                >
                  Ask a question
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
