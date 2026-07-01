// Section: BigStats — premium 2-col layout: heading + 2×2 stat grid.
// Each stat shows big number, "as featured" pill, verified source tag,
// gold corner wedge, hover lift + scale.

import { BadgeCheck, Sparkles, Trophy } from "lucide-react"

interface BigStat {
  value: string
  label: string
  sub: string
  source: string
}

const STATS_EN: BigStat[] = [
  { value: "20+", label: "Years in practice", sub: "Since 2005", source: "Graduated Universidad Autónoma del Paraguay ~2005" },
  { value: "130", label: "Patients per month", sub: "Current average", source: "Current practice average" },
  { value: "100%", label: "Written plan", sub: "Before any step", source: "Every case reviewed before any irreversible step" },
  { value: "2-3", label: "Days for second opinion", sub: "Written report", source: "Standard turnaround for written review" },
]
const STATS_ES: BigStat[] = [
  { value: "20+", label: "Años en práctica", sub: "Desde 2005", source: "Graduada en la Universidad Autónoma del Paraguay ~2005" },
  { value: "130", label: "Pacientes al mes", sub: "Promedio actual", source: "Promedio de la práctica actual" },
  { value: "100%", label: "Plan escrito", sub: "Antes de cualquier paso", source: "Cada caso revisado antes de cualquier paso irreversible" },
  { value: "2-3", label: "Días para segunda opinión", sub: "Informe escrito", source: "Plazo estándar para revisión escrita" },
]

export function BigStats({ locale }: { locale: string }) {
  const isEs = locale === "es"
  const STATS = isEs ? STATS_ES : STATS_EN
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Decorative glows */}
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.03,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left: heading */}
          <div>
            <span className="eyebrow inline-flex">
              <Trophy className="w-3 h-3" />
              {isEs ? "En números" : "By the numbers"}
            </span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-5 leading-tight">
              {isEs ? "Veinte años en práctica" : "Twenty years in practice"}
            </h2>
            <p className="text-lg text-fg-muted leading-relaxed">
              {isEs
                ? "Una práctica conservadora que se construye sobre la confianza a largo plazo, no sobre el volumen."
                : "A conservative practice built on long-term trust, not on volume."}
            </p>
            <div className="section-rule mt-8" />

            {/* Gold verified badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-soft border border-gold/30 text-accent-2 text-xs font-bold uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" />
              {isEs ? "Datos verificados" : "Verified data"}
            </div>
          </div>

          {/* Right: 4 stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="group relative card-accent card p-6 md:p-7 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ animation: `fade-in-up 600ms ease-out ${i * 80}ms both` }}
              >
                {/* Gold corner wedge */}
                <div className="gold-corner" aria-hidden="true" />

                {/* Sticky-ribbon top */}
                <div
                  className="absolute top-0 left-7 right-7 h-1 rounded-b-full bg-gradient-to-r from-accent to-gold opacity-40 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                {/* Top-right index */}
                <span
                  className="absolute top-4 right-4 text-xs text-fg-subtle font-medium"
                  style={{ fontFamily: "var(--font-heading)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Big number */}
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-medium leading-none mb-3 text-accent transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ fontFamily: "var(--font-heading)", textShadow: "0 4px 30px rgba(15,76,76,0.15)" }}
                >
                  {s.value}
                </div>

                <div className="text-base md:text-lg font-semibold text-fg mb-1">{s.label}</div>
                <div className="text-[11px] text-fg-subtle uppercase tracking-wider font-semibold mb-3">{s.sub}</div>

                {/* Verified source row */}
                <div className="flex items-start gap-1.5 text-[10px] text-fg-subtle pt-3 border-t border-border-light" title={s.source}>
                  <BadgeCheck className="w-3 h-3 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">{s.source}</span>
                </div>

                {/* Gold underline */}
                <div className="w-10 h-0.5 bg-gold rounded-full mt-4 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
