'use client'

import type { UiDatePicker } from '@/lib/content-types'

interface DateRangePickerProps {
  year: number | undefined
  onYearChange: (year: number | undefined) => void
  ui: UiDatePicker
  /** Range of years to show, default 2015-current. */
  startYear?: number
  className?: string
}

/**
 * Year-only date picker. Sufficient for Cuidado Amiga's data (cases have
 * date precision to day, but filtering by year + manual navigation is the
 * primary use case). For date-range filtering, extend with month later.
 */
export function DateRangePicker({ year, onYearChange, ui, startYear = 2015, className = '' }: DateRangePickerProps) {
  const currentYear = new Date().getFullYear()
  const years: number[] = []
  for (let y = currentYear; y >= startYear; y--) years.push(y)

  return (
    <div className={className}>
      <select
        value={year ?? ''}
        onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        aria-label={ui.year}
        className="px-3 py-1.5 text-sm rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
      >
        <option value="">{ui.allYears}</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  )
}
