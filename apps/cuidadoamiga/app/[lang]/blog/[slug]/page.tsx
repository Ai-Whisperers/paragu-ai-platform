import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getBlogPost, getBlog, isLang, type Lang } from '@/lib/content'

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link href={`/${lang}/blog`} className="text-sm text-rose-600 dark:text-rose-400 hover:underline mb-6 inline-block">
        {backLabel[lang]}
      </Link>

      <Badge tone="rose" className="mb-4">{post.tags[0]}</Badge>
      <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-3">{post.title}</h1>
      <p className="text-sm text-neutral-500 mb-8">{post.date}</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
        <p className="text-neutral-500 mt-4 italic">
          {lang === 'es' ? 'Contenido completo próximamente.' : lang === 'en' ? 'Full content coming soon.' : 'Conteúdo completo em breve.'}
        </p>
      </div>
    </div>
  )
}
