import Link from 'next/link'
import { notFound } from 'next/navigation'
import es from '@/content/es.json'
import en from '@/content/en.json'
import type { SiteContent, BlogPost } from '@/types/content'

const esContent = es as unknown as SiteContent
const enContent = en as unknown as SiteContent

export function generateStaticParams() {
  return esContent.blog.items.map((post: BlogPost) => ({
    slug: post.id,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allPosts = [...esContent.blog.items, ...enContent.blog.items]
  const post = allPosts.find((p: BlogPost) => p.id === slug) as BlogPost | undefined

  if (!post) return notFound()

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-8">
        <div className="container-art">
          <Link href="/blog" className="text-xs sm:text-sm text-zinc-500 hover:text-amber-400 transition-colors">
            ← Volver al blog
          </Link>
        </div>
      </section>

      <article className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] sm:text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-zinc-500 text-xs sm:text-sm">{post.date}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                {post.title}
              </h1>
            </div>

            {/* Cover image */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800/50 overflow-hidden mb-8 sm:mb-12 flex items-center justify-center">
              <div className="text-center p-6 sm:p-8">
                <span className="text-3xl sm:text-5xl">🎨</span>
                <p className="text-zinc-600 text-xs sm:text-sm mt-2">{post.title}</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Share / back */}
            <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link href="/blog" className="text-xs sm:text-sm text-amber-500 hover:text-amber-400 transition-colors">
                ← Más artículos
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
