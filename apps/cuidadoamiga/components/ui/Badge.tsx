import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'rose' | 'pink' | 'violet' | 'emerald' | 'amber' | 'red' | 'orange'
  size?: 'sm' | 'md'
}

const toneStyles: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-surface-3 text-foreground-muted border-border',
  rose: 'bg-rose-700/10 text-rose-700 border-rose-700/30',
  pink: 'bg-pink-500/10 text-pink-600 border-pink-500/30',
  violet: 'bg-violet-600/10 text-violet-700 border-violet-600/30',
  emerald: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
  amber: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
  red: 'bg-red-500/10 text-red-700 border-red-500/30',
  orange: 'bg-orange-500/10 text-orange-700 border-orange-500/30',
}

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export function Badge({ tone = 'neutral', size = 'sm', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider border whitespace-nowrap',
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
