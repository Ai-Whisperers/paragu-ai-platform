import { readFileSync, existsSync } from 'fs'
import path from 'path'

type LandingBlock =
  | { type: 'hero'; title: string; subheadline?: string; ctaPrimaryText?: string; ctaPrimaryHref?: string; ctaSecondaryText?: string; ctaSecondaryHref?: string; trustBadges?: string[] }
  | { type: 'trust'; eyebrow?: string; title: string; items: { title: string; description?: string; icon?: string }[] }
  | { type: 'programs'; eyebrow?: string; title?: string; subtitle?: string; tiers: { id: string; name: string; price?: string; description?: string; badge?: string; highlighted?: boolean; included?: string[]; ctaLabel?: string; ctaHref?: string }[] }
  | { type: 'testimonials'; eyebrow?: string; title?: string; items: { quote: string; author: string; role?: string; rating?: number }[] }
  | { type: 'whyCountry'; eyebrow?: string; title?: string; pillars: { title: string; description?: string; bullets?: string[] }[] }
  | { type: 'process'; eyebrow?: string; title?: string; steps: { title: string; description?: string; icon?: string }[] }
  | { type: 'stats'; items: { value: string; label: string; icon?: string }[] }
  | { type: 'beneluxDesk'; title?: string; subtitle?: string; items: { title: string; description?: string; icon?: string }[] }
  | { type: 'finalCta'; title?: string; subtitle?: string; buttonText?: string; buttonHref?: string }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'blog'; section: { title?: string; subtitle?: string; items: { title: string; slug?: string; excerpt?: string; date?: string }[] } }

function loadContent(lang: 'es' | 'en' | 'de' | 'nl') {
  const candidates = [
    path.join(process.cwd(), 'content', `${lang}.json`),
    ...(['en', 'de', 'nl'] as const).map(l => path.join(process.cwd(), 'content', l, 'index.json')),
    path.join(process.cwd(), 'content', 'es', 'index.json'),
  ]
  for (const file of candidates) {
    if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf-8')) as Record<string, unknown>
  }
  return {} as Record<string, unknown>
}

function getBlock(blockId: string, payload: Record<string, unknown> | undefined): LandingBlock | null {
  if (!payload) return null
  const source = (payload as Record<string, unknown>)[blockId]
  if (!source || typeof source !== 'object') return null
  return source as LandingBlock
}

