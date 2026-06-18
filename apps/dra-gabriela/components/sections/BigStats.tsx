// Section: BigStats — stats strip on the LIGHT surface (moved off dark teal
// to fix the dark-stacking problem on the home page). Big numbers with
// 2-col layout: heading + 2x2 stat grid.
//
// Each stat has a verified source shown as a tooltip + small badge.

import { BadgeCheck } from "lucide-react"

interface BigStat {
  value: string
  label: string
  sub: string
  source: string  // citation / source for the claim
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
      {/* Decorative glows — subtle on light */}
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left: heading — large */}
          <div>
            <span className="eyebrow inline-flex">
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
          </div>

          {/* Right: 4 stat cards in 2×2 grid — BIG numbers on light surface */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="card-accent card p-6 md:p-7 text-left hover:shadow-lg transition-shadow"
              >
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-medium leading-none mb-3 text-accent"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </div>
                <div className="text-base md:text-lg font-medium text-fg mb-1">{s.label}</div>
                <div className="text-[11px] text-fg-subtle uppercase tracking-wider font-semibold mb-2">{s.sub}</div>
                <div
                  className="flex items-start gap-1.5 text-[10px] text-fg-subtle pt-2 border-t border-border-light"
                  title={s.source}
                >
                  <BadgeCheck className="w-3 h-3 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">{s.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
