import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { getBlogPost, isLang, type Lang } from '@/lib/content'
import { getBlog } from '@/lib/content'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang: langRaw, slug } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const post = getBlogPost(slug, lang)

  if (!post) notFound()

  const backLabel = { es: '← Volver al blog', en: '← Back to blog', pt: '← Voltar ao blog' }
  const lastUpdatedLabel = { es: 'Actualizado:', en: 'Updated:', pt: 'Atualizado em:' }
  const readingTimeLabel = { es: 'min de lectura', en: 'min read', pt: 'min de leitura' }

  // Get body in current locale. Falls back to ES, then EN.
  const localizedBody = (post.body && typeof post.body === 'object' && !Array.isArray(post.body)
    ? (post.body[lang] ?? post.body.es ?? post.body.en ?? [])
    : (Array.isArray(post.body) ? post.body : []))

  const wordCount = localizedBody.reduce((acc, p) => acc + p.split(/\s+/).length, 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link href={`/${lang}/blog`} className="text-sm text-rose-600 dark:text-rose-400 hover:underline mb-6 inline-block">
        {backLabel[lang]}
      </Link>

      {post.tags[0] && <Badge tone="rose" className="mb-4">{post.tags[0]}</Badge>}
      <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-3">{post.title}</h1>
      <p className="text-sm text-neutral-500 mb-8">
        {post.date} · {readingTime} {readingTimeLabel[lang]}
        {post.lastUpdated && post.lastUpdated !== post.date && (
          <span className="ml-3 text-neutral-400">· {lastUpdatedLabel[lang]} {post.lastUpdated}</span>
        )}
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
        {localizedBody.length > 0 && (
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {localizedBody.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}