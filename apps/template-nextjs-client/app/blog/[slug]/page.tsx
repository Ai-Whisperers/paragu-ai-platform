"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import content from "@/content/es.json"

const WA_PHONE = "595981234567"

const FULL_CONTENT: Record<string, string[]> = {}

export default function BlogPost() {
  const { slug } = useParams()
  const c = content as any
  const post = c.blog?.posts?.find((p: any) => p.slug === slug)
  if (!post) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
      <Link href="/blog">Volver al blog</Link>
    </div>
  )

  const paragraphs = FULL_CONTENT[post.slug as string] || [post.content || ""]
  const waMsg = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hola! Vi el artículo "${post.title}" en ${content.siteName}`)}`

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-primary no-underline text-sm inline-block mb-6 hover:underline">← Volver al blog</Link>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <span className="bg-primary/10 text-primary font-medium px-2.5 py-0.5 rounded">{post.category}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground text-lg mb-8">{post.excerpt}</p>
      <div className="text-muted-foreground leading-relaxed space-y-5">
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="mt-8 p-6 rounded-xl bg-surface-light border border-border text-center">
          <p className="text-muted-foreground mb-4">¿Te interesa este tema? Consultanos por WhatsApp</p>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold no-underline text-sm hover:bg-[#20BD5A]">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
