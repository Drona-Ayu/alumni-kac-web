import type { ReactNode } from 'react'

/** Present to assistive technology, absent from the visual layout. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}
