import type { Person } from '@/content/types'
import { Container } from '@/components/atoms/Container'
import { PersonCard } from '@/components/molecules/PersonCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Reveal } from '@/components/molecules/Reveal'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  lede?: string
  people: Person[]
  /** Office bearers get more room than the wider executive list. */
  density?: 'roomy' | 'compact'
}

export function CommitteeGrid({ id, eyebrow, title, lede, people, density = 'roomy' }: Props) {
  return (
    <Container>
      <SectionHeader id={id} eyebrow={eyebrow} title={title} lede={lede} className="mb-10" />
      <ul
        className={
          density === 'roomy'
            ? 'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5'
            : 'grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'
        }
      >
        {people.map((person, i) => (
          <li key={person.name + person.role}>
            <Reveal delay={Math.min(i, 7) * 0.03}>
              <PersonCard person={person} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  )
}
