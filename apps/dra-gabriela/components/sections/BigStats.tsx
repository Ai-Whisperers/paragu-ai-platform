// Section: BigStats — wide teal strip with 2-col layout (heading + 4 stats).
// More structured than the previous centered list.

interface BigStat {
  value: string
  label: string
  sub: string
}

const STATS: BigStat[] = [
  { value: "20+", label: "Años en práctica", sub: "Desde 2005" },
  { value: "130+", label: "Pacientes al mes", sub: "Promedio actual" },
  { value: "100%", label: "Plan escrito", sub: "Antes de cualquier paso" },
  { value: "2-3", label: "Días para segunda opinión", sub: "Informe escrito" },
]

export function BigStats({ locale }: { locale: string }) {
  const isEs = locale === "es"
  return (
    <section className="relative overflow-hidden bg-[var(--accent)] text-white">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-center">
          {/* Left: heading */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
              {isEs ? "En números" : "By the numbers"}
            </span>
            <h2 className="text-3xl md:text-4xl text-white mt-2">
              {isEs ? "Veinte años en práctica" : "Twenty years in practice"}
            </h2>
            <p className="text-white/70 mt-3 leading-relaxed">
              {isEs
                ? "Una práctica conservadora que se construye sobre la confianza a largo plazo, no sobre el volumen."
                : "A conservative practice built on long-term trust, not on volume."}
            </p>
          </div>

          {/* Right: 4 stat cards in 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="card bg-white/10 backdrop-blur-sm border-white/20 p-5 text-center">
                <div
                  className="text-4xl md:text-5xl font-medium leading-none mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-medium text-white/90 mb-1">{s.label}</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
