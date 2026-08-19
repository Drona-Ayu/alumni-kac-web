import type { Milestone } from '@/content/types'
import { Text } from '@/components/atoms/Text'

/**
 * The year sits on the rail, the entry beside it — proximity and alignment
 * doing the work a label would otherwise have to (§16 grouping & mapping).
 */
export function MilestoneItem({ milestone }: { milestone: Milestone }) {
  return (
    <li className="border-line relative grid gap-2 border-l pb-10 pl-6 last:pb-0 sm:grid-cols-[6rem_1fr] sm:gap-6 sm:pl-8">
      <span
        className="bg-brass absolute top-2 -left-[4.5px] h-2 w-2 rounded-full"
        aria-hidden="true"
      />
      <Text as="span" size="label" tone="brass" className="pt-1.5">
        {milestone.year}
      </Text>
      <div className="flex flex-col gap-1.5">
        <h3 className="t-h3">{milestone.title}</h3>
        <Text tone="muted" className="text-pretty">
          {milestone.body}
        </Text>
      </div>
    </li>
  )
}
