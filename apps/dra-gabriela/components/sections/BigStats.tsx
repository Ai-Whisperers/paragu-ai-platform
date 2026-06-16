// Section: BigStats — a wide teal-strip with 3 huge numbers.
// Distinct from the 4-column icon Stats, designed to dominate the page
// rhythm with visual weight.

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
      {/* Decorative glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
            {isEs ? "En números" : "By the numbers"}
          </span>
          <h2 className="text-3xl md:text-4xl text-white mt-2">
            {isEs ? "Veinte años en práctica" : "Twenty years in practice"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-medium leading-none mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.value}
              </div>
              <div className="text-base font-medium mb-1">{s.label}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
