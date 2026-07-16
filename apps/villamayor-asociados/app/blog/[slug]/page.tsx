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
      <section className="text-white py-20 px-6 text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[700px] mx-auto">
          <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">
            {post.category}
          </span>
          <h1 className="serif font-bold mt-3 mb-4 leading-[1.3] text-[clamp(1.5rem,3.5vw,2.25rem)]">
            {post.title}
          </h1>
          <div className="flex justify-center gap-4 text-[0.8125rem] opacity-70">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[1.0625rem] leading-[1.8] text-gray-600 mb-6">
            {post.excerpt}
          </p>
          <div className="h-[300px] rounded-xl bg-surface-alt border border-border flex items-center justify-center mb-8">
            <p className="text-gray-400 text-sm">Ilustración del artículo</p>
          </div>
          <div className="text-base leading-[1.8] text-gray-600">
            <p className="mb-4">
              Este artículo es parte del blog jurídico de Villamayor & Asociados. Para obtener asesoría personalizada sobre este tema, agendá una consulta con nuestro equipo.
            </p>
            <p className="mb-4">
              En Villamayor & Asociados contamos con amplia experiencia en {post.category.toLowerCase()}. Nuestro equipo está listo para ayudarte a resolver tus inquietudes legales con profesionalismo y dedicación.
            </p>
          </div>
          <div className="mt-12 p-6 rounded-xl bg-surface-alt border border-border text-center">
            <p className="font-semibold text-primary mb-3">¿Necesitás asesoría legal?</p>
            <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-secondary text-primary py-3 px-6 rounded-md font-bold no-underline text-sm">
              {content.hero.ctaText}
            </a>
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-secondary font-semibold no-underline text-sm">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
