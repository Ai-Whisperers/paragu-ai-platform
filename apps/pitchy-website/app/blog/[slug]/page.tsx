"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import content from "@/content/es.json"
import { ArticleJsonLd } from "@/components/article-json-ld"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { CtaBanner } from "@/components/cta-banner"
import { ShareWhatsApp } from "@/components/share-whatsapp"

const c = content as Record<string, any>
const waPhone = c.contacto?.info?.whatsapp || "595981277601"

export default function BlogPost() {
  const { slug } = useParams()
  const post: any = (((c.blog || []) as any[]) as any[]).find((p: any) => p.slug === slug)
  if (!post) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
      <Link href="/blog">Volver al blog</Link>
    </div>
  )

  const contentStr = post.content || ""
  const sections = contentStr.split("\n\n")

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <ArticleJsonLd title={post.title} description={post.excerpt} date={post.date} author={post.author} slug={post.slug} />
      <BreadcrumbJsonLd items={[
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />

      <Link href="/blog" className="text-[#0F62FE] no-underline text-sm inline-block mb-6 hover:underline">← Volver al blog</Link>
      <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-4">
        <span className="bg-[#0F62FE]/10 text-[#0F62FE] font-medium px-2.5 py-0.5 rounded">{post.category}</span>
        <span>{post.date}</span>
      </div>
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">{post.title}</h1>
      <p className="text-[#6B7280] text-lg mb-6">{post.excerpt}</p>

      <div className="text-[#4A5568] leading-relaxed space-y-5 whitespace-pre-line">
        {contentStr}
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <ShareWhatsApp title={post.title} url={`/blog/${post.slug}`} />
        <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hola! Vi el artículo "${post.title}" y quiero consultar.`)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0F62FE] text-white px-6 py-3 rounded-xl font-semibold no-underline text-sm hover:bg-blue-700">
          Consultar por WhatsApp
        </a>
      </div>

      <CtaBanner />
    </article>
  )
}
