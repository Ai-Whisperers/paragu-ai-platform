import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'rose' | 'green' | 'amber' | 'blue' | 'neutral'
  size?: 'sm' | 'md'
  onClose?: () => void
  className?: string
}

const VARIANT_STYLES: Record<string, string> = {
  default: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
}

const SIZE_STYLES: Record<string, string> = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-0.5',
}

/**
 * Small colored tag/label. Used for case types, judicial states, etc.
 */
export function Tag({ children, variant = 'default', size = 'sm', onClose, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          ✕
        </button>
      )}
    </span>
  )
}
