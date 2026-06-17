// Section: SocialProof — trust band with 2-col layout (heading + badges).
// Light surface with subtle accent background — gives the home page proper
// light/dark rhythm (only Hero + CTA banner stay dark).

import { Star, Award, AtSign, Clock, BadgeCheck } from "lucide-react"

const BADGES = [
  { icon: Award, label: "MSPBS", sub: "Inscripta · Ministerio de Salud" },
  { icon: BadgeCheck, label: "UAP", sub: "Universidad Autónoma del Paraguay" },
  { icon: AtSign, label: "@dragabriellagp", sub: "Instagram" },
  { icon: Clock, label: "< 24h", sub: "Respuesta por WhatsApp" },
]

export function SocialProof({ c, locale }: { c: any; locale: string }) {
  const isEs = locale === "es"
  return (
    <section className="relative overflow-hidden bg-[var(--surface-muted)]">
      {/* Decorative glows */}
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-center">
          {/* Left: heading */}
          <div>
            <span className="eyebrow inline-flex">
              {isEs ? "Confianza" : "Trust"}
            </span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-5 leading-tight">
              {isEs ? "Respaldo profesional" : "Professional credentials"}
            </h2>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed">
              {isEs
                ? "Inscripta en el Ministerio de Salud Pública de Paraguay. Atención coordinada por WhatsApp con respuesta en menos de 24 horas hábiles."
                : "Registered with Paraguay's Ministry of Health. WhatsApp coordination with response within 24 business hours."}
            </p>
          </div>

          {/* Right: featured Google card + 2x2 badges */}
          <div className="space-y-4">
            {/* Featured Google reviews badge — bigger */}
            <div className="card p-6 flex items-center gap-5 hover:shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-[var(--gold)] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-medium text-[var(--accent)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>4.9 ★ Google</div>
                <div className="text-sm text-[var(--fg-muted)]">{isEs ? "Reseñas verificadas" : "Verified reviews"}</div>
              </div>
              <div className="hidden sm:flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]" />
                ))}
              </div>
            </div>

            {/* 4 credential badges in 2x2 grid — bigger */}
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((b, i) => {
                const Icon = b.icon
                return (
                  <div
                    key={i}
                    className="card p-4 flex items-center gap-3 hover:border-[var(--accent)] hover:shadow-md transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--fg)]">{b.label}</div>
                      <div className="text-xs text-[var(--fg-muted)]">{b.sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
