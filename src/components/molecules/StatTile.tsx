import type { Stat } from '@/content/types'
import { Text } from '@/components/atoms/Text'

export function StatTile({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-leaf text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.025em]">
        {stat.value}
      </span>
      <Text size="small" tone="muted">
        {stat.label}
      </Text>
    </div>
  )
}
