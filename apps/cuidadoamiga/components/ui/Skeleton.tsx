import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rect' | 'circle'
  width?: string | number
  height?: string | number
  count?: number
}

const variantStyles: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text: 'h-3 rounded',
  rect: 'rounded-md',
  circle: 'rounded-full',
}

export function Skeleton({ className, variant = 'text', width, height, count = 1 }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  }
  const items = Array.from({ length: count })
  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          style={style}
          className={clsx('animate-shimmer', variantStyles[variant], className)}
          aria-hidden
        />
      ))}
    </>
  )
}
