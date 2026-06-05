import { Hero, Testimonials, Stats, Faqs } from '@paragu-ai/engine/content'
import { getSiteMode } from '@paragu-ai/engine/site-mode'

export default async function HomePage() {
  const mode = getSiteMode()
  const [hero, testimonials, stats, faqs] = await Promise.all([
    Hero.get(),
    Testimonials.get(),
    Stats.get(),
    Faqs.get(),
  ])

  return (
    <main className="min-h-screen">
      <section className="px-4 py-12 max-w-6xl mx-auto">
        {hero?.headline && <h1 className="text-4xl font-bold text-center mb-4">{hero.headline}</h1>}
        {hero?.subheadline && <p className="text-xl text-center text-gray-600 mb-8">{hero.subheadline}</p>}
      </section>

      {testimonials?.length ? (
        <section className="px-4 py-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="p-6 rounded-lg" style={{backgroundColor: 'var(--color-surface, #f8f9fa)'}}>
                <p className="mb-2">{t.text || t.quote}</p>
                <p className="text-sm font-semibold">{t.name || t.author}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {stats?.length ? (
        <section className="px-4 py-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s: any, i: number) => (
              <div key={i} className="p-4 rounded-lg text-center" style={{backgroundColor: 'var(--color-surface, #f8f9fa)'}}>
                <div className="text-3xl font-bold">{s.value || s.number}</div>
                <div className="text-sm text-gray-600">{s.label || s.title}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {faqs?.length ? (
        <section className="px-4 py-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f: any, i: number) => (
              <details key={i} className="p-4 rounded-lg" style={{backgroundColor: 'var(--color-surface, #f8f9fa)'}}>
                <summary className="font-semibold">{f.question || f.q}</summary>
                <p className="mt-2">{f.answer || f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="text-center py-12 text-gray-500 text-sm">
        {mode}
      </footer>
    </main>
  )
}
