// Section: PageSection — universal layout primitive for inner pages.
// Modes: "narrow" (max-w-3xl, single column), "wide" (max-w-6xl, optional 2-col),
//        "split" (1fr_2fr asymmetric).
// Standard padding (py-20 md:py-28), consistent container, all text-left by default.

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageSectionProps {
  children: ReactNode
  layout?: "narrow" | "wide" | "split"
  bg?: "default" | "muted" | "bg" | "accent" | "gradient"
  className?: string
  innerClassName?: string
  py?: "sm" | "md" | "lg" | "none"
  id?: string
}

const BG: Record<string, string> = {
  default: "",
  muted: "bg-surface-muted",
  bg: "bg-bg",
  accent: "tone-ocean-7 text-white",
  gradient: "ink-light bg-gradient-to-br from-[var(--ocean-7)] via-[var(--ocean-8)] to-[var(--ocean-7)] text-white",
}

const PY: Record<string, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
}

const CONTAINER: Record<string, string> = {
  narrow: "max-w-3xl",
  wide: "max-w-[1600px]",
  split: "max-w-[1600px]",
}

export function PageSection({
  children,
  layout = "wide",
  bg = "default",
  className = "",
  innerClassName = "",
  py = "lg",
  id,
}: PageSectionProps) {
  return (
    <section id={id} className={cn("relative", PY[py], BG[bg], className)}>
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", CONTAINER[layout], innerClassName)}>
        {children}
      </div>
    </section>
  )
}
