// /en/blog + /es/blog — bilingual blog index with planned topics.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { Calendar, Clock, ArrowRight, BookOpen, ArrowUpRight, Mail } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/blog.json"
import es from "@/content/es/blog.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { Newsletter } from "@/components/Newsletter"

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

function formatDate(date: string, locale: string): string {
  try {
    return new Date(date).toLocaleDateString(locale === "es" ? "es-PY" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return date
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const posts: any[] = c.posts || []
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
            <div className="w-11 h-11 rounded-xl bg-gold-soft flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-gold-2" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-fg-subtle font-semibold mb-1">{isEs ? "Estado" : "Status"}</div>
              <p className="text-base text-fg-muted">{c.status}</p>
            </div>
          </div>
        )}

        {/* Published posts */}
        {posts.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl mb-6 text-left">
              {isEs ? "Artículos publicados" : "Published articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((post: any) => (
                <article
                  key={post.slug}
                  className="card-accent card p-6 md:p-7 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <Link
                    href={`${base}/blog/${post.slug}`}
                    className="flex flex-col flex-1 group"
                  >
                    <div className="flex items-center gap-2 mb-3 text-xs text-fg-subtle">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date, locale)}</span>
                      {post.readMinutes && (
                        <>
                          <span className="mx-1" aria-hidden="true">·</span>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readMinutes} {isEs ? "min" : "min read"}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-left group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {post.title}
                    </h3>
                    <p className="text-fg-muted text-sm leading-relaxed mb-4 flex-1 text-left">
                      {post.excerpt}
                    </p>
                    {post.category && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent-soft text-accent">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-accent font-medium group-hover:text-accent-2 transition-colors">
                      {isEs ? "Leer artículo" : "Read article"}
                      <ArrowUpRight className="w-3 h-3 inline ml-1" />
                    </div>
                  </Link>
                </article>
              ))}
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
                  <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-left flex-1">{topic}</span>
                  <span className="text-xs text-fg-subtle uppercase tracking-wider whitespace-nowrap flex-shrink-0">
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

      {/* Newsletter signup */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="max-w-2xl mx-auto">
          <Newsletter locale={locale} />
        </div>
      </PageSection>
    </>
  )
}
