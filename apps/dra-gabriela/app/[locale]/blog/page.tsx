// /en/blog + /es/blog — bilingual blog index with planned topics.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/blog.json"
import es from "@/content/es/blog.json"
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
    slug: "blog",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Blog" : "Blog"),
    description: isEs ? "Artículos sobre odontología conservadora, planificación dental y casos de la práctica de la Dra. Gabriella en Asunción." : "Articles on conservative dentistry, treatment planning, and cases from Dra. Gabriella's practice in Asunción.",
    locale: isEs ? "es" : "en",
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const topics: string[] = c.plannedTopics || []
  const isEs = locale === "es"
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={c.title || (isEs ? "Blog educativo" : "Educational blog")}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      <PageSection layout="wide" py="lg">
        {/* Status banner */}
        {c.status && (
          <div className="card-accent card p-5 md:p-6 mb-10 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--gold-soft)] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-[var(--gold-2)]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] font-semibold mb-1">{isEs ? "Estado" : "Status"}</div>
              <p className="text-base text-[var(--fg-muted)]">{c.status}</p>
            </div>
          </div>
        )}

        {/* Topics — 2-col grid */}
        {topics.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl mb-6 text-left">{isEs ? "Próximos temas" : "Upcoming topics"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic: string, i: number) => (
                <div key={i} className="card p-5 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <span className="font-medium text-left flex-1">{topic}</span>
                  <span className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                    {isEs ? "Próximamente" : "Coming soon"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href={`${base}/contact`} className="btn btn-primary">
            {isEs ? "Sugerir un tema" : "Suggest a topic"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageSection>
    </>
  )
}
