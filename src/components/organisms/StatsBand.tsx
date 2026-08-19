import { about } from '@/content/about'
import { Container } from '@/components/atoms/Container'
import { StatTile } from '@/components/molecules/StatTile'
import { Reveal } from '@/components/molecules/Reveal'

export function StatsBand() {
  return (
    /* Separated by tone, not by rules. Two hairlines around a band with no
       surface of its own left the spacing at the mercy of whichever section
       preceded it — 29px of air on one page, 127px on another. */
    <div className="bg-sunken">
      <Container>
        <dl className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 sm:py-14">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.04}>
              <StatTile stat={stat} />
            </Reveal>
          ))}
        </dl>
      </Container>
    </div>
  )
}