export default function HomePage() {
  const content = loadContent('es') as Record<string, unknown>
  const home = (content?.home ?? {}) as NonNullable<Record<string, unknown>>

  const hero = getBlock('hero', home as Record<string, unknown>)
  const trust = getBlock('trust', home as Record<string, unknown>)
  const programs = getBlock('programs', home as Record<string, unknown>)
  const testimonials = getBlock('testimonials', home as Record<string, unknown>)
  const whyCountry = getBlock('whyCountry', home as Record<string, unknown>)
  const process = getBlock('process', home as Record<string, unknown>)
  const stats = getBlock('stats', home as Record<string, unknown>)
  const beneluxDesk = getBlock('beneluxDesk', home as Record<string, unknown>)
  const finalCta = getBlock('finalCta', home as Record<string, unknown>)
  const faq = getBlock('faq', home as Record<string, unknown>)

  const sectionClass = 'px-4 py-12 max-w-6xl mx-auto'

  return (
    <main className="min-h-screen">
      {hero ? (
        <section className={sectionClass}>
          {hero.title && <h1 className="text-4xl font-bold text-center mb-4">{hero.title}</h1>}
          {hero.subheadline && <p className="text-xl text-center text-gray-600 mb-6">{hero.subheadline}</p>}
          <div className="flex justify-center gap-4">
            {hero.ctaPrimaryText && (
              <a href={hero.ctaPrimaryHref ?? '#'} className="px-5 py-3 rounded bg-black text-white">{hero.ctaPrimaryText}</a>
            )}
            {hero.ctaSecondaryText && (
              <a href={hero.ctaSecondaryHref ?? '#'} className="px-5 py-3 rounded border">{hero.ctaSecondaryText}</a>
            )}
          </div>
          {hero.trustBadges?.length ? (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {hero.trustBadges.map((badge, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border text-sm">{badge}</span>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {whyCountry ? (
        <section className={sectionClass}>
          {whyCountry.title && <h2 className="text-2xl font-semibold mb-6">{whyCountry.title}</h2>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(whyCountry.pillars ?? []).map((pillar, i) => (
              <div key={i} className="p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                <p className="text-gray-700 mb-3">{pillar.description}</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {(pillar.bullets ?? []).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {process ? (
        <section className={sectionClass}>
          {process.title && <h2 className="text-2xl font-semibold mb-6">{process.title}</h2>}
          <ol className="space-y-4 max-w-3xl">
            {(process.steps ?? []).map((step, i) => (
              <li key={i} className="p-4 rounded-xl border">
                <div className="font-semibold">{step.title}</div>
                {step.description && <p className="text-gray-700 mt-1">{step.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {programs ? (
        <section className={sectionClass}>
          <h2 className="text-2xl font-semibold mb-2">{programs.title ?? 'Programas'}</h2>
          <p className="text-gray-700 mb-6">{programs.subtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(programs.tiers ?? []).map((tier) => (
              <div key={tier.id} className={`p-5 rounded-xl border ${tier.highlighted ? 'border-black shadow-lg scale-[1.02]' : ''}`}>
                {tier.badge && <span className="text-xs font-semibold px-2 py-1 bg-black/10 rounded-full inline-block mb-3">{tier.badge}</span>}
                <div className="font-semibold">{tier.name}</div>
                <div className="text-2xl font-bold my-2">{tier.price ?? 'Consultar'}</div>
                <p className="text-sm text-gray-700 mb-3">{tier.description}</p>
                <ul className="text-sm space-y-1 mb-4">
                  {(tier.included ?? []).map((item, idx) => (
                    <li key={idx} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
                {tier.ctaLabel && <a href={tier.ctaHref ?? '#'} className="text-sm font-semibold underline">{tier.ctaLabel}</a>}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {stats ? (
        <section className={sectionClass}>
          <h2 className="text-2xl font-semibold mb-6">Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(stats.items ?? []).map((item, i) => (
              <div key={i} className="p-4 rounded-xl border text-center">
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm text-gray-700 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {beneluxDesk ? (
        <section className={sectionClass}>
          <h2 className="text-2xl font-semibold mb-2">{beneluxDesk.title}</h2>
          <p className="text-gray-700 mb-6">{beneluxDesk.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {(beneluxDesk.items ?? []).map((item, i) => (
              <div key={i} className="p-5 rounded-xl border text-center">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {trust ? (
        <section className={sectionClass}>
          {trust.title && <h2 className="text-2xl font-semibold mb-6">{trust.title}</h2>}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(trust.items ?? []).map((item, i) => (
              <div key={i} className="p-5 rounded-xl border">
                <div className="font-semibold mb-1">{item.title}</div>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {testimonials ? (
        <section className={sectionClass}>
          {testimonials.title && <h2 className="text-2xl font-semibold mb-6">{testimonials.title}</h2>}
          <div className="grid md:grid-cols-3 gap-6">
            {(testimonials.items ?? []).map((item, i) => (
              <div key={i} className="p-5 rounded-xl border">
                <p className="text-gray-800 mb-3">“{item.quote}”</p>
                <div className="text-sm font-semibold">{item.author}</div>
                {item.role && <div className="text-sm text-gray-600">{item.role}</div>}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {finalCta ? (
        <section className={sectionClass}>
          <h2 className="text-3xl font-bold mb-2">{finalCta.title}</h2>
          <p className="text-gray-700 mb-5">{finalCta.subtitle}</p>
          {finalCta.buttonText && (
            <a href={finalCta.buttonHref ?? '#'} className="px-6 py-3 rounded bg-black text-white">{finalCta.buttonText}</a>
          )}
        </section>
      ) : null}
    </main>
  )
}
