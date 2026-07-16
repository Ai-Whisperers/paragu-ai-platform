// /en/faq + /es/faq — bilingual FAQ with hero, teal intro callout, grouped
// collapsible cards, and a teal CTA footer.

import { notFound } from "next/navigation"
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/faqs.json"
import es from "@/content/es/faqs.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { buildMetadata } from "@/lib/seo"
import { ContactButtons } from "@/components/ContactButton"
import { FAQSearch } from "@/components/FAQSearch"
import { getContent, whatsappLink, isPlaceholder } from "@/lib/content"

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
    slug: "faq",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Preguntas frecuentes" : "Frequently asked questions"),
    description: isEs
      ? "Preguntas frecuentes sobre la práctica dental conservadora de la Dra. Gabriella González Pane en Asunción."
      : "Frequently asked questions about Dra. Gabriella González Pane's conservative dental practice in Asunción.",
    locale: isEs ? "es" : "en",
  })
}

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const groups = c.groups || []
  const base = `/${locale}`

  const content = getContent(locale)
  const biz = content.business || {}
  const wa = whatsappLink(biz.whatsapp, biz.whatsappMessage)

  // Inject JSON-LD FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g: any) =>
      (g.items || []).map((it: any) => ({
        "@type": "Question",
        name: it.q || it.question,
        acceptedAnswer: { "@type": "Answer", text: it.a || it.answer },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/(?<!\\u00)@/g, "\\u0040") }}
      />

      <PageHero
        eyebrow="FAQ"
        title={c.title || (isEs ? "Preguntas frecuentes" : "Frequently asked questions")}
        subtitle={c.subtitle || (isEs
          ? "Las preguntas que más recibimos. Si no está tu duda, escribime por WhatsApp."
          : "The questions we get most. If yours isn't here, message us on WhatsApp.")}
        variant="default"
        align="center"
      >
        <Link href="#groups" className="btn btn-primary">
          {isEs ? "Ver las preguntas" : "See all questions"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </PageHero>

      {/* Teal intro callout — breaks the cream monotony */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="max-w-3xl mx-auto">
          <div className="card-accent card p-6 md:p-7 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg md:text-xl mb-1 text-left">
                {isEs ? "Respuesta honesta, sin rodeos" : "Honest answers, no spin"}
              </h2>
              <p className="text-fg-muted text-sm md:text-base leading-relaxed text-left">
                {isEs
                  ? "Estas son las preguntas reales que recibimos. Si la tuya no está, escribime por WhatsApp. Si no sé la respuesta, te lo digo en lugar de inventar."
                  : "These are the real questions we get. If yours isn't here, message me on WhatsApp. If I don't know the answer, I'll say so instead of making something up."}
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      <div className="max-w-4xl mx-auto px-4 my-8">
        <FAQSearch
          items={groups.flatMap((g: any) => (g.items || []).map((it: any) => ({ q: it.q || it.question, a: it.a || it.answer })))}
          placeholder={isEs ? "Buscar en preguntas… (ej: miedo, precio, sedación)" : "Search questions… (e.g. fear, price, sedation)"}
        />
      </div>
      <PageSection layout="wide" py="lg" id="groups">
        <div className="space-y-12">
          {groups.map((g: any, gi: number) => (
            <div key={gi}>
              {g.name && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-2xl">{g.name}</h2>
                  <span className="text-xs text-fg-subtle ml-2">{(g.items || []).length} {(g.items || []).length === 1 ? (isEs ? "pregunta" : "question") : (isEs ? "preguntas" : "questions")}</span>
                </div>
              )}
              <div className="space-y-3">
                {(g.items || []).map((it: any, i: number) => (
                  <details key={i} className="group bg-surface border-2 border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg transition-all">
                    <summary className="cursor-pointer p-5 md:p-6 list-none flex items-start justify-between gap-4 hover:bg-surface-muted transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent font-medium text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="font-medium text-lg md:text-xl pt-1 text-left">{it.q || it.question}</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-fg-subtle group-open:rotate-180 transition-transform flex-shrink-0 mt-2" />
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[5.5rem]">
                      <p className="text-fg-muted leading-relaxed border-t border-border-light pt-4 text-left">
                        {it.a || it.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Teal CTA — direct line to Dra. GP */}
      <PageSection layout="wide" py="md" bg="accent">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl mb-3 text-white">
            {isEs ? "Tu pregunta no está acá" : "Your question isn't here?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            {isEs
              ? "Escribime por WhatsApp. Si no sé la respuesta, te lo digo."
              : "Message me on WhatsApp. If I don't know the answer, I'll tell you."}
          </p>
          <ContactButtons
            business={content.business}
            locale={locale}
            variant="primary"
            primaryLabel={isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
            secondaryLabel={isEs ? "Volver al inicio" : "Back to home"}
          />
        </div>
      </PageSection>
    </>
  )
}
