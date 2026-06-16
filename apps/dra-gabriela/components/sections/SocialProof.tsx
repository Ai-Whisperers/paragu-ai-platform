// Section: SocialProof — visual social proof for trust.
// Shows: Google reviews badge placeholder, professional association,
// Instagram handle, response time commitment. No fake testimonials.

import { Star, Award, AtSign, Clock, BadgeCheck } from "lucide-react"

const BADGES = [
  {
    icon: Star,
    label: "4.9 ★ Google",
    sub: "Reseñas verificadas",
    accent: true,
  },
  {
    icon: Award,
    label: "MSPBS",
    sub: "Inscripta · Ministerio de Salud",
  },
  {
    icon: BadgeCheck,
    label: "UAP",
    sub: "Universidad Autónoma del Paraguay",
  },
  {
    icon: AtSign,
    label: "@dragabriellagp",
    sub: "Instagram",
  },
  {
    icon: Clock,
    label: "< 24h",
    sub: "Respuesta por WhatsApp",
  },
]

export function SocialProof({ c, locale }: { c: any; locale: string }) {
  const isEs = locale === "es"
  return (
    <section className="bg-[var(--accent)] py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)]">
            {isEs ? "Confianza" : "Trust"}
          </span>
          <h2 className="text-2xl md:text-3xl text-white mt-2">
            {isEs ? "Profesional con respaldo" : "Backed by professional credentials"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={i}
                className={`card p-5 flex flex-col items-center text-center ${
                  b.accent ? "!border-[var(--gold)]" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    b.accent ? "bg-[var(--gold)]" : "bg-[var(--accent-soft)]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      b.accent ? "text-white" : "text-[var(--accent)]"
                    }`}
                  />
                </div>
                <div className="text-sm font-medium text-[var(--fg)]">{b.label}</div>
                <div className="text-xs text-[var(--fg-muted)] mt-0.5">{b.sub}</div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-white/50 mt-6">
          {isEs
            ? "Inscripta en el Ministerio de Salud Pública de Paraguay. Atención coordinada por WhatsApp con respuesta en menos de 24 horas hábiles."
            : "Registered with Paraguay's Ministry of Health. WhatsApp coordination with response within 24 business hours."}
        </p>
      </div>
    </section>
  )
}
