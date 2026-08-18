import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BaseProps = {
  label: string
  hint?: string
  /** Validation message. Shown inline, as you go — never saved for submit. */
  error?: string
  required?: boolean
  children?: never
}

type InputProps = BaseProps & {
  as?: 'input'
  type?: 'text' | 'email' | 'tel'
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  autoComplete?: string
  placeholder?: string
}

type TextareaProps = BaseProps & {
  as: 'textarea'
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  rows?: number
  placeholder?: string
}

const CONTROL =
  'w-full rounded-2xl border bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-faint transition-colors duration-150 ease-out'

/**
 * Label, control, hint and error as one unit. §16: validate inline so a problem
 * is reported where and when it happens, not collected up and delivered as a
 * list after the reader thought they were finished.
 */
export function Field(props: InputProps | TextareaProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const invalid = Boolean(props.error)

  const describedBy = [props.hint ? hintId : null, invalid ? errorId : null]
    .filter(Boolean)
    .join(' ')

  const shared = {
    id,
    value: props.value,
    onBlur: props.onBlur,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy || undefined,
    required: props.required,
    placeholder: props.placeholder,
    className: cn(CONTROL, invalid ? 'border-brass' : 'border-line-strong focus:border-leaf'),
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-small text-ink font-semibold">
        {props.label}
        {props.required ? (
          <span className="text-brass" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="text-ink-faint font-normal"> (optional)</span>
        )}
      </label>

      {props.as === 'textarea' ? (
        <textarea
          {...shared}
          rows={props.rows ?? 5}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={props.type ?? 'text'}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}

      {props.hint ? (
        <p id={hintId} className="t-small text-ink-muted">
          {props.hint}
        </p>
      ) : null}

      {invalid ? (
        <p id={errorId} className="t-small text-brass font-medium">
          {props.error}
        </p>
      ) : null}
    </div>
  )
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>
}
