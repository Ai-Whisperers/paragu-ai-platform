// Blog post detail page — renders an individual article from blog.json.
// Posts have full content in the JSON file (markdown-ish structured data).

import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Tag } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/blog.json"
import es from "@/content/es/blog.json"
import { PageSection } from "@/components/PageSection"
import { ContactButtons } from "@/components/ContactButton"
import { getContent } from "@/lib/content"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of LOCALES) {
    const posts = CONTENT[locale]?.posts || []
    for (const post of posts) {
      if (post.slug) params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const c = CONTENT[locale]
  const post = c?.posts?.find((p: any) => p.slug === slug)
  if (!post) return {}
  // Per-post OG image: derive from slug. Falls back to generic /og/og-blog.png.
  // Create the actual file at /public/og/og-blog-{slug}.png to override.
  const ogImage = `/og/og-blog-${slug}.png`
  return buildMetadata({
    slug: `blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    locale: locale === "es" ? "es" : "en",
    ogImage,
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

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = getContent(locale)
  const posts: any[] = CONTENT[locale]?.posts || []
  const post = posts.find((p: any) => p.slug === slug)
  if (!post) notFound()

  const isEs = locale === "es"
  const base = `/${locale}`

  // Find next/prev post
  const idx = posts.findIndex((p: any) => p.slug === slug)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx < posts.length - 1 ? posts[idx + 1] : null

  // Build share URL
  const url = `https://dragabriela.paragu-ai.com${base}/blog/${slug}`
  const shareText = isEs ? `${post.title} — Dra. Gabriella` : `${post.title} — Dra. Gabriella`

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-surface border-b border-border-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <li><Link href={base} className="hover:text-accent transition-colors">{isEs ? "Inicio" : "Home"}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`${base}/blog`} className="hover:text-accent transition-colors">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-fg font-medium truncate max-w-[200px] md:max-w-none" aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      <article>
        <PageSection layout="narrow" py="md">
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4 text-xs text-fg-subtle">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              {post.readMinutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readMinutes} {isEs ? "min de lectura" : "min read"}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] mb-4 text-left">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg md:text-xl text-fg-muted leading-relaxed text-left">
                {post.excerpt}
              </p>
            )}
            {post.category && (
              <div className="mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-soft text-accent">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>
            )}
          </header>

          {/* Body — render the structured content blocks */}
          {post.content && (
            <div className="prose-content space-y-6">
              {post.content.map((block: any, i: number) => {
                if (block.type === "h2") {
                  return <h2 key={i} className="text-2xl md:text-3xl mt-10 mb-4 text-left">{block.text}</h2>
                }
                if (block.type === "h3") {
                  return <h3 key={i} className="text-xl md:text-2xl mt-8 mb-3 text-left">{block.text}</h3>
                }
                if (block.type === "p") {
                  return <p key={i} className="text-base md:text-lg text-fg-muted leading-relaxed text-left">{block.text}</p>
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="space-y-2 pl-1">
                      {block.items.map((it: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 text-fg-muted leading-relaxed text-left">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (block.type === "callout") {
                  return (
                    <div key={i} className="card-accent card p-5 md:p-6 my-6">
                      <p className="text-fg leading-relaxed text-left">{block.text}</p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border-light flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-fg-subtle font-semibold">
                {isEs ? "Temas" : "Tags"}:
              </span>
              {post.tags.map((tag: string, i: number) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-surface-muted text-fg-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-fg-subtle font-semibold">
              {isEs ? "Compartir" : "Share"}:
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </PageSection>

        {/* In-text CTA */}
        <PageSection layout="narrow" py="md" bg="muted">
          <div className="card-accent card p-8 text-center">
            <h2 className="text-xl md:text-2xl mb-3">
              {isEs ? "¿Necesitás ayuda con un caso?" : "Need help with a case?"}
            </h2>
            <p className="text-fg-muted mb-6 max-w-md mx-auto">
              {isEs
                ? "Si tenés un diagnóstico o plan de tratamiento sobre el que tenés dudas, puedo revisarlo."
                : "If you have a diagnosis or treatment plan you have questions about, I can review it."}
            </p>
            <ContactButtons
              business={c.business}
              locale={locale}
              variant="primary"
              primaryLabel={isEs ? "Pedir segunda opinión" : "Request a second opinion"}
              secondaryLabel={isEs ? "Ver servicios" : "See services"}
            />
          </div>
        </PageSection>

        {/* Prev/Next */}
        <PageSection layout="narrow" py="md">
          <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`${base}/blog/${prev.slug}`}
                className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-left flex-1 min-w-0"
              >
                <ArrowLeft className="w-4 h-4 text-fg-subtle flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-fg-subtle">{isEs ? "Anterior" : "Previous"}</div>
                  <div className="font-medium text-sm truncate">{prev.title}</div>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {next ? (
              <Link
                href={`${base}/blog/${next.slug}`}
                className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow text-right flex-1 min-w-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-fg-subtle">{isEs ? "Siguiente" : "Next"}</div>
                  <div className="font-medium text-sm truncate">{next.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />
              </Link>
            ) : <div className="flex-1" />}
          </nav>
        </PageSection>

        {/* Back to blog */}
        <PageSection layout="narrow" py="sm">
          <div className="text-center">
            <Link href={`${base}/blog`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              {isEs ? "Ver todos los artículos" : "See all articles"}
            </Link>
          </div>
        </PageSection>
      </article>
    </>
  )
}
