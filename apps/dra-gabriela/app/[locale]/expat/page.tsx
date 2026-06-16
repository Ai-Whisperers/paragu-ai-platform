// /en/expat + /es/expat — bilingual expat landing page.

import { notFound } from "next/navigation"
import { MessageCircle, Globe, Languages, CheckCircle2, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/expat.json"
import es from "@/content/es/expat.json"
import { PageHero } from "@/components/PageHero"
import { getContent, whatsappLink } from "@/lib/content"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Atención a expatriados" : "Expat care") }
}

export default async function ExpatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const c2 = getContent(locale)
  const wa = whatsappLink(c2.business?.whatsapp, c2.business?.whatsappMessage)

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Pacientes internacionales" : "International patients"}
        title={c.title || (isEs ? "Atención dental en Asunción" : "Dental care in Asunción")}
        subtitle={c.subtitle}
        align="center"
        variant="default"
      >
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
          </a>
        ) : (
          <Link href={`/${locale}/contact`} className="btn btn-primary">
            {isEs ? "Ver contacto" : "See contact"}
          </Link>
        )}
      </PageHero>

      <section className="section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust badges row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="card p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                <Languages className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">English</div>
                <div className="font-medium text-sm">{isEs ? "Atención 100% en inglés" : "Full English care"}</div>
              </div>
            </div>
            <div className="card p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Factura" : "Invoice"}</div>
                <div className="font-medium text-sm">{isEs ? "RUC para reembolso" : "RUC for reimbursement"}</div>
              </div>
            </div>
            <div className="card p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Idiomas" : "Languages"}</div>
                <div className="font-medium text-sm">ES · EN</div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {(c.sections || []).map((s: any, i: number) => (
              <div key={i}>
                <h2 className="text-2xl mb-3">{s.heading || s.title}</h2>
                {s.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-3">{s.body}</p>}
                {s.items && (
                  <ul className="space-y-2.5">
                    {s.items.map((it: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[var(--gold)] mt-1 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
