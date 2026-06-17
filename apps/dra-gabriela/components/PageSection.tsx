// Section: PageSection — universal layout primitive for inner pages.
// Modes: "narrow" (max-w-3xl, single column), "wide" (max-w-6xl, optional 2-col),
//        "split" (1fr_2fr asymmetric).
// Standard padding (py-20 md:py-28), consistent container, all text-left by default.

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageSectionProps {
  children: ReactNode
  layout?: "narrow" | "wide" | "split"
  bg?: "default" | "muted" | "accent" | "gradient"
  className?: string
  innerClassName?: string
  py?: "sm" | "md" | "lg" | "none"
}

const BG: Record<string, string> = {
  default: "",
  muted: "bg-[var(--surface-muted)]",
  accent: "bg-[var(--accent)] text-white",
  gradient: "bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] text-white",
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
}: PageSectionProps) {
  return (
    <section className={cn("relative", PY[py], BG[bg], className)}>
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", CONTAINER[layout], innerClassName)}>
        {children}
      </div>
    </section>
  )
}
