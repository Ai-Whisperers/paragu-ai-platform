import Link from 'next/link'
import { getHome, getFAQ, isLang, type Lang } from '@/lib/content'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CaseMapWrapper } from '@/components/caso/CaseMapWrapper'
import { FAQ } from '@/components/shared/FAQ'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const home = getHome(lang)
  const faq = getFAQ(lang)

  return (
    <div className="flex flex-col">
      {/* Hero — mission + 2 CTAs above the fold */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto w-full">
        <Badge tone="rose" className="mb-4">{home.hero.eyebrow}</Badge>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 bg-gradient-to-br from-rose-700 to-pink-500 bg-clip-text text-transparent">
          {home.hero.headline}
        </h1>
        <p className="text-base md:text-lg text-foreground-muted max-w-2xl mb-8 leading-relaxed">
          {home.hero.subheadline}
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <Link href={home.hero.primaryCta.href}>
            <Button variant="primary" size="lg">{home.hero.primaryCta.label}</Button>
          </Link>
          <Link href={home.hero.secondaryCta.href}>
            <Button variant="outline" size="lg">{home.hero.secondaryCta.label}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl">
          {home.hero.stats.map((s) => (
            <Card key={s.label} variant="inset" padding="md" className="text-center">
              <div className="text-2xl md:text-3xl font-black text-rose-700">{s.value}</div>
              <div className="text-xs text-foreground-muted mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust strip — social proof, transparency, safety */}
      <section className="border-y border-border bg-surface-2">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground-muted">
          <span className="flex items-center gap-2">
            <span className="text-green-700" aria-hidden="true">●</span>
            <span>Código abierto en GitHub</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-rose-700" aria-hidden="true">●</span>
            <span>Sin monetización · Sin tracking de usuarios</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-violet-700" aria-hidden="true">●</span>
            <span>3 moderadoras independientes por caso</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-700" aria-hidden="true">●</span>
            <span>Solo fuentes públicas verificadas</span>
          </span>
        </div>
      </section>

      {/* Map */}
      <section className="w-full" aria-labelledby="map-heading">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <h2 id="map-heading" className="sr-only">Mapa de casos</h2>
        </div>
        <CaseMapWrapper lang={lang} />
      </section>

      {/* Intro */}
      <section className="px-6 py-16 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-black mb-6">{home.intro.title}</h2>
        {home.intro.paragraphs.map((p, i) => (
          <p key={i} className="text-foreground-muted leading-relaxed mb-4">{p}</p>
        ))}
      </section>

      {/* Methodology preview — links to detailed page */}
      <section className="px-6 py-12 max-w-3xl mx-auto w-full">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Cómo se verifica un caso</h2>
          <ol className="space-y-3 text-foreground-muted">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">1</span>
              <span><strong className="text-foreground">Reporte público</strong> — cualquier persona envía un caso con enlace a la fuente pública (nota periodística, denuncia oficial, registro de organización).</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">2</span>
              <span><strong className="text-foreground">3 revisiones independientes</strong> — tres moderadoras verificadas evalúan el caso por separado, sin ver el voto de las otras.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">3</span>
              <span><strong className="text-foreground">Publicación si hay consenso</strong> — el caso se publica en el mapa solo si las 3 moderadoras lo aprueban. Si alguna vota no, se rechaza.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link href="/es/como-funciona" className="text-rose-700 font-semibold hover:underline">
              Ver metodología completa →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faq.items} title={faq.title} />
    </div>
  )
}
