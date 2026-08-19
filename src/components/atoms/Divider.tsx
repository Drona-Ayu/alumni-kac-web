import { cn } from '@/lib/cn'

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-line border-0 border-t', className)} />
}
