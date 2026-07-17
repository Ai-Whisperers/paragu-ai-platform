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
      <section className="bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-[700px]">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[#C9A96E]">
            {post.category}
          </span>
          <h1 className="serif my-3 mb-4 mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-[1.3]">
            {post.title}
          </h1>
          <div className="flex justify-center gap-4 text-[0.8125rem] opacity-70">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[700px]">
          <p className="mb-6 text-[1.0625rem] leading-[1.8] text-[#4B5563]">
            {post.excerpt}
          </p>
          <div className="mb-8 flex h-[300px] items-center justify-center rounded-xl border border-[#E8E3DA] bg-[#F8F6F2]">
            <p className="text-sm text-[#9CA3AF]">Ilustración del artículo</p>
          </div>
          <div className="text-base leading-[1.8] text-[#4B5563]">
            <p className="mb-4">
              Este artículo es parte de nuestro blog jurídico de demostración. Para obtener asesoría personalizada sobre este tema, agendá una consulta con un estudio jurídico real.
            </p>
            <p className="mb-4">
              Contamos con amplia experiencia en {post.category.toLowerCase()}. Nuestro equipo está listo para ayudarte a resolver tus inquietudes legales con profesionalismo y dedicación.
            </p>
          </div>
          <div className="mt-12 rounded-xl border border-[#E8E3DA] bg-[#F8F6F2] p-6 text-center">
            <p className="mb-3 font-semibold text-[#1B2A4A]">¿Necesitás asesoría legal?</p>
            <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-md bg-[#C9A96E] px-6 py-3 text-sm font-bold text-[#1B2A4A] no-underline">
              {content.hero.ctaText}
            </a>
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm font-semibold text-[#C9A96E] no-underline">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
