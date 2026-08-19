import { useTheme } from '@/hooks/useTheme'
import { Icon, type IconName } from '@/components/atoms/Icon'
import { IconButton } from '@/components/atoms/IconButton'

const NEXT = { system: 'light', light: 'dark', dark: 'system' } as const
const ICON: Record<'system' | 'light' | 'dark', IconName> = {
  system: 'auto',
  light: 'sun',
  dark: 'moon',
}
const NAME = { system: 'system setting', light: 'light', dark: 'dark' } as const

/**
 * Agency (§16.2): appearance is the reader's choice, and "follow the system"
 * remains one of the three states rather than something you can only get back
 * to by clearing site data.
 */
export function ThemeToggle() {
  const { choice, cycle } = useTheme()
  return (
    <IconButton
      label={`Appearance: ${NAME[choice]}. Switch to ${NAME[NEXT[choice]]}.`}
      onClick={cycle}
    >
      <Icon name={ICON[choice]} />
    </IconButton>
  )
}
