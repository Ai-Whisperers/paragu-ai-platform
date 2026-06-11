'use client'
import { PageLayout } from "@/components/page-layout"
import raw from "@/content/es.json"
import type { Content } from "@/types/content"

const content = raw as unknown as Content
const phone = content.whatsapp.phone

export default function Blog() {
  const posts = (content as unknown as Record<string, unknown>).blog?.posts || []
  
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[25vh] items-center justify-center bg-surface px-4 py-14 sm:min-h-[30vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-lg sm:mt-3">Consejos, guías y recursos para autoras independientes</p>
        </div>
      </section>
      <section className="bg-background px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4 sm:gap-6">
            {posts.map((post: any, i: number) => (
              <a key={i} href={`/blog/${post.slug}`} className="block no-underline">
                <article className="rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <h2 className="mb-2 text-base font-semibold text-foreground sm:text-lg">{post.title}</h2>
                  <p className="mb-3 text-xs text-muted-foreground sm:text-sm">{post.excerpt}</p>
                  <span className="text-xs font-medium text-primary sm:text-sm">Leer más →</span>
                </article>
              </a>
            ))}
            {posts.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">No hay artículos todavía.</p>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
