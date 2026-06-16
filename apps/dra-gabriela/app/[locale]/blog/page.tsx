// /en/blog + /es/blog — bilingual blog index with planned topics.

import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/blog.json"
import es from "@/content/es/blog.json"
import { PageHero } from "@/components/PageHero"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Blog" : "Blog") }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const topics: string[] = c.plannedTopics || []
  const isEs = locale === "es"

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={c.title || (isEs ? "Blog educativo" : "Educational blog")}
        subtitle={c.subtitle}
        align="center"
        variant="default"
      />

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status banner */}
          {c.status && (
            <div className="card-accent card p-5 mb-10 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--gold-soft)] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-[var(--gold-2)]" />
              </div>
              <div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider mb-1">{isEs ? "Estado" : "Status"}</div>
                <p className="text-sm text-[var(--fg-muted)]">{c.status}</p>
              </div>
            </div>
          )}

          {/* Topics */}
          {topics.length > 0 && (
            <div>
              <h2 className="text-2xl mb-5">{isEs ? "Próximos temas" : "Upcoming topics"}</h2>
              <div className="space-y-3">
                {topics.map((topic: string, i: number) => (
                  <div key={i} className="card p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[var(--accent)]" />
                      </div>
                      <span className="font-medium truncate">{topic}</span>
                    </div>
                    <span className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                      {isEs ? "Próximamente" : "Coming soon"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {isEs ? "Sugerir un tema" : "Suggest a topic"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
