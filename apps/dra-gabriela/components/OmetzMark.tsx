// Hebrew אומץ brand mark — prominent visual identity element.
// Used in hero + footer + sticky nav. Renders in Frank Ruhl Libre (hebrew-supporting font).
//
// "Ometz" (אומץ) = "coraje" / "courage" in hebrew.
// Symbol of Gaby's brand positioning: "Te escucho antes de actuar" requires courage.

export function OmetzMark({
  size = "md",
  showSubtitle = true,
  className = "",
  subtitle,
}: {
  size?: "sm" | "md" | "lg" | "xl"
  showSubtitle?: boolean
  className?: string
  subtitle?: string
}) {
  const sizeClasses = {
    sm: { hebrew: "text-3xl", roman: "text-base" },
    md: { hebrew: "text-5xl", roman: "text-xl" },
    lg: { hebrew: "text-7xl", roman: "text-2xl" },
    xl: { hebrew: "text-9xl", roman: "text-4xl" },
  }[size]

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <span
        className={`font-bold text-accent leading-none tracking-tight ${sizeClasses.hebrew}`}
        style={{ fontFamily: "var(--font-heading), serif" }}
        aria-label="Ometz"
      >
        אומץ
      </span>
      <span className={`uppercase tracking-[0.2em] text-fg-muted font-medium ${sizeClasses.roman}`}>
        Ometz
      </span>
      {showSubtitle && subtitle && (
        <span className="text-sm text-fg-subtle italic mt-1">
          {subtitle}
        </span>
      )}
    </div>
  )
}
