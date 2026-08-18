import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { usePressable } from '@/hooks/usePressable'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

type Common = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Renders full width on narrow screens, auto from `sm` up. */
  block?: boolean
}

type Props =
  | (Common & { to: string; href?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { href: string; to?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & {
      to?: never
      href?: never
      onClick?: () => void
      type?: 'button' | 'submit'
      disabled?: boolean
    })

const VARIANT: Record<Variant, string> = {
  primary: 'bg-leaf text-on-leaf shadow-chip hover:bg-leaf-strong',
  secondary: 'bg-surface text-ink border border-line-strong shadow-chip hover:border-leaf',
  ghost: 'text-leaf hover:bg-leaf-soft',
}

const SIZE: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  block,
  ...rest
}: Props) {
  const { pressed, pressHandlers } = usePressable()

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'select-none no-underline',
    // The press response itself: instant, small, and on the way down (§1).
    // 100ms is the skill's value — long enough to read, short enough to feel
    // like the surface moved under the finger rather than replied to it.
    'transition-[scale,background-color,border-color] duration-100 ease-out',
    'motion-reduce:transition-none',
    pressed ? 'scale-[0.97]' : 'scale-100',
    VARIANT[variant],
    SIZE[size],
    block && 'w-full sm:w-auto',
    className,
  )

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={classes} {...pressHandlers}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    const external = /^https?:/.test(rest.href)
    return (
      <a
        href={rest.href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...pressHandlers}
      >
        {children}
      </a>
    )
  }

  const {
    onClick,
    type = 'button',
    disabled,
  } = rest as { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'cursor-not-allowed opacity-50')}
      {...pressHandlers}
    >
      {children}
    </button>
  )
}
