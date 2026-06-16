// /en/about — Dra. Gabriella bio with portrait + clinical philosophy cards.

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MessageCircle, GraduationCap, Globe, Award, Languages, type LucideIcon } from "lucide-react"
import en from "@/content/en/about.json"
import es from "@/content/es/nosotros.json"
import { PageHero } from "@/components/PageHero"
import { getContent, whatsappLink } from "@/lib/content"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const ICONS: Record<string, LucideIcon> = { graduationCap: GraduationCap, globe: Globe, award: Award, languages: Languages }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Sobre mí" : "About") }
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const base = `/${locale}`
  const c2 = getContent(locale)
  const wa = whatsappLink(c2.business?.whatsapp, c2.business?.whatsappMessage)

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Sobre mí" : "About"}
        title={c.title || (isEs ? "Sobre la Dra. Gabriella" : "About Dra. Gabriella")}
        subtitle={c.subtitle}
        align="center"
        variant="default"
      />

      {/* Portrait + intro */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Portrait card */}
            <div className="md:col-span-1">
              <div className="card overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] relative">
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, var(--gold) 0%, transparent 50%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl font-heading text-white/30" style={{ fontFamily: "var(--font-heading)" }}>DG</div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-white/10" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-white/10" />
                </div>
                <div className="p-5 border-t border-[var(--border)]">
                  <h3 className="font-medium mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>Dra. Gabriella González Pane</h3>
                  <p className="text-xs text-[var(--fg-subtle)]">{isEs ? "Odontóloga · Cirujana dentista" : "Dental surgeon"}</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="md:col-span-2">
              {(c.sections || []).map((s: any, i: number) => (
                <div key={i} className="mb-8 last:mb-0">
                  <h2 className="text-2xl mb-3">{s.heading}</h2>
                  {s.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-4">{s.body}</p>}
                  {s.items && (
                    <ul className="space-y-2.5">
                      {s.items.map((it: string, j: number) => {
                        const iconKey = s.icon_keys?.[j] || s.iconKey
                        const Icon = iconKey && ICONS[iconKey] ? ICONS[iconKey] : null
                        return (
                          <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)] leading-relaxed">
                            {Icon ? (
                              <Icon className="w-4 h-4 text-[var(--gold)] mt-1.5 flex-shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2.5 flex-shrink-0" />
                            )}
                            <span>{it}</span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl mb-3">{c.cta?.title || (isEs ? "¿Hablamos?" : "Let's talk?")}</h2>
            <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto">
              {c.cta?.body || (isEs
                ? "Coordiná tu consulta por WhatsApp."
                : "Book your consultation via WhatsApp.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
                </a>
              ) : (
                <Link href={`${base}/contact`} className="btn btn-primary">
                  {isEs ? "Ver contacto" : "See contact"} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link href={`${base}/second-opinion`} className="btn btn-outline">
                {isEs ? "Segunda opinión" : "Second opinion"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
