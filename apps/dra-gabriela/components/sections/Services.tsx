// Section: Services
// Tabs as image cards + bundles with pricing. Premium visual treatment
// with brand SVG illustrations for each service.

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

const SERVICE_ROUTE: Record<string, { es: string; en: string }> = {
  "segunda-opinion": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "second-opinion": { es: "/es/segunda-opinion", en: "/en/second-opinion" },
  "planificacion-tratamiento": { es: "/es/services/treatment-planning", en: "/en/services/treatment-planning" },
  "treatment-planning": { es: "/es/services/treatment-planning", en: "/en/services/treatment-planning" },
  "odontologia-general": { es: "/es/services/general-dentistry", en: "/en/services/general-dentistry" },
  "general-dentistry": { es: "/es/services/general-dentistry", en: "/en/services/general-dentistry" },
  "estetica-dental": { es: "/es/services/cosmetic-dentistry", en: "/en/services/cosmetic-dentistry" },
  "cosmetic-dentistry": { es: "/es/services/cosmetic-dentistry", en: "/en/services/cosmetic-dentistry" },
  "rehabilitacion-oral": { es: "/es/services/oral-rehabilitation", en: "/en/services/oral-rehabilitation" },
  "oral-rehabilitation": { es: "/es/services/oral-rehabilitation", en: "/en/services/oral-rehabilitation" },
}

const SERVICE_IMAGE: Record<string, string> = {
  "segunda-opinion": "/images/services/second-opinion.png",
  "second-opinion": "/images/services/second-opinion.png",
  "planificacion-tratamiento": "/images/services/treatment-planning.png",
  "treatment-planning": "/images/services/treatment-planning.png",
  "odontologia-general": "/images/services/general-dentistry.svg",
  "general-dentistry": "/images/services/general-dentistry.svg",
  "estetica-dental": "/images/services/cosmetic-dentistry.png",
  "cosmetic-dentistry": "/images/services/cosmetic-dentistry.png",
  "rehabilitacion-oral": "/images/services/oral-rehabilitation.png",
  "oral-rehabilitation": "/images/services/oral-rehabilitation.png",
}

const SERVICE_COLOR: Record<string, string> = {
  "segunda-opinion": "from-[var(--accent)] to-[var(--accent-2)]",
  "second-opinion": "from-[var(--accent)] to-[var(--accent-2)]",
  "planificacion-tratamiento": "from-[var(--accent-soft)] to-[#fbf9f6]",
  "treatment-planning": "from-[var(--accent-soft)] to-[#fbf9f6]",
  "odontologia-general": "from-[#1a6a6a] to-[#0a3a3a]",
  "general-dentistry": "from-[#1a6a6a] to-[#0a3a3a]",
  "estetica-dental": "from-[#fbf9f6] to-[#e6e0d4]",
  "cosmetic-dentistry": "from-[#fbf9f6] to-[#e6e0d4]",
  "rehabilitacion-oral": "from-[var(--accent)] to-[#1a6a6a]",
  "oral-rehabilitation": "from-[var(--accent)] to-[#1a6a6a]",
}

export function Services({ c, locale }: { c: any; locale: string }) {
  const s = c.services
  if (!s) return null
  const tabs: any[] = s.tabs || []
  const bundles: any[] = s.bundles || []
  const isEs = locale === "es"

  return (
    <section className="section bg-[var(--surface-muted)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">{isEs ? "Servicios" : "Services"}</span>
          <h2 className="mb-3">{s.title || (isEs ? "Servicios" : "Services")}</h2>
          {s.subtitle && <p className="text-[var(--fg-muted)] text-lg">{s.subtitle}</p>}
        </div>

        {/* Service tabs as image cards */}
        {tabs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {tabs.map((t: any) => {
              const route = SERVICE_ROUTE[t.id]
              const href = route ? (locale === "es" ? route.es : route.en) : `/${locale}/services#${t.id}`
              const img = SERVICE_IMAGE[t.id]
              const color = SERVICE_COLOR[t.id] || "from-[var(--accent-soft)] to-[#fbf9f6]"
              return (
                <Link key={t.id} href={href} className="card overflow-hidden group block">
                  {/* Image area */}
                  <div className={`relative aspect-[3/2] bg-gradient-to-br ${color} overflow-hidden`}>
                    {img && (
                      <Image
                        src={img}
                        alt={t.label}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {/* Gold accent corner */}
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[var(--gold)] opacity-40" />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-medium mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {t.label}
                    </h3>
                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--gold)] group-hover:gap-2 transition-all">
                      {isEs ? "Ver detalle" : "View details"} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Bundles */}
        {bundles.length > 0 && (
          <div className="card p-6 md:p-8">
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
