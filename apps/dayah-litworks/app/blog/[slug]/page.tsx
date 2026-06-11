'use client'
import { useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import raw from "@/content/es.json"
import Link from "next/link"
import type { Content } from "@/types/content"

const content = raw as unknown as Content
const phone = content.whatsapp.phone

export default function BlogPost() {
  const { slug } = useParams()
  const posts = (content as unknown as Record<string, unknown>).blog?.posts || []
  const post = posts.find((p: any) => p.slug === slug)
  const blogPostMap = (content as unknown as Record<string, unknown>).blogPost as Record<string, any> || {}
  const postDetail = blogPostMap[slug as string]
  
  if (!post) {
    return (
      <PageLayout phone={phone}>
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "60px 16px", textAlign: "center" }}>
          <h1>Artículo no encontrado</h1>
          <Link href="/blog" style={{ color: "var(--color-primary)" }}>← Volver al blog</Link>
        </main>
      </PageLayout>
    )
  }

  return (
    <PageLayout phone={phone}>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "40px 16px" }}>
        <Link href="/blog" style={{ color: "var(--color-primary)", fontSize: "0.85rem", textDecoration: "none", marginBottom: 24, display: "inline-block" }}>← Volver al blog</Link>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>{post.title}</h1>
        <p style={{ fontSize: "0.8rem", color: "var(--color-muted-foreground)", marginBottom: 32 }}>{post.date} · {post.readingTime}</p>
        
        {postDetail && postDetail.content && (
          <div style={{ lineHeight: 1.8 }}>
            {postDetail.content.split('\n').map((p: string, i: number) => (
              <p key={i} style={{ marginBottom: 16, color: "var(--color-foreground)", fontSize: "0.95rem" }}>{p}</p>
            ))}
          </div>
        )}

        {postDetail && postDetail.sections && postDetail.sections.map((section: any, i: number) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 12, marginTop: 32 }}>{section.title}</h2>
            <p style={{ lineHeight: 1.8, color: "var(--color-foreground)", fontSize: "0.95rem" }}>{section.text}</p>
          </div>
        ))}

        {!postDetail && (
          <div style={{ padding: 40, textAlign: "center", background: "var(--color-surface)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
            <p style={{ color: "var(--color-muted-foreground)" }}>Contenido completo próximamente.</p>
          </div>
        )}
      </main>
    </PageLayout>
  )
}
