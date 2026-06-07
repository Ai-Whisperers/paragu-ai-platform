export function SoundLevel({ level }: { level: number }) {
  const max = 5
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground" title={`Nivel de ruido: ${level}/${max}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="19" y1="9" x2="19" y2="15"/><line x1="22" y1="7" x2="22" y2="17"/>
      </svg>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={`block w-1.5 h-3 rounded-sm ${i < level ? "bg-warning" : "bg-border"}`} />
        ))}
      </div>
          <span className="text-muted-foreground">{level === 1 ? "Silencioso" : level === 2 ? "Bajo" : level === 3 ? "Moderado" : level >= 4 ? "Audible" : ""}</span>
    </div>
  )
}
