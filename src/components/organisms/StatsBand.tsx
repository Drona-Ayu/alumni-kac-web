import { about } from '@/content/about'
import { Container } from '@/components/atoms/Container'
import { StatTile } from '@/components/molecules/StatTile'
import { Reveal } from '@/components/molecules/Reveal'

export function StatsBand() {
  return (
    <div className="border-line border-y">
      <Container>
        <dl className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4 sm:py-12">
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
