import { cn } from '@/lib/utils'

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn('mx-auto h-px max-w-[1440px] bg-border opacity-30', className)} />
  )
}
