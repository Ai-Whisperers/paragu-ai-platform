import { notFound } from "next/navigation"
import Link from "next/link"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const posts = content.blog.posts

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {post.category}
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, margin: "0.75rem 0 1rem", lineHeight: 1.3 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.8125rem", opacity: 0.7 }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "#4B5563", marginBottom: "1.5rem" }}>
            {post.excerpt}
          </p>
          <div style={{ height: "300px", borderRadius: "12px", backgroundColor: "#F8F6F2", border: "1px solid #E8E3DA", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
            <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>Ilustración del artículo</p>
          </div>
          <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "#4B5563" }}>
            <p style={{ marginBottom: "1rem" }}>
              Este artículo es parte del blog jurídico de Villamayor & Asociados. Para obtener asesoría personalizada sobre este tema, agendá una consulta con nuestro equipo.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              En Villamayor & Asociados contamos con amplia experiencia en {post.category.toLowerCase()}. Nuestro equipo está listo para ayudarte a resolver tus inquietudes legales con profesionalismo y dedicación.
            </p>
          </div>
          <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "12px", backgroundColor: "#F8F6F2", border: "1px solid #E8E3DA", textAlign: "center" }}>
            <p style={{ fontWeight: 600, color: "#1B2A4A", marginBottom: "0.75rem" }}>¿Necesitás asesoría legal?</p>
            <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.75rem 1.5rem", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontSize: "0.875rem" }}>
              {content.hero.ctaText}
            </a>
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/blog" style={{ color: "#C9A96E", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem" }}>
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
