"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import content from "@/content/es.json"

export default function BlogCategory() {
  const { category } = useParams()
  const c = content as any
  const cat = (category as string) || ""
  const catNormalized = cat.toLowerCase()
  const posts = (c.blog?.posts || []).filter((p: any) =>
    p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === catNormalized
  )
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-primary no-underline text-sm mb-6 hover:underline inline-block">← Volver al blog</Link>
      <h1 className="text-3xl font-bold mb-2 capitalize">{cat}</h1>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No hay artículos en esta categoría.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary">{post.title}</h3>
                <p className="text-muted-foreground text-xs">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
