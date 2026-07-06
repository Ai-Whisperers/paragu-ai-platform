// PageHero — universal hero used on every page (except home).
// Standard: max-w-7xl container, py-20/28, gradient or light background,
// all text-center but inner content can override to text-left.
// Uses consistent eyebrow + title + subtitle + optional CTA children.

import { cn } from "@/lib/utils"
import { Sparkles, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  variant?: "default" | "gradient" | "compact"
  align?: "left" | "center"
  icon?: LucideIcon
  children?: ReactNode
  className?: string
}

const VARIANT_BG: Record<string, string> = {
  default: "bg-bg",
  gradient: "bg-gradient-to-br from-accent via-[var(--accent-2)] to-accent text-white",
  compact: "bg-surface border-b border-border-light",
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "default",
  align = "center",
  icon: Icon = Sparkles,
  children,
  className = "",
}: PageHeroProps) {
  const isGradient = variant === "gradient"
  const isCompact = variant === "compact"
  const isCenter = align === "center"

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isCompact ? "py-14 md:py-20" : "py-16 md:py-20",
        VARIANT_BG[variant],
        className
      )}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />
        </div>
      )}

      <div className={cn("relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8")}>
        <div className={cn(isCenter ? "text-center" : "text-left", "max-w-4xl", isCenter && "mx-auto")}>
          {eyebrow && (
            <span
              className={cn(
                "eyebrow inline-flex",
                isGradient && "!border-white/20 !bg-white/10 !text-white"
              )}
            >
              <Icon className="w-3 h-3" />
              {eyebrow}
            </span>
          )}
          <h1
            className={cn(
              "font-medium tracking-tight leading-[1.05] mb-5",
              isCompact ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl lg:text-7xl"
            )}
          >
            {isGradient ? <span className="text-white">{title}</span> : <span className="gradient-text">{title}</span>}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "lead",
                isGradient ? "!text-white/85" : "text-fg-muted"
              )}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div className={cn("mt-8 flex flex-wrap items-center gap-3", isCenter && "justify-center")}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
