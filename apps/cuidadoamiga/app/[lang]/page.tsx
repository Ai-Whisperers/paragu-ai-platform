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

      {/* FAQ */}
      <FAQ items={faq.items} title={faq.title} />
    </div>
  )
}
