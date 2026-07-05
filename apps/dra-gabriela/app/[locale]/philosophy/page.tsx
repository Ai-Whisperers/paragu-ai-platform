import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MessageCircle, Quote } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { getContent, whatsappLink } from "@/lib/content"
import en from "@/content/en/philosophy.json"
import es from "@/content/es/philosophy.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  const isEs = locale === "es"
  return buildMetadata({
    slug: "philosophy",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Filosofía" : "Philosophy"),
    description: data?.subtitle || (isEs
      ? "Por qué esta práctica existe y por qué es diferente."
      : "Why this practice exists and why it's different."),
    locale: isEs ? "es" : "en",
  })
}

type ItemObj = { title?: string; description?: string }
type Section = {
  heading?: string
  body?: string
  items?: Array<string | ItemObj>
  variantes?: string[]
  noIdeal?: string
}

function isObjectItem(x: unknown): x is ItemObj {
  return typeof x === "object" && x !== null && ("title" in (x as any) || "description" in (x as any))
}

export default async function PhilosophyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const sections: Section[] = c.sections || []
  const fraseGuia: string = c.fraseGuia || ""

  const site = getContent(locale)
  const wa = whatsappLink(site?.business?.whatsapp, site?.business?.whatsappMessage)
  const base = `/${locale}`
  const scheduleLink: string = c.schedule_link || `${base}/contact`
  const ctaPrimary: string = c.cta?.primary || (isEs ? "Reservar consulta diagnóstica" : "Book Diagnostic Consultation")
  const ctaSecondary: string = c.cta?.secondary || (isEs ? "Pedir segunda opinión escrita" : "Request written second opinion")

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Filosofía" : "Philosophy"}
        title={c.title || (isEs ? "Filosofía" : "Philosophy")}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      {fraseGuia && (
        <section className="bg-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
            <Quote className="w-6 h-6 text-gold mx-auto mb-3 opacity-80" />
            <p className="text-xl md:text-2xl leading-relaxed italic" style={{ fontFamily: "var(--font-heading)" }}>
              {fraseGuia}
            </p>
          </div>
        </section>
      )}

      <PageSection layout="wide" py="md">
        <div className="max-w-4xl mx-auto space-y-14">
          {sections.map((s, i) => {
            const items = s.items || []
            const hasObjectItems = items.some(isObjectItem)
            return (
              <article key={i} className="scroll-mt-24">
                {s.heading && (
                  <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {s.heading}
                  </h2>
                )}

                {s.body && (
                  <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-5">
                    {s.body}
                  </p>
                )}

                {items.length > 0 && !hasObjectItems && (
                  <ul className="space-y-2.5">
                    {(items as string[]).map((it, k) => (
                      <li key={k} className="flex items-start gap-3 text-fg-muted leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {items.length > 0 && hasObjectItems && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {(items as ItemObj[]).map((it, k) => (
                      <div
                        key={k}
                        className="card p-5 border-l-4 border-l-accent hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        {it.title && (
                          <h3 className="text-base font-medium mb-2 text-accent" style={{ fontFamily: "var(--font-heading)" }}>
                            {it.title}
                          </h3>
                        )}
                        {it.description && (
                          <p className="text-sm text-fg-muted leading-relaxed">{it.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {s.variantes && s.variantes.length > 0 && (
                  <div className="mt-5 bg-surface-muted border border-border-light rounded-xl p-5">
                    <div className="text-[10px] uppercase tracking-widest text-fg-subtle font-semibold mb-2">
                      {isEs ? "Variantes" : "Variants"}
                    </div>
                    <ul className="space-y-1.5">
                      {s.variantes.map((v, k) => (
                        <li key={k} className="text-sm text-fg-muted italic">&ldquo;{v}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                )}

                {s.noIdeal && (
                  <div className="mt-5 bg-gold-soft border-l-4 border-l-gold-2 rounded-r-xl p-5">
                    <div className="text-[10px] uppercase tracking-widest text-gold-2 font-semibold mb-2">
                      {isEs ? "No es para" : "Not ideal for"}
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">{s.noIdeal}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </PageSection>

      <section className="section-sm bg-surface-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">
            {isEs ? "¿Querés pensar tu caso conmigo?" : "Want to think through your case with me?"}
          </h2>
          <p className="text-fg-muted mb-6">
            {isEs
              ? "Empezá con una consulta de diagnóstico o pedí una segunda opinión escrita."
              : "Start with a diagnostic consultation or request a written second opinion."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="w-4 h-4" />
                {ctaPrimary}
              </a>
            ) : (
              <Link href={scheduleLink} className="btn btn-primary">
                {ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link href={`${base}/second-opinion`} className="btn btn-ghost">
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
