// Shared page hero — used on every page except home.
// Variants: "default" (light gradient), "gradient" (teal), "compact" (smaller).
// Always includes eyebrow + title + optional subtitle + optional decorative shapes.

import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  variant?: "default" | "gradient" | "compact"
  align?: "left" | "center"
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "default",
  align = "center",
  children,
}: PageHeroProps) {
  const isGradient = variant === "gradient"
  const isCompact = variant === "compact"

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isCompact ? "py-14 md:py-20" : "py-20 md:py-28",
        isGradient
          ? "bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] text-white"
          : "bg-gradient-to-br from-[var(--accent-soft)] via-[var(--bg)] to-[var(--bg)]"
      )}
    >
      {/* Decorative shapes */}
      {!isGradient && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 dot-pattern" />
        </div>
      )}
      {isGradient && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />
        </div>
      )}

      <div className={cn("relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", align === "center" && "text-center")}>
        {eyebrow && (
          <span className={cn("eyebrow inline-flex", isGradient && "border-white/20 bg-white/10 text-[var(--gold)]")}>
            <Sparkles className="w-3 h-3" />
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
              "text-lg md:text-xl max-w-2xl leading-relaxed",
              align === "center" && "mx-auto",
              isGradient ? "text-white/85" : "text-[var(--fg-muted)]"
            )}
          >
            {subtitle}
          </p>
        )}
        {children && <div className={cn("mt-8 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>{children}</div>}
      </div>
    </section>
  )
}
