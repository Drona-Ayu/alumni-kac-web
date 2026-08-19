import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

type Props = {
  icon: IconName
  label: string
  children: ReactNode
}

export function ContactRow({ icon, label, children }: Props) {
  return (
    <div className="flex items-start gap-4">
      <span className="bg-leaf-soft text-leaf mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Icon name={icon} />
      </span>
      <div className="flex flex-col gap-0.5">
        <Text as="span" size="label" tone="faint">
          {label}
        </Text>
        <div className="t-body text-ink">{children}</div>
      </div>
    </div>
  )
}
