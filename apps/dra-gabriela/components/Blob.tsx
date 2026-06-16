// Decorative blob — a brand-colored radial gradient circle used in hero
// and section backgrounds. Pure CSS, no images.

interface BlobProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"
  size?: "sm" | "md" | "lg" | "xl"
  color?: "accent" | "gold" | "white"
  className?: string
}

const SIZE: Record<string, string> = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[28rem] h-[28rem]",
}

const POSITION: Record<string, string> = {
  "top-right": "top-0 right-0 -translate-y-1/3 translate-x-1/4",
  "top-left": "top-0 left-0 -translate-y-1/3 -translate-x-1/4",
  "bottom-right": "bottom-0 right-0 translate-y-1/3 translate-x-1/4",
  "bottom-left": "bottom-0 left-0 translate-y-1/3 -translate-x-1/4",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
}

const COLOR: Record<string, { bg: string; opacity: string }> = {
  accent: { bg: "var(--accent)", opacity: "0.06" },
  gold: { bg: "var(--gold)", opacity: "0.08" },
  white: { bg: "white", opacity: "0.10" },
}

export function Blob({
  position = "top-right",
  size = "md",
  color = "accent",
  className = "",
}: BlobProps) {
  const c = COLOR[color]
  return (
    <div
      aria-hidden
      className={`absolute rounded-full pointer-events-none blur-3xl ${SIZE[size]} ${POSITION[position]} ${className}`}
      style={{
        background: `radial-gradient(circle, ${c.bg} 0%, transparent 70%)`,
        opacity: c.opacity,
      }}
    />
  )
}
