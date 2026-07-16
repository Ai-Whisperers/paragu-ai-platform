import content from '@/content/es.json'

export const dynamic = 'force-static'

const c = content as any
const home = c.home
const biz = c.placeholders
const nav = c.navigation

// TODO(engineer): real phone needed — '+595 981 123 456' is a placeholder
const TODO_PHONE = 'TODO_PHONE'
const telephone = TODO_PHONE

// LocalBusiness + LegalService schema
const schema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: c.siteName,
  description: home.seo.description,
  url: 'https://bufete-mendez.paragu-ai.com',
  image: 'https://bufete-mendez.paragu-ai.com/og/og-image.png',
  ...(telephone !== TODO_PHONE ? { telephone } : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: biz.city,
    addressCountry: 'PY',
  },
  areaServed: { '@type': 'Country', name: 'Paraguay' },
  priceRange: '$$',
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00', closes: '18:00',
  }],
  sameAs: [],
  founder: home.team?.members?.[0] ? { '@type': 'Person', name: home.team.members[0].name } : undefined,
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded bg-primary text-white flex items-center justify-center font-bold">B</span>
            <span className="font-semibold text-lg">{nav.businessName}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.items.map((item: any) => (
              <a key={item.label} href={item.href} className="text-gray-700 hover:text-primary transition">
                {item.label}
              </a>
            ))}
          </nav>
          <a href={nav.ctaHref}
             className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition">
            {nav.ctaText}
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary text-white py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">{c.tagline}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {home.hero.headline}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">
              {home.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={home.hero.ctaPrimaryHref}
                 className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-md transition">
                {home.hero.ctaPrimaryText}
              </a>
              <a href={home.hero.ctaSecondaryHref}
                 className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-md transition">
                {home.hero.ctaSecondaryText}
              </a>
            </div>
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              {home.hero.trustBadges?.map((b: string) => (
                <span key={b} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust badges detail */}
        <section className="bg-surface py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{home.trustBadges.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {home.trustBadges.badges?.map((b: any) => (
                <div key={b.label} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="font-semibold text-primary mb-1">{b.label}</p>
                  <p className="text-sm text-muted">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.services.title}</h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">{home.services.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {home.services.categories?.map((cat: any) => (
                <div key={cat.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{cat.title}</h3>
                  <p className="text-sm text-muted mb-4">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.items?.map((item: any) => (
                      <li key={item.name} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-0.5">▸</span>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted"> — {item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-surface py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{home.process.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {home.process.steps?.map((step: any) => (
                <div key={step.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.team.title}</h2>
            <p className="text-center text-muted mb-12">{home.team.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {home.team.members?.map((m: any) => (
                <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {m.name.split(' ').slice(-1)[0][0]}
                  </div>
                  <h3 className="font-semibold text-center mb-1">{m.name}</h3>
                  <p className="text-sm text-accent text-center mb-3">{m.role}</p>
                  <p className="text-xs text-muted text-center">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.caseStudies.title}</h2>
            <p className="text-center opacity-80 mb-12">{home.caseStudies.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {home.caseStudies.cases?.map((cs: any) => (
                <div key={cs.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <span className="text-xs uppercase tracking-wider text-accent font-semibold">{cs.area}</span>
                  <h3 className="font-semibold text-lg mt-2 mb-3">{cs.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{cs.description}</p>
                  <p className="text-sm font-semibold text-accent">→ {cs.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{home.faq.title}</h2>
            <div className="space-y-3">
              {home.faq.items?.map((item: any, i: number) => (
                <details key={i} className="bg-surface rounded-lg p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-accent text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-muted mt-3 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesitás asesoramiento legal?</h2>
            <p className="text-lg opacity-90 mb-8">
              Primera consulta sin cargo. Atención presencial o por videollamada.
            </p>
            <a href={home.hero.ctaPrimaryHref}
               className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-md transition">
              {home.hero.ctaPrimaryText}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-9 h-9 rounded bg-accent text-white flex items-center justify-center font-bold">B</span>
                <span className="font-semibold">{nav.businessName}</span>
              </div>
              <p className="text-sm opacity-80">{c.tagline}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Navegación</h3>
              <ul className="space-y-1 text-sm opacity-80">
                {nav.items.map((item: any) => (
                  <li key={item.label}><a href={item.href} className="hover:text-accent">{item.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Contacto</h3>
              <p className="text-sm opacity-80 mb-1">{biz.city}, Paraguay</p>
              <a href={nav.ctaHref} className="text-sm text-accent hover:underline">WhatsApp →</a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center text-xs opacity-60">
            © {biz.year} {c.siteName}. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  )
}
