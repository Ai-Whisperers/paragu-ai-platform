'use client'

import { type ChangeEvent, useCallback, useRef } from 'react'
import type { UiSearch } from '@/lib/content-types'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  ui: UiSearch
  className?: string
  /** Called on mount if the input gets focus (Cmd+K shortcut). */
  inputRef?: React.RefObject<HTMLInputElement>
}

export function SearchInput({ value, onChange, ui, className = '', inputRef }: SearchInputProps) {
  const internalRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? internalRef

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  )

  const handleClear = useCallback(() => {
    onChange('')
    internalRef.current?.focus()
  }, [onChange])

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={ui.placeholder}
        aria-label={ui.placeholder}
        className="w-full pl-10 pr-8 py-2 rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-colors"
      />

      {value && (
        <button
          onClick={handleClear}
          aria-label={ui.clearButton}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
