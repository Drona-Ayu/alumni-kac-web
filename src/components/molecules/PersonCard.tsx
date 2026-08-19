import type { Person } from '@/content/types'
import { Avatar } from '@/components/atoms/Avatar'
import { Text } from '@/components/atoms/Text'

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="flex flex-col gap-3">
      <Avatar name={person.name} photo={person.photo} />
      <div className="flex flex-col gap-0.5">
        <h3 className="t-body text-ink font-semibold">{person.name}</h3>
        <Text size="small" tone="leaf" className="font-medium">
          {person.role}
        </Text>
        {person.batch || person.place ? (
          <Text size="small" tone="faint">
            {[person.batch, person.place].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </div>
    </article>
  )
}
