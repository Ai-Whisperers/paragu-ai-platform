// Section: Services
// Tabs as cards + bundles with pricing. Clean, premium feel.

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

// Map service tab IDs (from services/index.json) to the actual page route.
// Routes use Spanish slugs (existing pattern); English pages live under
// /en/<english-slug> via the dynamic [slug] route we're adding in Phase 2.7.
const SERVICE_ROUTE: Record<string, { es: string; en: string }> = {
  "segunda-opinion": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "second-opinion": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "planificacion-tratamiento": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "treatment-planning": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "odontologia-general": { es: "/es/servicios#general", en: "/en/services#general" },
  "general-dentistry": { es: "/es/servicios#general", en: "/en/services#general" },
  "estetica-dental": { es: "/es/servicios#estetica", en: "/en/services#estetica" },
  "cosmetic-dentistry": { es: "/es/servicios#estetica", en: "/en/services#estetica" },
  "rehabilitacion-oral": { es: "/es/servicios#rehabilitacion", en: "/en/services#rehabilitacion" },
  "oral-rehabilitation": { es: "/es/servicios#rehabilitacion", en: "/en/services#rehabilitacion" },
}

export function Services({ c, locale }: { c: any; locale: string }) {
  const s = c.services
  if (!s) return null
  const tabs: any[] = s.tabs || []
  const bundles: any[] = s.bundles || []
  const isEs = locale === "es"

  return (
    <section className="section bg-[var(--surface-muted)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">{isEs ? "Servicios" : "Services"}</span>
          <h2 className="mb-3">{s.title || (isEs ? "Servicios" : "Services")}</h2>
          {s.subtitle && <p className="text-[var(--fg-muted)] text-lg">{s.subtitle}</p>}
        </div>

        {/* Service tabs as cards */}
        {tabs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {tabs.map((t: any) => {
              const route = SERVICE_ROUTE[t.id]
              const href = route ? (locale === "es" ? route.es : route.en) : `/${locale}/servicios#${t.id}`
              return (
                <Link key={t.id} href={href} className="card-accent card p-5 md:p-6 group flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-heading mb-1 group-hover:text-[var(--accent)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {t.label}
                    </h3>
                    <p className="text-xs text-[var(--fg-subtle)]">{t.id?.replace(/-/g, " ")}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-[var(--accent)] mt-4 group-hover:gap-2 transition-all">
                    {isEs ? "Ver detalle" : "View details"} <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Bundles */}
        {bundles.length > 0 && (
          <div className="card p-6 md:p-8 border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" />
              <h3 className="text-xl font-heading" style={{ fontFamily: "var(--font-heading)" }}>
                {isEs ? "Paquetes" : "Bundles"}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b: any) => {
                const slug = locale === "es"
                  ? b.link?.replace(/^\/en/, "/es")?.replace("/es/services/", "/es/servicios/")
                  : b.link?.replace(/^\/es/, "/en")
                return (
                  <Link key={b.id} href={slug || "#"} className="card p-5 group block">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-base font-semibold group-hover:text-[var(--accent)] transition-colors">{b.name}</h4>
                      {b.priceGs && (
                        <span className="text-sm font-mono text-[var(--accent)] whitespace-nowrap font-medium">
                          Gs {Number(b.priceGs).toLocaleString("es-PY")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-3">{b.description}</p>
                    <span className="text-sm font-medium text-[var(--gold)] flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isEs ? "Conocer" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
