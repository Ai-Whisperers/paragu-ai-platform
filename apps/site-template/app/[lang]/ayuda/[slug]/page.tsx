import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { isFeatureEnabled } from "@/lib/features"
import articlesData from "@/content/_shared/help-articles.json"

export async function generateStaticParams() {
  const articles = (articlesData as any).articles || []
  return articles.map((a: any) => ({ slug: a.slug }))
}

export default async function AyudaArticuloPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const l = lang as "es" | "en"
  if (!isFeatureEnabled("support", l)) return null
  const articles = (articlesData as any).articles || []
  const article = articles.find((a: any) => a.slug === slug)
  if (!article) notFound()
  const sameCategory = articles.filter((a: any) => a.category === article.category && a.slug !== article.slug).slice(0, 3)
  return (
    <>
      <Header lang={l} />
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <Link href={`/${l}/ayuda`} className="text-sm text-foreground-light hover:text-primary mb-6 inline-block">← Volver al centro de ayuda</Link>
        <h1 className="font-heading text-3xl font-bold text-primary mb-6">{article.title}</h1>
        <div className="prose prose-lg max-w-none text-foreground">
          {article.content.split("\n\n").map((p: string, i: number) => <p key={i} className="mb-4">{p}</p>)}
        </div>
        {sameCategory.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Artículos relacionados</h3>
            {sameCategory.map((a: any) => <a key={a.slug} href={`/${l}/ayuda/${a.slug}`} className="block text-secondary hover:underline mb-2">{a.title}</a>)}
          </div>
        )}
      </section>
      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
    </>
  )
}
