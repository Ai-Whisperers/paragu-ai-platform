import type { UiLoading } from '@/lib/content-types'

interface LoadingSpinnerProps {
  ui?: UiLoading
  size?: 'sm' | 'md' | 'lg'
  inline?: boolean
  className?: string
}

const SIZE_STYLES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

/**
 * Accessible loading spinner. Use `inline` for in-button/inline loading
 * states; without `inline` for full-width loading blocks.
 */
export function LoadingSpinner({ ui, size = 'md', inline = false, className = '' }: LoadingSpinnerProps) {
  const spinner = (
    <svg
      className={`animate-spin ${SIZE_STYLES[size]} text-rose-600 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ui?.loading ?? 'Loading'}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )

  if (inline) return spinner

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      {spinner}
      {ui?.loading && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{ui.loading}</p>
      )}
    </div>
  )
}
