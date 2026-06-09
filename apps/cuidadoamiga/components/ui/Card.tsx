import { clsx } from 'clsx'
import { forwardRef, type HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'inset' | 'outlined'
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-surface border border-border shadow-sm',
  inset: 'bg-surface-2 border border-border',
  outlined: 'bg-transparent border border-border',
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('rounded-xl', variantStyles[variant], paddingStyles[padding], className)}
      {...rest}
    >
      {children}
    </div>
  )
})
