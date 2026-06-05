/**
 * ANNOTATION: ServiceDetail
 *
 * What it is: A service category detail page showing all items within a category
 * (e.g., all coloring services) with descriptions, prices, durations, and WhatsApp booking links.
 *
 * Why your business needs it: Visitors who click a service category want to see specifics —
 * what's included, how much it costs, how long it takes. This page removes all friction
 * between interest and booking.
 *
 * What AI populates from your data:
 *   - Service category info from content/{lang}/services/categories/{slug}.json
 *   - Service item names, descriptions, prices from the same JSON
 *   - WhatsApp pre-filled message generated from service name
 *   - SEO metadata from site config
 *
 * Your input: Share your full service menu with prices and durations via WhatsApp.
 * We create each category page and individual service items.
 *
 * Plan availability: Crecimiento, Profesional
 */

import { notFound } from "next/navigation"
import Link from "next/link"
import { getSiteConfig, formatGs } from "@/lib/config/config"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { servicesData } from "@/lib/config/config"

type ColorName = "rose" | "violet" | "amber" | "sky"
const colorMap: Record<ColorName, { bg: string; light: string; border: string; text: string; badge: string }> = {
  rose: { bg: "bg-rose-500", light: "from-rose-50", border: "border-rose-200", text: "text-rose-600", badge: "bg-rose-100 text-rose-700" },
  violet: { bg: "bg-violet-500", light: "from-violet-50", border: "border-violet-200", text: "text-violet-600", badge: "bg-violet-100 text-violet-700" },
  amber: { bg: "bg-amber-500", light: "from-amber-50", border: "border-amber-200", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
  sky: { bg: "bg-sky-500", light: "from-sky-50", border: "border-sky-200", text: "text-sky-600", badge: "bg-sky-100 text-sky-700" },
}

const iconPaths: Record<string, string> = {
  briefcase: "M21 13.5A3.5 3.5 0 0 1 17.5 17H7a3.5 3.5 0 0 1 0-7A3.5 3.5 0 0 1 17.5 7h1A5.5 5.5 0 0 1 24 12.5 3.5 3.5 0 0 1 21 13.5zm-6-4 4 3 4-4M10 17V7h4",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 17.5v-13Z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  default: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
}

function Icon({ name, className }: { name: string; className?: string }) {
  const path = iconPaths[name] || iconPaths.default
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  const categories = servicesData(lang as "es" | "en")
  const category = categories.find(c => c.id === slug)
  if (!category) return { title: `Servicio no encontrado | ${site.site.name}` }
  return {
    title: `${category.title} | ${site.site.name}`,
    description: category.description,
  }
}

export default async function ServicioPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const site = getSiteConfig(lang as "es" | "en")
  const categories = servicesData(lang as "es" | "en")
  const category = categories.find(c => c.id === slug)

  if (!category) {
    notFound()
  }

  const colors = colorMap[category.color as ColorName] || colorMap.rose

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      
      <section className={`bg-gradient-to-b ${colors.light} to-white py-16 md:py-24`}>
        <div className="container mx-auto px-4">
          <Link
            href={`/${lang}/servicios`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a servicios
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={`${colors.bg} p-5 rounded-2xl shadow-lg`}>
              <Icon name={category.icon || "Briefcase"} className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {category.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios incluidos</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {category.items?.map((item, index: number) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${colors.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  {item.popular && (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      Popular
                    </span>
                  )}
                </div>
                {item.desc && <p className="text-gray-600 mb-4">{item.desc}</p>}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{formatGs(item.price)}</span>
                    {item.duration && item.duration > 0 && (
                      <span className="text-sm text-gray-500 ml-2">{item.duration} min</span>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/${site.business?.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa: ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${colors.bg} hover:opacity-90 transition-opacity`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Reservar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-gradient-to-r ${colors.bg} py-12`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Agenda tu sesión hoy y empieza a hacer crecer tu negocio con nuestra asesoría experta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/booking`}
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar ahora
            </Link>
            <a
              href={`https://wa.me/${site.business?.whatsapp}?text=${encodeURIComponent("Hola! Me interesa conocer más sobre sus servicios.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta
        lang={lang as "es" | "en"}
        serviceName={category.title}
        minPrice={(() => {
          const prices = (category.items || []).map((item) => item.price as number).filter((p) => p > 0)
          return prices.length > 0 ? Math.min(...prices) : 0
        })()}
      />
    </>
  )
}