export function LevelBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; color: string; icon: string }> = {
    beginner: { label: "Principiante", color: "bg-primary/20 text-primary", icon: "🌱" },
    intermediate: { label: "Intermedio", color: "bg-accent/20 text-accent", icon: "⭐" },
    advanced: { label: "Avanzado", color: "bg-warning/20 text-warning", icon: "🔥" },
  }
  const c = config[level] || config.beginner
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${c.color}`}>
      <span>{c.icon}</span> {c.label}
    </span>
  )
}
