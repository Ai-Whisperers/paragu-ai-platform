// Section: CredentialsStrip — replaces testimonial section when no real
// testimonials exist. Shows professional credentials and trust signals.

import { Award, GraduationCap, Languages, Clock, FileCheck, Sparkles } from "lucide-react"

const ITEMS = [
  { icon: GraduationCap, label: "Universidad Autónoma del Paraguay", sub: "Graduada ~2005 · +20 años" },
  { icon: Award, label: "Especialización en operatoria dental", sub: "Resinas premium · endodoncia · estética" },
  { icon: Languages, label: "Atención bilingüe", sub: "Español · English · full consultation" },
  { icon: Clock, label: "Respuesta en <24h", sub: "Coordinación rápida por WhatsApp" },
  { icon: FileCheck, label: "Plan escrito siempre", sub: "Antes de cualquier procedimiento" },
  { icon: Sparkles, label: "Materiales premium", sub: "Resina alemana · laboratorio de primera" },
]

export function CredentialsStrip({ c, locale }: { c: any; locale: string }) {
  const isEs = locale === "es"
  return (
    <section className="section bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow inline-flex">{isEs ? "Credenciales" : "Credentials"}</span>
          <h2 className="text-3xl md:text-4xl mb-3">{isEs ? "Por qué confiar" : "Why trust us"}</h2>
          <p className="text-[var(--fg-muted)] max-w-xl mx-auto">
            {isEs
              ? "Veinte años de práctica, materiales premium, atención personalizada."
              : "Twenty years of practice, premium materials, personalized care."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => {
            const Icon = it.icon
            return (
              <div key={i} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="font-medium text-sm">{it.label}</div>
                  <div className="text-xs text-[var(--fg-muted)] mt-0.5">{it.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
