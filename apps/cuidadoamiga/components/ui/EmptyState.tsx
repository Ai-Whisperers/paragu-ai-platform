import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className,
      )}
    >
      {icon ? <div className="text-5xl mb-3 opacity-60" aria-hidden>{icon}</div> : null}
      <h3 className="text-base font-semibold text-foreground m-0">{title}</h3>
      {description ? (
        <p className="text-sm text-foreground-muted mt-1 max-w-md m-0">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
