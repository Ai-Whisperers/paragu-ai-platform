'use client'

import type { ReactNode } from 'react'
import type { UiFilter } from '@/lib/content-types'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  children?: ReactNode
  ui: UiFilter
  /** Set to true when at least one filter is active. Shows a clear-all button. */
  hasActiveFilters?: boolean
  onClearAll?: () => void
  className?: string
}

/**
 * Compound filter bar. Renders children (Select/input elements) in a
 * wrapping row, plus an optional clear-all button when filters are active.
 *
 * Usage:
 * ```tsx
 * <FilterBar ui={site.ui.filter} hasActiveFilters={!!pais} onClearAll={clear}>
 *   <Select options={countries} value={pais} onChange={...} />
 *   <Select options={types} value={tipo} onChange={...} />
 * </FilterBar>
 * ```
 */
export function FilterBar({ children, ui, hasActiveFilters = false, onClearAll, className = '' }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="group" aria-label={ui.label}>
      {children}
      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-xs text-rose-600 dark:text-rose-400 hover:underline whitespace-nowrap"
        >
          {ui.clearAll}
        </button>
      )}
    </div>
  )
}

// ── Filter Select ────────────────────────────────────────────────────────

interface FilterSelectProps {
  options: FilterOption[]
  value: string | undefined
  onChange: (value: string | undefined) => void
  placeholder: string
  allLabel?: string
  className?: string
}

export function FilterSelect({ options, value, onChange, placeholder, allLabel, className = '' }: FilterSelectProps) {
  const resolvedAll = allLabel ?? placeholder

  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || undefined)}
      aria-label={placeholder}
      className={`px-3 py-1.5 text-sm rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent ${className}`}
    >
      <option value="">{resolvedAll}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
