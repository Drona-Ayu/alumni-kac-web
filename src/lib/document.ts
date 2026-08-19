import { useEffect } from 'react'
import { site } from '@/content/site'

/**
 * Set the document title and description per page. A static SPA has no server
 * rendering, so this is what makes a shared link say where it points.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.shortName}` : `${site.shortName} — ${site.name}`
    if (!description) return
    const tag = document.querySelector('meta[name="description"]')
    const previous = tag?.getAttribute('content')
    tag?.setAttribute('content', description)
    return () => {
      if (previous != null) tag?.setAttribute('content', previous)
    }
  }, [title, description])
}
