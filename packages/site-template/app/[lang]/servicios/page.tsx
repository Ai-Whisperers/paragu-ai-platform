/**
 * ANNOTATION: ServicesListing
 *
 * What it is: A page that lists all services and service categories offered by the
 * business. Each category links to its individual service detail page.
 *
 * Why your business needs it: Most visitors come to check if you offer what they
 * need. A clear, browsable service catalog removes friction and leads directly to
 * booking. Without it, potential clients leave without converting.
 *
 * What AI populates from your data:
 *   - Categories and service names from content/{lang}/services/index.json
 *   - Category descriptions and pricing from content/{lang}/services/categories/*.json
 *   - Images for each category from your business gallery
 *   - Metadata (title, description) from site config
 *
 * Your input: Share your service list, prices, and category names via WhatsApp.
 * We build the service tree and link each one to the booking form.
 *
 * Plan availability: Crecimiento, Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { getSiteConfig } from "@/lib/config/config"
import { ScrollReveal } from "@/components/shared/scroll-reveal"
import {
  Calendar, Grid, CreditCard, Heart, Gift, Search, Briefcase, Book,
  Download, Sparkles, ArrowRight, Scissors, Palette, Star, Clock
} from "lucide-react"
import Link from "next/link"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"


const colorMap: Record<string, { bg: string; gradient: string; light: string; text: string; badge: string; border: string }> = {
  blue: { bg: "bg-blue-500", gradient: "from-blue-500 to-blue-600", light: "bg-blue-50", text: "text-blue-600", badge: "bg-blue-100 text-blue-700", border: "border-blue-200" },
  green: { bg: "bg-green-500", gradient: "from-green-500 to-green-600", light: "bg-green-50", text: "text-green-600", badge: "bg-green-100 text-green-700", border: "border-green-200" },
  purple: { bg: "bg-purple-500", gradient: "from-purple-500 to-purple-600", light: "bg-purple-50", text: "text-purple-600", badge: "bg-purple-100 text-purple-700", border: "border-purple-200" },
  rose: { bg: "bg-rose-500", gradient: "from-rose-500 to-rose-600", light: "bg-rose-50", text: "text-rose-600", badge: "bg-rose-100 text-rose-700", border: "border-rose-200" },
  amber: { bg: "bg-amber-500", gradient: "from-amber-500 to-amber-600", light: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-100 text-amber-700", border: "border-amber-200" },
  sky: { bg: "bg-sky-500", gradient: "from-sky-500 to-sky-600", light: "bg-sky-50", text: "text-sky-600", badge: "bg-sky-100 text-sky-700", border: "border-sky-200" },
  violet: { bg: "bg-violet-500", gradient: "from-violet-500 to-violet-600", light: "bg-violet-50", text: "text-violet-600", badge: "bg-violet-100 text-violet-700", border: "border-violet-200" },
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  grid: Grid,
  creditCard: CreditCard,
  heart: Heart,
  gift: Gift,
  search: Search,
  briefcase: Briefcase,
  book: Book,
  download: Download,
  sparkles: Sparkles,
  scissors: Scissors,
  palette: Palette,
  star: Star,
  clock: Clock,
}

interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

interface ServicesIndex {
  title: string
  subtitle: string
  categories: Category[]
}

async function getServicesIndex(lang: string): Promise<ServicesIndex> {
  if (lang === "en") {
    const index = await import("@/content/en/services/index.json")
    return index.default as ServicesIndex
  }
  const index = await import("@/content/es/services/index.json")
  return index.default as ServicesIndex
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return { title: `Servicios | ${site.site.name}`, description: site.site.metaDescription }
}

export default async function ServiciosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  const servicesIndex = await getServicesIndex(lang)
  const ui = lang === "en" ? enUi : esUi


  return (
    <>
      <Header lang={lang as "es" | "en"} />

      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <ScrollReveal direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" /> {lang === "en" ? "Services" : "Servicios"}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {servicesIndex.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {servicesIndex.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesIndex.categories.map((category, index) => {
              const colors = colorMap[category.color] || colorMap.blue
              const Icon = iconMap[category.icon] || Sparkles

              return (
                <ScrollReveal key={category.id} delay={index * 80} direction="up">
                  <Link
                    href={`/${lang}/servicios/${category.id}`}
                    className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-sm text-foreground-light mb-5 leading-relaxed line-clamp-3">
                        {category.description}
                      </p>

                      <span className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.text} group-hover:gap-3 transition-all duration-200`}>
                        {((lang === "es" ? esUi : enUi) as typeof esUi).services.verCategoria} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>

                    <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
            {ui.servicesSpecific.needSomethingTitle}
          </h2>
          <p className="text-foreground-light max-w-xl mx-auto mb-8">
            {ui.servicesSpecific.needSomethingText}
          </p>
          <a
            href={`https://wa.me/${site.business?.whatsapp}?text=${encodeURIComponent(ui.servicesSpecific.needSomethingBtn)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}
