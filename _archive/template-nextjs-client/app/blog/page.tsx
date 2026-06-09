"use client"
import Link from "next/link"
import content from "@/content/es.json"

export default function BlogIndex() {
  const c = content as any
  const b = c.blog || { posts: [], categories: [], title: "Blog", subtitle: "" }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">{b.title}</h1>
      <p className="text-muted-foreground text-center mb-10">{b.subtitle}</p>
      <div className="flex gap-2 flex-wrap justify-center mb-10">
        <Link href="/blog" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Todas</Link>
        {(b.categories || []).map((cat: string) => {
          const slug = cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          return <Link key={cat} href={`/blog/categoria/${slug}`} className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">{cat}</Link>
        })}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {b.posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="rounded-xl border border-border bg-card overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-md">
              <div className="h-48 bg-gradient-to-br from-surface-light to-surface flex items-center justify-center">
                <span className="text-5xl opacity-10">✦</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
