import { Link } from 'react-router-dom'
import type { Notice } from '@/content/types'
import { Badge } from '@/components/atoms/Badge'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { formatDate } from '@/lib/date'

export function NoticeItem({ notice }: { notice: Notice }) {
  return (
    <article className="border-line flex flex-col gap-2 border-b py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-3">
        <Text as="span" size="label" tone="faint">
          {formatDate(notice.date)}
        </Text>
        {notice.pinned ? <Badge tone="brass">Pinned</Badge> : null}
      </div>
      <h3 className="t-h3">{notice.title}</h3>
      <Text tone="muted" className="text-pretty">
        {notice.body}
      </Text>
      {notice.link ? (
        <Link
          to={notice.link.href}
          className="text-leaf inline-flex w-fit items-center gap-1.5 text-sm font-semibold no-underline hover:underline"
        >
          {notice.link.label}
          <Icon name="arrow-right" size={1} />
        </Link>
      ) : null}
    </article>
  )
}
