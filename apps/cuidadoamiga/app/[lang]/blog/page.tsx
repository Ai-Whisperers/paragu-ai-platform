import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getBlog, isLang, type Lang } from '@/lib/content'
import type { BlogPost } from '@/lib/content-types'

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const blog = getBlog(lang)
  const pageTitle = { es: 'Blog', en: 'Blog', pt: 'Blog' }
  const readMoreLabel = { es: 'Leer más →', en: 'Read more →', pt: 'Ler mais →' }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="rose" className="mb-4">{pageTitle[lang]}</Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-4">{pageTitle[lang]}</h1>
      <p className="text-base text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
        {blog.intro[lang]}
      </p>
      <div className="flex flex-col gap-6">
        {blog.posts.map((post: BlogPost) => (
          <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
            <Card padding="lg" className="group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">{post.date}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="text-sm text-rose-600 dark:text-rose-400 mt-3 inline-block">
                    {readMoreLabel[lang]}
                  </span>
                </div>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}