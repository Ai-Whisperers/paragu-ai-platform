// Section: Services
// Tabs are rendered as link cards (each tab → slug route). When the JSON has
// no per-tab content yet we fall back to a single "see all" bundle card. The
// service detail links use a stable slug map because the JSON links point to
// old /services/[slug] paths that don't exist as routes.

import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
  return (
    <section className="section bg-[var(--surface-muted)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow">{s.eyebrow || "Servicios"}</span>
          <h2 className="text-3xl md:text-4xl mb-3">{s.title || "Servicios"}</h2>
          {s.subtitle && <p className="text-[var(--fg-muted)] max-w-2xl mx-auto">{s.subtitle}</p>}
        </div>

        {tabs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {tabs.map((t: any) => {
              const route = SERVICE_ROUTE[t.id]
              const href = route ? (locale === "es" ? route.es : route.en) : `${locale === "es" ? "/es/servicios" : "/en/services"}#${t.id}`
              return (
                <Link key={t.id} href={href} className="card p-5 group block">
                  <h3 className="text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">{t.label}</h3>
                  <p className="text-xs text-[var(--fg-subtle)] mb-3">{t.id}</p>
                  <div className="text-sm text-[var(--accent)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {locale === "es" ? "Ver detalle" : "View details"} <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {bundles.length > 0 && (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 md:p-8">
            <h3 className="text-xl mb-5">{locale === "es" ? "Paquetes" : "Bundles"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b: any) => {
                const route = b.link
                  ? (locale === "es" ? b.link.replace(/^\/en/, "/es") : b.link.replace(/^\/es/, "/en"))
                  : null
                return (
                  <Link key={b.id} href={route || "#"} className="card p-5 group block">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-base font-semibold group-hover:text-[var(--accent)] transition-colors">{b.name}</h4>
                      {b.priceGs && (
                        <span className="text-sm font-mono text-[var(--accent)] whitespace-nowrap">Gs {Number(b.priceGs).toLocaleString("es-PY")}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--fg-muted)] mb-3">{b.description}</p>
                    <div className="text-sm text-[var(--accent)] font-medium flex items-center gap-1">
                      {locale === "es" ? "Conocer" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
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
