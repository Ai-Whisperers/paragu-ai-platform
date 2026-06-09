'use client'

interface LineChartProps {
  data: Array<{ label: string; value: number }>
  height?: number
  color?: string
  className?: string
  /** Show dots at each data point. */
  showDots?: boolean
}

const LINE_COLOR = '#e11d48'

/**
 * Pure SVG line chart. Single-series, time-series style.
 * X-axis labels are the data labels (years). ~1KB. No recharts, no D3.
 */
export function LineChart({ data, height = 200, color = LINE_COLOR, className = '', showDots = true }: LineChartProps) {
  if (data.length < 2) return null

  const maxValue = Math.max(...data.map(d => d.value), 1)
  const pad = { top: 16, right: 8, bottom: 24, left: 8 }
  const chartW = 300 - pad.left - pad.right
  const chartH = height - pad.top - pad.bottom

  const xScale = (_: number, i: number) => pad.left + (i / (data.length - 1)) * chartW
  const yScale = (v: number) => pad.top + chartH - (v / maxValue) * chartH

  // Build the path
  const pathD = data.map((d, i) =>
    `${i === 0 ? 'M' : 'L'}${xScale(0, i)},${yScale(d.value)}`
  ).join(' ')

  // Y-axis grid lines (4 horizontal lines)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(p => Math.round(maxValue * p))

  return (
    <div className={className}>
      <svg width="100%" height={height} viewBox={`0 0 300 ${height}`} role="img">
        {/* Grid lines */}
        {gridLines.map((v) => (
          <g key={v}>
            <line
              x1={pad.left}
              y1={yScale(v)}
              x2={300 - pad.right}
              y2={yScale(v)}
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-700"
              strokeWidth={1}
            />
            <text
              x={pad.left - 4}
              y={yScale(v) + 3}
              textAnchor="end"
              className="fill-neutral-400 dark:fill-neutral-500"
              fontSize="9"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />

        {/* Dots */}
        {showDots && data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(0, i)}
            cy={yScale(d.value)}
            r={3}
            fill={color}
            className="transition-all duration-300"
          />
        ))}

        {/* X-axis labels */}
        {data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 8)) === 0).map((d) => {
          const idx = data.findIndex(x => x.label === d.label)
          return (
            <text
              key={d.label}
              x={xScale(0, idx)}
              y={height - 4}
              textAnchor="middle"
              className="fill-neutral-500 dark:fill-neutral-400"
              fontSize="9"
            >
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
