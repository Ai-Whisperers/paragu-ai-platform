'use client'

import { useMemo } from 'react'

interface DonutChartProps {
  data: Array<{ label: string; value: number; color?: string }>
  size?: number
  innerRadius?: number
  className?: string
}

const COLORS = ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#e4e4e7', '#a1a1aa', '#71717a']

/**
 * Pure SVG donut chart. No recharts, no D3. ~2KB.
 * Data is sorted largest to smallest for visual clarity.
 * The center shows the total count.
 */
export function DonutChart({ data, size = 160, innerRadius = 48, className = '' }: DonutChartProps) {
  const sorted = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data])
  const total = sorted.reduce((s, d) => s + d.value, 0)

  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) - 4
  const circumference = 2 * Math.PI * r

  // Calculate stroke-dasharray and stroke-dashoffset for each segment
  const segments = useMemo(() => {
    const offsets = sorted.reduce<number[]>((acc, d, i) => {
      const prevOffset = i > 0 ? (acc[i - 1] ?? 0) : 0
      acc.push(prevOffset + (d.value / total) * circumference)
      return acc
    }, [])
    return sorted.map((d, i) => {
      const prevOffset = i > 0 ? (offsets[i - 1] ?? 0) : 0
      const ratio = d.value / total
      return {
        ...d,
        color: d.color || COLORS[i % COLORS.length],
        dashArray: `${ratio * circumference} ${(1 - ratio) * circumference}`,
        dashOffset: -prevOffset,
        ratio,
      }
    })
  }, [sorted, total, circumference])

  if (total === 0 || data.length === 0) return null

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={r - innerRadius}
            strokeDasharray={seg.dashArray}
            strokeDashoffset={seg.dashOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            className="transition-all duration-300"
          />
        ))}
        <circle cx={cx} cy={cy} r={innerRadius} fill="white" className="dark:fill-neutral-800" />
      </svg>
      <div className="absolute text-center pointer-events-none">
        <div className="text-lg font-bold text-neutral-900 dark:text-white">{total}</div>
        <div className="text-xs text-neutral-500">total</div>
      </div>
    </div>
  )
}

/**
 * Legend for the donut chart. Renders as a simple vertical list.
 */
export function DonutLegend({ data, colors = COLORS }: { data: Array<{ label: string; value: number }>; colors?: string[] }) {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const total = sorted.reduce((s, d) => s + d.value, 0)

  return (
    <ul className="space-y-1">
      {sorted.map((d, i) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
          <span className="text-neutral-600 dark:text-neutral-400 flex-1">{d.label}</span>
          <span className="text-neutral-900 dark:text-white font-medium">{d.value}</span>
          <span className="text-neutral-400 text-xs w-10 text-right">
            {total > 0 ? Math.round((d.value / total) * 100) : 0}%
          </span>
        </li>
      ))}
    </ul>
  )
}
