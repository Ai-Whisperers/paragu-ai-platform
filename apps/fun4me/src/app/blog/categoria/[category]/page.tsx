"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import content from "@/content/es.json"

export default function BlogCategory() {
  const { category } = useParams()
  const cat = (category as string) || ""
  const catNormalized = cat.toLowerCase()
  const posts = content.blog.posts.filter((p: any) =>
    p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === catNormalized
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-primary no-underline text-sm inline-block mb-6 hover:underline">
        ← Volver al blog
      </Link>
      <h1 className="text-3xl font-bold mb-2 capitalize">{cat}</h1>
      <p className="text-muted-foreground mb-10">Artículos sobre {cat}</p>

      {posts.length === 0 ? (
        <>
          <p className="text-center text-muted-foreground py-16">No hay artículos en esta categoría.</p>
          <div className="text-center">
            <Link href="/blog" className="text-primary hover:underline text-sm">Ver todos los artículos</Link>
          </div>
        </>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border border-border bg-card overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="h-40 bg-gradient-to-br from-surface-light to-surface flex items-center justify-center">
                  <span className="text-4xl opacity-10">✦</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-xs line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
