import content from '@/content/es.json'
import site from '@/site.json'

export const dynamic = 'force-static'

const c = content as any
const s = site as any
const home = c.home
const biz = c.business
const loc = s.location
const hours = s.hours

// Schema.org
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': 'https://superspuma.paragu-ai.com/#store',
  name: biz.name,
  legalName: biz.legalName,
  description: home.seo.description,
  url: 'https://superspuma.paragu-ai.com',
  image: 'https://superspuma.paragu-ai.com/og/og-image.png',
  logo: 'https://superspuma.paragu-ai.com/images/logo.png',
  telephone: biz.phone,
  email: biz.email,
  foundingDate: String(biz.founded),
  priceRange: '$$',
  currenciesAccepted: 'PYG',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: loc.address,
    addressLocality: loc.city,
    addressRegion: loc.department,
    addressCountry: loc.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: loc.coordinates.lat,
    longitude: loc.coordinates.lng,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:30', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:30', closes: '12:00' },
  ],
  sameAs: [
    `https://instagram.com/${biz.instagram?.replace('@','')}`,
    `https://facebook.com/${biz.facebook}`,
    `https://linkedin.com/company/${biz.linkedin}`,
  ].filter(Boolean),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo Superspuma',
    itemListElement: home.productCatalog?.products?.slice(0, 8).map((p: any) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: p.name, description: p.description },
      price: p.price?.replace(/[^\d]/g, ''),
      priceCurrency: 'PYG',
      category: p.category,
    })),
  },
}

const nav = [
  { label: 'Inicio',      href: '/' },
  { label: 'Catálogo',    href: '#catalogo' },
  { label: 'Tiendas',     href: '#tiendas' },
  { label: 'Nosotros',    href: '#nosotros' },
  { label: 'Guías',       href: '#guias' },
  { label: 'Contacto',    href: '#contacto' },
]

export default function HomePage() {
  const products = home.productCatalog?.products || []
  const tiers = home.programsComparison?.tiers || []
  const signals = home.trustSignals?.items || []
  const badges = home.trustBadges?.items || []

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 text-white flex items-center justify-center font-bold text-lg">S</span>
            <span className="font-bold text-lg">{biz.name}</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {nav.map(n => (
              <a key={n.label} href={n.href} className="text-gray-700 hover:text-blue-800 transition">{n.label}</a>
            ))}
          </nav>
          <a href={`https://wa.me/${home.productCatalog?.whatsappPhone || '595974202025'}`}
             className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition">
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-blue-300 mb-4">
              Fábrica paraguaya · {new Date().getFullYear() - biz.founded} años
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{home.hero.headline}</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">{home.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#catalogo" className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 font-semibold px-8 py-4 rounded-md hover:bg-blue-50 transition">
                {home.hero.ctaPrimaryText}
              </a>
              <a href={home.hero.ctaSecondaryHref} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-md transition">
                {home.hero.ctaSecondaryText}
              </a>
            </div>
          </div>
        </section>

        {/* Trust signals (4 stats) */}
        <section className="bg-white py-12 -mt-12 relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
              {signals.map((sig: any) => (
                <div key={sig.title} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-blue-800">{sig.value}</p>
                  <p className="font-semibold mt-1">{sig.title}</p>
                  <p className="text-xs text-muted mt-1">{sig.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust badges strip */}
        <section className="bg-slate-50 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{home.trustBadges.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((b: any) => (
                <div key={b.text} className="text-center bg-white p-4 rounded-lg">
                  <p className="font-semibold text-sm">{b.text}</p>
                  <p className="text-xs text-muted mt-1">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs comparison (4 tiers) */}
        <section className="py-20" id="catalogo">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold tracking-widest uppercase text-blue-700 mb-2">{home.programsComparison?.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.programsComparison?.title}</h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">{home.programsComparison?.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((t: any) => (
                <div key={t.id} className={`rounded-2xl p-6 border-2 ${t.highlighted ? 'border-blue-700 shadow-2xl relative' : 'border-gray-200'} bg-white`}>
                  {t.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">{t.badge}</span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                  <p className="text-sm text-muted mb-4 min-h-[3em]">{t.description}</p>
                  <p className="text-2xl font-bold text-blue-800 mb-1">{t.price}</p>
                  <p className="text-xs text-muted mb-4">{t.priceNote}</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    {t.included.map((inc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={t.ctaHref} className={`block text-center font-semibold px-4 py-3 rounded-md transition ${t.highlighted ? 'bg-blue-700 text-white hover:bg-blue-800' : 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50'}`}>
                    {t.ctaLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full product catalog */}
        <section className="bg-slate-50 py-20" id="tienda">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.productCatalog?.title}</h2>
            <p className="text-center text-muted mb-12 max-w-3xl mx-auto">{home.productCatalog?.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p: any) => (
                <div key={p.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{p.category}</span>
                  </div>
                  <p className="text-sm text-muted mb-3 min-h-[4em]">{p.description}</p>
                  <p className="font-bold text-blue-800 mb-3">{p.price}</p>
                  <a href={`https://wa.me/${home.productCatalog?.whatsappPhone}?text=${encodeURIComponent(home.productCatalog?.orderMessageTemplate?.replace('{{productName}}', p.name)?.replace('{{productPrice}}', p.price) || `Hola! Quiero info del colchón ${p.name}`)}`}
                     className="block text-center text-sm bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">
                    {home.productCatalog?.orderButtonText || 'Consultar por WhatsApp'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold tracking-widest uppercase text-blue-700 mb-2">{home.process?.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{home.process?.title}</h2>
            <p className="text-center text-muted mb-12">{home.process?.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {home.process?.steps?.map((step: any) => (
                <div key={step.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">{step.step}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Stores */}
        <section className="bg-blue-900 text-white py-20" id="contacto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Hablemos</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-300 text-sm uppercase tracking-wider">WhatsApp</p>
                    <a href={`https://wa.me/${home.productCatalog?.whatsappPhone}`} className="text-lg hover:text-green-300">{biz.whatsapp}</a>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm uppercase tracking-wider">Teléfono</p>
                    <a href={`tel:${biz.phone}`} className="text-lg hover:text-blue-300">{biz.phone}</a>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm uppercase tracking-wider">Email</p>
                    <a href={`mailto:${biz.email}`} className="text-lg hover:text-blue-300">{biz.email}</a>                  </div>
                  <div>
                    <p className="text-blue-300 text-sm uppercase tracking-wider">Dirección</p>
                    <p className="text-lg">{loc.address}, {loc.city}, {loc.country}</p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm uppercase tracking-wider">Horarios</p>
                    <ul className="text-sm">
                      {Object.entries(hours).map(([day, h]: [string, any]) => (
                        <li key={day}>{day}: {String(h)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Seguinos</h2>
                <div className="flex gap-4 mb-6">
                  {biz.instagram && <a href={`https://instagram.com/${biz.instagram.replace('@','')}`} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md">Instagram</a>}
                  {biz.facebook && <a href={`https://facebook.com/${biz.facebook}`} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md">Facebook</a>}
                  {biz.linkedin && <a href={`https://linkedin.com/company/${biz.linkedin}`} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md">LinkedIn</a>}
                </div>
                <a href={`https://www.google.com/maps?q=${loc.coordinates.lat},${loc.coordinates.lng}`}
                   className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-md hover:bg-blue-50 transition">
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {biz.legalName} · {biz.name} desde {biz.founded}</p>
          <p className="text-blue-300 mt-2">Hecho con 🛏️ en Paraguay</p>
        </div>
      </footer>
    </>
  )
}
