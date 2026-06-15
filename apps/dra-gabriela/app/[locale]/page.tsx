import { notFound } from "next/navigation"
import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { ArrowRight, MessageCircle, Phone, MapPin, Award, Users, Calendar } from "lucide-react"
import Link from "next/link"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const hero = c.hero
  const stats = c.stats
  const reasons = c.reasons
  const services = c.services
  const testimonials = c.testimonials
  const process = c.process
  const cta = c.cta
  const base = `/${locale}`

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text">{hero?.title || "Conservative dentistry in Asunción"}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8">{hero?.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={c.business?.whatsapp ? `https://wa.me/${String(c.business.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(c.business.whatsappMessage || "")}` : "#"} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-2)]">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link href={`${base}/precios`} className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 font-semibold rounded-lg hover:border-[var(--accent)]">
              <Calendar className="w-4 h-4" /> {c.cta?.book || "Book a consultation"}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      {stats?.items && stats.items.length > 0 && (
        <section className="border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.items.map((it: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">{it.n}</div>
                  <div className="text-sm text-gray-600">{it.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REASONS */}
      {reasons?.items && reasons.items.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">{reasons.title || "Why us"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.items.map((r: any, i: number) => (
                <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      {services?.categories && services.categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4">{services.title || "Services"}</h2>
            {services.subtitle && <p className="text-center text-gray-600 mb-12">{services.subtitle}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.categories.map((cat: any, i: number) => (
                <Link key={i} href={`${base}/servicios#${cat.slug || i}`} className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-[var(--accent)] transition-colors">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)]">{cat.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">{cat.description}</p>
                  <div className="flex items-center gap-1 text-sm text-[var(--accent)] font-medium">
                    Ver más <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials?.items && testimonials.items.length > 0 && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">{testimonials.title || "Patient stories"}</h2>
            <div className="space-y-6">
              {testimonials.items.slice(0, 3).map((t: any, i: number) => (
                <div key={i} className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-gray-800 mb-3 italic">"{t.body || t.quote}"</p>
                  <p className="text-sm font-medium">— {t.author || t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process?.steps && process.steps.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">{process.title || "Our process"}</h2>
            <div className="space-y-4">
              {process.steps.map((s: any, i: number) => (
                <div key={i} className="flex gap-4 p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">{i + 1}</div>
                  <div>
                    <h3 className="font-bold mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-700">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="py-20 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">{cta.title || "Book your consultation"}</h2>
            <p className="text-lg opacity-90 mb-8">{cta.body}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={c.business?.whatsapp ? `https://wa.me/${String(c.business.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(c.business.whatsappMessage || "")}` : "#"} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--accent)] font-semibold rounded-lg hover:bg-gray-100">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              {c.business?.phone && !c.business.phone.includes("PENDING") && (
                <a href={`tel:${c.business.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 font-semibold rounded-lg hover:bg-white/20">
                  <Phone className="w-4 h-4" /> {c.business.phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
