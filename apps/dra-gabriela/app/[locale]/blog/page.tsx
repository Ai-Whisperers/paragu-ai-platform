import { notFound } from "next/navigation"
import Link from "next/link"
import { getContent, isLocale } from "@/lib/content"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  return { title: c.blog?.title || "Blog", description: c.blog?.subtitle }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = getContent(locale)
  const blog = c.blog
  const isEs = locale === "es"

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl mb-4">{blog?.title || "Blog"}</h1>
      {blog?.subtitle && <p className="text-lg text-[var(--fg-muted)] mb-12">{blog.subtitle}</p>}

      <div className="card p-8 mb-10">
        <span className="eyebrow">{isEs ? "Estado" : "Status"}</span>
        <p className="text-[var(--fg-muted)] text-sm">{blog?.status}</p>
      </div>

      {blog?.plannedTopics && blog.plannedTopics.length > 0 && (
        <div>
          <h2 className="text-2xl mb-6">{isEs ? "Temas planificados" : "Planned topics"}</h2>
          <ul className="space-y-3">
            {blog.plannedTopics.map((topic: string, i: number) => (
              <li key={i} className="card p-5 flex items-center justify-between group">
                <span>{topic}</span>
                <span className="text-xs text-[var(--fg-subtle)] uppercase whitespace-nowrap ml-4">
                  {isEs ? "Próximamente" : "Coming soon"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-16 text-center">
        <Link href={`/${locale === "es" ? "es/contacto" : "en/contact"}`} className="btn btn-primary">
          {isEs ? "Sugerir un tema" : "Suggest a topic"}
        </Link>
      </div>
    </div>
  )
}
