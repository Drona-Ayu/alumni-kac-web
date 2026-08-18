/**
 * The first thing in the tab order. Invisible until focused, then it lands as
 * real chrome rather than appearing from nowhere.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="material-chrome text-ink focus-visible:ring-leaf shadow-panel sr-only rounded-xl px-4 py-2 text-sm font-semibold focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-100"
    >
      Skip to content
    </a>
  )
}
