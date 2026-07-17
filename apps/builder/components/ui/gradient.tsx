'use client'

import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  variant?: 'primary-secondary' | 'secondary-accent' | 'primary-accent' | 'mesh-1' | 'mesh-2' | 'animated'
  className?: string
  children?: React.ReactNode
  /** Enable animated gradient shift effect */
  animated?: boolean
  /** Add decorative pattern overlay */
  pattern?: 'dots' | 'lines' | 'grid' | 'diagonal' | 'none'
  /** Pattern opacity (0-1) */
  patternOpacity?: number
}

/**
 * Gradient background component with preset gradient combinations.
 * Uses CSS variables for theme-aware colors.
 *
 * @example
 * // Simple gradient background
 * <GradientBackground variant="primary-secondary">
 *   <YourContent />
 * </GradientBackground>
 *
 * @example
 * // Animated gradient with dot pattern
 * <GradientBackground
 *   variant="animated"
 *   animated
 *   pattern="dots"
 *   patternOpacity={0.1}
 * >
 *   <YourContent />
 * </GradientBackground>
 */
export function GradientBackground({
  variant = 'primary-secondary',
  className,
  children,
  animated = false,
  pattern = 'none',
  patternOpacity = 0.05,
}: GradientBackgroundProps) {
  const gradientClasses = {
    'primary-secondary': 'bg-primary',
    'secondary-accent': 'bg-brand',
    'primary-accent': 'bg-primary',
    'mesh-1': 'bg-deep',
    'mesh-2': 'bg-deep',
    'animated': 'bg-primary',
  }

  // Patterns rendered with solid-color SVG data URIs (no gradients per canonical palette)
  const svgPatterns: Record<string, string> = {
    dots: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><circle cx='2' cy='2' r='1' fill='%23ffffff'/></svg>\")",
    lines: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect x='0' y='0' width='1' height='20' fill='%23ffffff'/></svg>\")",
    grid: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0 0H40V1H0zM0 0V40H1V0z' fill='%23ffffff'/></svg>\")",
    diagonal: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path d='M-2 6L6 -2M0 16L16 0M10 18L18 10' stroke='%23ffffff' stroke-width='1'/></svg>\")",
  }

  const patternStyles = pattern !== 'none' ? {
    backgroundImage: svgPatterns[pattern],
    opacity: patternOpacity,
  } : {}

  return (
    <div
      className={cn(
        'relative',
        gradientClasses[variant],
        animated && 'animate-gradient',
        className
      )}
    >
      {pattern !== 'none' && (
        <div
          className="pointer-events-none absolute inset-0 text-muted-foreground"
          style={patternStyles}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * Gradient text component with animated or static gradients
 */
interface GradientTextProps {
  children: React.ReactNode
  className?: string
  /** Enable animated gradient */
  animated?: boolean
}

export function GradientText({
  children,
  className,
  animated = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'text-primary',
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * Gradient border wrapper component
 */
interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function GradientBorder({
  children,
  className,
  rounded = 'lg',
}: GradientBorderProps) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'relative p-[2px]',
        'bg-primary',
        roundedClasses[rounded],
        className
      )}
    >
      <div className={cn('h-full w-full bg-background', roundedClasses[rounded])}>
        {children}
      </div>
    </div>
  )
}
