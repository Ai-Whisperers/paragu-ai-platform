'use client'

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>
  height?: number
  barGap?: number
  horizontal?: boolean
  className?: string
}

const DEFAULT_BAR_COLOR = '#e11d48'

/**
 * Pure SVG bar chart. Horizontal mode is the default (easier to read labels).
 * Pass horizontal=false for vertical bars. ~1.5KB. No recharts, no D3.
 */
export function BarChart({ data, height = 200, barGap = 4, horizontal = true, className = '' }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1)
  const padding = 8
  const labelWidth = 80

  if (horizontal) {
    const barHeight = (height - padding * 2 - (data.length - 1) * barGap) / data.length

    return (
      <div className={className}>
        <svg width="100%" height={height} viewBox={`0 0 ${labelWidth + 200} ${height}`} role="img">
          {data.map((d, i) => {
            const barWidth = (d.value / maxValue) * 200
            const y = padding + i * (barHeight + barGap)
            return (
              <g key={i}>
                <text
                  x={labelWidth - 4}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-neutral-600 dark:fill-neutral-400"
                  fontSize="11"
                >
                  {d.label}
                </text>
                <rect
                  x={labelWidth}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={d.color ?? DEFAULT_BAR_COLOR}
                  rx={3}
                  className="transition-all duration-500"
                />
                <text
                  x={labelWidth + barWidth + 4}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  className="fill-neutral-900 dark:fill-white"
                  fontSize="11"
                >
                  {d.value}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  // Vertical bars
  const colWidth = Math.max(20, (300 - padding * 2 - (data.length - 1) * barGap) / data.length)
  const chartBottom = 180 - 20

  return (
    <div className={className}>
      <svg width="100%" height={height} viewBox={`0 0 ${Math.max(data.length * (colWidth + barGap) + padding * 2, 100)} ${height}`} role="img">
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * (height - 40)
          const x = padding + i * (colWidth + barGap)
          const y = chartBottom - barHeight
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={colWidth}
                height={barHeight}
                fill={d.color ?? DEFAULT_BAR_COLOR}
                rx={2}
                className="transition-all duration-500"
              />
              <text
                x={x + colWidth / 2}
                y={chartBottom + 14}
                textAnchor="middle"
                className="fill-neutral-600 dark:fill-neutral-400"
                fontSize="9"
              >
                {d.label}
              </text>
              <text
                x={x + colWidth / 2}
                y={y - 4}
                textAnchor="middle"
                className="fill-neutral-900 dark:fill-white"
                fontSize="10"
              >
                {d.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
