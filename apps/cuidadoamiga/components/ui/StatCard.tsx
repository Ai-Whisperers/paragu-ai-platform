'use client'

import type { UiStatCards } from '@/lib/content-types'

interface StatCardProps {
  value: string | number
  label: string
  trend?: string
  trendDirection?: 'up' | 'down' | 'flat'
  ui?: UiStatCards // Optional: only needed if trend is provided
  className?: string
}

/**
 * Single stat card: value + label + optional trend indicator.
 */
export function StatCard({ value, label, trend, trendDirection, className = '' }: StatCardProps) {
  const trendColor = trendDirection === 'up'
    ? 'text-red-500' // Up in femicide context is BAD, highlight in red
    : trendDirection === 'down'
      ? 'text-green-500'
      : 'text-neutral-400'

  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 ${className}`}>
      <div className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{label}</div>
      {trend && (
        <div className={`text-xs mt-1 ${trendColor}`}>
          {trend}
        </div>
      )}
    </div>
  )
}

/**
 * Grid of stat cards. 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
export function StatCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  )
}
