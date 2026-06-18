// Section: BlogPreview — shows the 3 most recent blog posts on the home page.
// Links to the full blog index. Bilingual.

import Link from "next/link"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import en from "@/content/en/blog.json"
import es from "@/content/es/blog.json"

interface BlogPreviewProps {
  locale: string
}

function formatDate(date: string, locale: string): string {
  try {
    return new Date(date).toLocaleDateString(locale === "es" ? "es-PY" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return date
  }
}

export function BlogPreview({ locale }: BlogPreviewProps) {
  const isEs = locale === "es"
  const data = locale === "es" ? es : en
  const posts = (data.posts || []).slice(0, 3)
  const base = `/${locale}`

  return (
    <section className="bg-surface-muted relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <div>
            <span className="eyebrow inline-flex">
              <BookOpen className="w-3 h-3" />
              {isEs ? "Aprendé" : "Learn"}
            </span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-5 leading-tight">
              {isEs ? "Artículos recientes" : "Recent articles"}
            </h2>
            <p className="text-lg text-fg-muted leading-relaxed mb-6">
              {isEs
                ? "Consejos prácticos y razonamiento clínico sin jerga. Para que llegues a la consulta con más claridad."
                : "Practical advice and clinical reasoning without jargon. So you arrive at the visit with more clarity."}
            </p>
            <Link
              href={`${base}/blog`}
              className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium transition-colors"
            >
              {isEs ? "Ver todos los artículos" : "See all articles"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`${base}/blog/${post.slug}`}
                className="card p-5 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-3 text-[11px] text-fg-subtle uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date, locale)}</span>
                </div>
                {post.category && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent mb-2">
                    {post.category}
                  </span>
                )}
                <h3 className="text-base md:text-lg font-medium mb-2 text-fg group-hover:text-accent transition-colors leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                {post.readMinutes && (
                  <div className="flex items-center gap-1 text-[11px] text-fg-subtle mt-3 pt-3 border-t border-border-light">
                    <Clock className="w-3 h-3" />
                    <span>{post.readMinutes} {isEs ? "min" : "min read"}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
