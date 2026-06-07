import { readFileSync, existsSync } from 'fs'
import path from 'path'

function getContent() {
  const p = path.join(process.cwd(), 'content', 'es.json')
  if (!existsSync(p)) return {}
  return JSON.parse(readFileSync(p, 'utf-8'))
}

// Map /sites/granja-cabral/images/ -> /images/
function img(src: string): string {
  if (!src) return ''
  return src.replace('/sites/granja-cabral/images', '/images')
}

const WA = 'https://wa.me/595981324569'

function PromoBanner({ items }: { items: any[] }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-col md:flex-row gap-3 px-4 py-3 bg-[#1a1a2e] text-white text-sm">
      {items.map((p: any, i: number) => (
        <a key={i} href={p.link || '#'}
          className="flex-1 text-center px-4 py-2 rounded-lg font-medium transition-all hover:scale-[1.02]"
          style={{ backgroundColor: p.bgColor || '#333', color: p.textColor || '#fff' }}>
          {p.title}
        </a>
      ))}
    </div>
  )
}

function Header({ nav }: { nav: any }) {
  if (!nav) return null
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥚</span>
          <span className="text-xl font-bold text-[var(--color-foreground)]">{nav.businessName || 'Granja Cabral'}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {(nav.navItems || []).map((item: any, i: number) => (
            <a key={i} href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <a href={nav.ctaHref || WA}
          className="btn-primary text-sm" style={{ backgroundColor: 'var(--color-secondary)' }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {nav.ctaText || 'Pedir por WhatsApp'}
        </a>
      </div>
    </header>
  )
}

function Hero({ hero }: { hero: any }) {
  if (!hero) return null
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e67e22]/90 via-[#d35400]/80 to-[#1a1a2e]/90 z-10" />
      <div className="absolute inset-0 z-0 bg-[url('/images/hero/hero-bg.png')] bg-cover bg-center opacity-30" />
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 text-center text-white">
        {hero.trustBadges?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {hero.trustBadges.map((b: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                ✓ {b}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          {hero.headline || 'Granja Cabral'}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          {hero.subheadline || ''}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={hero.ctaPrimaryHref || WA} className="btn-primary bg-white text-[#e67e22] text-lg px-8 py-4 hover:bg-white/90">
            {hero.ctaPrimaryText || 'Pedir por WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  )
}

function Stats({ items }: { items: any[] }) {
  if (!items?.length) return null
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((s: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-1">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TrustStrip({ items }: { items: any[] }) {
  if (!items?.length) return null
  return (
    <section className="py-8 bg-[#fefcf8] border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((t: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-2xl mb-1">{
              t.icon === 'leaf' ? '🌿' : t.icon === 'bolt' ? '⚡' : t.icon === 'truck' ? '🚚' : '🛡️'
            }</div>
            <div className="font-semibold text-sm">{t.text}</div>
            <div className="text-xs text-gray-500">{t.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Story({ business }: { business: any }) {
  if (!business?.story) return null
  const s = business.story
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Nuestra Historia</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start mt-8">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">{s.mission}</p>
            <p className="text-gray-600 leading-relaxed italic">{s.vision}</p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">Nuestros Valores</h3>
            <ul className="space-y-2">
              {(s.values || []).map((v: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-[var(--color-secondary)] mt-0.5">✓</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {business.sustainability && (
          <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-gray-700 leading-relaxed">{business.sustainability.description}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function Products({ items }: { items: any[] }) {
  if (!items?.length) return null
  const categories = [...new Set(items.map((p: any) => p.category))]
  return (
    <section className="py-16 md:py-20 bg-[#fefcf8]" id="productos">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Nuestros Productos</h2>
        <p className="section-subtitle">Huevos, pollo y fertilizante orgánico — directo de la granja.</p>
        {categories.map((cat: string) => (
          <div key={cat} className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">{cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.filter((p: any) => p.category === cat).map((p: any, i: number) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="h-40 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
                    {p.imageUrl ? (
                      <img src={img(p.imageUrl)} alt={p.name} className="h-full object-contain" />
                    ) : (
                      <span className="text-5xl">🥚</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-lg font-bold text-[var(--color-primary)] mt-1">{p.price}</p>
                    <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                    <a href={WA}
                      className="inline-block mt-3 text-sm font-medium text-[var(--color-secondary)] hover:underline">
                      Pedir por WhatsApp →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process({ process }: { process: any[] }) {
  if (!process?.length) return null
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Así trabajamos</h2>
        <p className="section-subtitle">Del nido a tu mesa en el mismo día.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {process.map((s: any, i: number) => (
            <div key={i} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center text-3xl font-bold text-[var(--color-primary)]">
                {i + 1}
              </div>
              <h4 className="font-semibold text-sm">{s.step}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WholesaleTiers({ tiers }: { tiers: any[] }) {
  if (!tiers?.length) return null
  return (
    <section className="py-16 bg-gradient-to-br from-[#e67e22]/5 to-[#27ae60]/5" id="mayorista">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Planes Mayoristas</h2>
        <p className="section-subtitle">Precios especiales para tu negocio — desde 100 huevos/semana.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {tiers.map((t: any, i: number) => (
            <div key={i} className={`rounded-xl p-6 border-2 text-center ${
              t.recommended ? 'border-[var(--color-primary)] bg-white shadow-lg scale-105' : 'border-gray-200 bg-white'
            }`}>
              {t.recommended && <span className="text-xs font-bold bg-[var(--color-primary)] text-white px-3 py-1 rounded-full mb-3 inline-block">RECOMENDADO</span>}
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{t.volume}</p>
              <p className="text-2xl font-bold text-[var(--color-secondary)] mt-3">{t.discount}</p>
              <a href={WA}
                className="btn-primary bg-[var(--color-primary)] text-sm mt-4 block text-center">
                Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Delivery({ delivery }: { delivery: any }) {
  if (!delivery?.zones?.length) return null
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Zonas de Delivery</h2>
        <p className="section-subtitle">Coronel Oviedo y Ruta 2 (Km 120-150).</p>
        <div className="space-y-3">
          {delivery.zones.map((z: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">{z.name}</h4>
                <p className="text-sm text-gray-500">Mínimo: {z.minOrder} — Envío gratis desde {z.freeShippingAt}</p>
              </div>
              <span className="font-bold text-[var(--color-primary)]">{z.cost}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials({ items }: { items: any[] }) {
  if (!items?.length) return null
  return (
    <section className="py-16 bg-[#fefcf8]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {items.map((t: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="flex gap-1 mb-3">{'⭐'.repeat(t.rating || 5)}</div>
              <p className="text-gray-600 text-sm italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-amber-300 flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ items }: { items: any[] }) {
  if (!items?.length) return null
  const cats = [...new Set(items.map((f: any) => f.category))]
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title">Preguntas Frecuentes</h2>
        <div className="mt-8 space-y-6">
          {cats.map((cat: string) => (
            <div key={cat}>
              <h3 className="font-bold text-lg mb-3 text-[var(--color-primary)]">{cat}</h3>
              <div className="space-y-2">
                {items.filter((f: any) => f.category === cat).map((f: any, i: number) => (
                  <details key={i} className="group border border-gray-200 rounded-lg overflow-hidden">
                    <summary className="cursor-pointer px-4 py-3 font-medium text-sm hover:bg-gray-50 list-none flex items-center justify-between">
                      {f.question}
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                      {f.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery({ images }: { images: string[] }) {
  if (!images?.length) return null
  return (
    <section className="py-16 bg-[#fefcf8]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Conocé la Granja</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {images.map((src: string, i: number) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
              <img src={img(src)} alt={`Granja ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter({ nl }: { nl: any }) {
  if (!nl) return null
  return (
    <section className="py-16 bg-gradient-to-br from-[#27ae60] to-[#1e8449] text-white">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">{nl.title}</h2>
        <p className="text-white/80 mb-6">{nl.subtitle}</p>
        <form className="flex gap-3 max-w-md mx-auto" action="#">
          <input type="email" placeholder={nl.placeholder || 'tu@email.com'}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
          <button type="submit" className="px-6 py-3 bg-[var(--color-accent)] text-gray-900 font-bold rounded-lg hover:bg-yellow-400">
            {nl.submitLabel || 'Suscribirme'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Contact({ contact }: { contact: any }) {
  if (!contact) return null
  return (
    <section className="py-16 bg-white" id="contacto">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">{contact.title}</h2>
        <p className="section-subtitle">{contact.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <a href={WA}
              className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors">
              <span className="text-3xl">💬</span>
              <div>
                <div className="font-bold">WhatsApp</div>
                <div className="text-sm text-gray-600">Respuesta en minutos</div>
              </div>
            </a>
            <a href={`tel:${contact.whatsapp}`}
              className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors">
              <span className="text-3xl">📞</span>
              <div>
                <div className="font-bold">Teléfono</div>
                <div className="text-sm text-gray-600">{contact.whatsapp}</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-3xl">📍</span>
              <div>
                <div className="font-bold">Dirección</div>
                <div className="text-sm text-gray-600">{contact.address}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold mb-4">Horarios de atención</h3>
            <div className="space-y-2 text-sm">
              {Object.entries({
                'Lunes': '07:00 - 18:00',
                'Martes': '07:00 - 18:00',
                'Miércoles': '07:00 - 18:00',
                'Jueves': '07:00 - 18:00',
                'Viernes': '07:00 - 18:00',
                'Sábado': '07:00 - 18:00',
                'Domingo': 'Cerrado'
              }).map(([day, hours]) => (
                <div key={day} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className={day === 'Domingo' ? 'text-red-500' : ''}>{day}</span>
                  <span className={hours === 'Cerrado' ? 'text-red-500 font-medium' : 'font-medium'}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ footer }: { footer: any }) {
  return (
    <footer className="bg-[#1a1a2e] text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🥚</span>
              <span className="text-lg font-bold">{footer?.businessName || 'Granja Cabral'}</span>
            </div>
            <p className="text-sm text-gray-400">Huevos frescos de granja en {footer?.city || 'Coronel Oviedo'}.</p>
            <p className="text-sm text-gray-400 mt-1">Del nido a tu mesa.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Enlaces</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {(footer?.navLinks || []).map((l: any, i: number) => (
                <li key={i}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📱 {footer?.city || 'Coronel Oviedo'}</p>
              <a href={WA} className="block text-[var(--color-secondary)] hover:underline">💬 WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          {footer?.copyright || '© 2026 Granja Cabral'}
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  const content = getContent()
  const c = content
  const home = c.home || {}
  const business = c.business || {}

  return (
    <main className="min-h-screen">
      <Header nav={c.navigation} />
      <PromoBanner items={home.promoBanner?.promotions} />
      <Hero hero={home.hero} />
      <Stats items={home.stats?.items} />
      <TrustStrip items={home.trustBadgesStrip?.items} />
      <Story business={business} />
      <Products items={home.services?.items} />
      <Process process={business.process} />
      <WholesaleTiers tiers={business.wholesaleTiers} />
      <Delivery delivery={business.delivery} />
      <Testimonials items={home.testimonials?.items} />
      <Gallery images={business.gallery} />
      <FAQ items={home.enhancedFaq?.items} />
      <Newsletter nl={home.newsletter} />
      <Contact contact={home.contact} />
      <Footer footer={c.footer} />
      {/* WhatsApp Float */}
      <a href={WA}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        target="_blank" rel="noopener noreferrer">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </main>
  )
}
