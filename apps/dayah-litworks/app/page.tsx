import { PageLayout } from "@/components/page-layout"
import { CtaBanner } from "@/components/cta-banner"
import { ProcessSection } from "@/components/process-section"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const h = content.home
const hero = h.hero
const stats = h.stats.items
const features = h.features
const services = h.services
const portfolio = h.portfolio
const clients = h.clients
const books = h.books
const testimonials = h.testimonials
const process = h.process
const cta = h.finalCta
const phone = content.whatsapp.phone
type Certifications = {
  title?: string
  subtitle?: string
  institutions?: Array<{ url: string; name: string; program: string }>
}
const certifications = (h as unknown as { certifications?: Certifications }).certifications

function matchesPortfolio(testimonial: { book?: string }): string | undefined {
  if (!testimonial.book) return undefined
  const match = portfolio.items.find(
    (p) => testimonial.book && p.title.toLowerCase().includes(testimonial.book.toLowerCase().slice(0, 20))
  )
  return match?.image
}

export default function Home() {
  const bgStyle = hero.image
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.5)), url(${hero.image})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: "var(--color-primary)" }

  return (
    <PageLayout phone={phone}>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[85vh]" style={bgStyle}>
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
          <div className="animate-fade-in rounded-2xl bg-black/20 px-4 py-10 backdrop-blur-sm sm:p-12">
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
              {hero.headline}
            </h1>
            {hero.subheadline && <p className="mx-auto mb-8 max-w-2xl text-sm text-white/90 sm:text-base md:text-lg">{hero.subheadline}</p>}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href={hero.ctaPrimaryHref || "/servicios"}
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground shadow-xs transition-all hover:bg-secondary/90 active:scale-[0.98] sm:w-auto sm:px-10">
                {hero.ctaPrimaryText}
              </a>
              <a href={hero.ctaSecondaryHref || "/premades"} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center rounded-md border-2 border-white/80 px-6 text-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto sm:px-10">
                {hero.ctaSecondaryText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="bg-surface py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-4 gap-3 sm:gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center animate-scale-in" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="text-lg font-bold text-primary sm:text-2xl md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-[10px] font-medium text-muted-foreground leading-tight sm:text-xs md:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {features.items.length > 0 && (
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {features.title && <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">{features.title}</h2>}
            <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {features.items.map((f, i) => (
                <div key={i} className="group rounded-xl border border-border bg-surface p-5 text-center transition-all hover:-translate-y-2 hover:shadow-lg animate-slide-up sm:p-6" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground sm:h-14 sm:w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground sm:text-base">{f.title}</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.institutions && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {certifications.title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{certifications.title}</h2>}
            {certifications.subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base">{certifications.subtitle}</p>}
            {/* Mobile: swipeable scroll, Desktop: flex wrap */}
            <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:overflow-visible sm:pb-0">
              <div className="flex w-max gap-4 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-6">
                {certifications.institutions.map((inst, i) => (
                  <a key={i} href={inst.url} target="_blank" rel="noopener noreferrer"
                    className="group w-36 shrink-0 rounded-xl border border-border bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg animate-scale-in sm:w-44 sm:p-5" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all sm:h-12 sm:w-12">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/></svg>
                    </div>
                    <h3 className="text-xs font-bold text-foreground sm:text-sm">{inst.name}</h3>
                    <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">{inst.program}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio */}
      {portfolio.items.length > 0 && (
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {portfolio.title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{portfolio.title}</h2>}
            {portfolio.subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base">{portfolio.subtitle}</p>}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {portfolio.items.slice(0, 8).map((item, i) => (
                <a key={i} href={`/portafolio/${item.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="aspect-[5/8] overflow-hidden bg-surface">
                    <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-xs font-semibold text-foreground leading-tight sm:text-sm">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">{item.genre}</p>
                  </div>
                </a>
              ))}
            </div>
            {portfolio.items.length > 8 && (
              <div className="mt-8 text-center sm:mt-10">
                <a href="/portafolio" className="inline-block rounded-lg border border-primary px-6 py-2 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:text-sm sm:px-8 sm:py-3">Ver todos los trabajos →</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Clients */}
      {clients && clients.editorials && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {clients.title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{clients.title}</h2>}
            {clients.subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base">{clients.subtitle}</p>}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {clients.editorials.length > 0 && (
                <div className="rounded-xl border border-border bg-background p-5 sm:p-8">
                  <h3 className="mb-4 text-center text-base font-bold text-foreground sm:text-lg">Editoriales</h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                    {(() => {
                      const logoMap: Record<string, string> = {
                        "Editorial Blanco y Negro SAS (Colombia)": "/dayah/logos/editorial-blanco-negro.png",
                        "Castell Ediciones (Paraguay)": "/dayah/logos/castell-ediciones.png",
                        "Arandura Editorial (Paraguay)": "/dayah/logos/arandura.png",
                        "El Lector (Paraguay)": "/dayah/logos/el-lector.png",
                      }
                      return clients.editorials.map((e, i) => {
                        const logo = logoMap[e]
                        return logo ? (
                          <div key={i} className="flex items-center justify-center rounded-xl bg-white p-3 shadow-sm sm:p-5" style={{ width: 140, height: 70 }}>
                            <img src={logo} alt={e} className="max-h-10 max-w-[120px] object-contain sm:max-h-14 sm:max-w-[160px]" />
                          </div>
                        ) : (
                          <div key={i} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm sm:px-4 sm:py-3">
                            <span className="text-xs font-medium text-foreground sm:text-sm">{e}</span>
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>
              )}
              {clients.authors.length > 0 && (
                <div className="rounded-xl border border-border bg-background p-5 sm:p-8">
                  <h3 className="mb-4 text-center text-base font-bold text-foreground sm:text-lg">Autores Bestseller</h3>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {clients.authors.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm sm:px-4 sm:py-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-8 sm:w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <span className="text-xs font-medium text-foreground sm:text-sm">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Books */}
      {books && books.items && (
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {books.title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{books.title}</h2>}
            {books.subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base">{books.subtitle}</p>}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.items.map((b, i) => (
                <div key={i} className="group rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl overflow-hidden animate-scale-in" style={{ animationDelay: `${i * 0.08}s` }}>
                  {b.image ? (
                    <div className="aspect-[5/8] overflow-hidden bg-surface">
                      <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="aspect-[5/8] flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                      <div className="text-center p-4 sm:p-6">
                        <div className="text-2xl mb-1 opacity-30 sm:text-4xl sm:mb-2">📖</div>
                        <p className="text-[10px] text-muted-foreground sm:text-xs">Portada próximamente</p>
                      </div>
                    </div>
                  )}
                  <div className="p-3 sm:p-4">
                    <h3 className="mb-1 text-xs font-bold text-foreground leading-tight sm:text-sm">{b.title}</h3>
                    <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">{b.format}</p>
                    <p className="mb-2 text-[10px] font-medium text-primary leading-relaxed sm:text-xs">{b.achievement}</p>
                    {b.platform && b.platformUrl && (
                      <a href={b.platformUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] font-semibold text-primary hover:underline sm:text-xs">
                        Ver en {b.platform} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {(() => {
              const extra = books as unknown as { ctaText?: string; ctaUrl?: string }
              return extra.ctaText ? (
                <div className="mt-8 text-center sm:mt-12">
                  <a href={extra.ctaUrl || "https://www.amazon.com/author/dayaharaujo"}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-block w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto sm:px-10">
                    {extra.ctaText}
                  </a>
                </div>
              ) : null
            })()}
          </div>
        </section>
      )}

      {/* Services */}
      {services.items.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            {services.title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{services.title}</h2>}
            {services.subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base">{services.subtitle}</p>}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.items.map((s, i) => (
                <div key={i} className="group rounded-xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md sm:p-6">
                  <div className="mb-2">
                    <span className="text-base font-bold text-primary sm:text-lg">{s.price}</span>
                    {s.priceUsd && <span className="ml-2 text-xs text-muted-foreground sm:text-sm">({s.priceUsd})</span>}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground sm:text-base">{s.name}</h3>
                  <p className="mb-2 text-xs text-muted-foreground sm:text-sm">{s.description}</p>
                  <p className="text-[10px] text-muted-foreground mb-2 sm:text-xs">Entrega: {s.delivery}</p>
                  <a href={`https://wa.me/${phone}?text=${encodeURIComponent(s.whatsappCta || "Hola! Quiero cotizar " + s.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-block text-[10px] font-semibold text-primary hover:underline sm:text-xs">Consultar →</a>
                  {s.crossSell && (
                    <p className="mt-2 text-[10px] text-muted-foreground border-t border-border pt-2 sm:text-xs">
                      ✦ Combiná con <span className="text-accent font-medium">{s.crossSell}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:mt-10">
              <a href="/servicios" className="inline-block w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto sm:px-8">Ver todos los servicios</a>
            </div>
          </div>
        </section>
      )}

      <ProcessSection title={process.title} subtitle={process.subtitle} steps={process.steps} accentColor="accent" />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:mb-10 sm:text-3xl">Lo que dicen mis clientes</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => {
                const coverImage = t.book ? matchesPortfolio(t) : undefined
                return (
                  <div key={i} className="rounded-xl border border-border bg-white p-4 shadow-sm flex gap-3 sm:p-6 sm:gap-4">
                    {coverImage && (
                      <div className="shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-surface shadow-sm sm:w-20 sm:h-32">
                        <img src={coverImage} alt={t.book || ""} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="mb-1 flex gap-0.5 text-accent sm:mb-2 sm:gap-1">
                        {[1,2,3,4,5].map((s) => <span key={s} className="text-xs sm:text-base">★</span>)}
                      </div>
                      <p className="mb-2 text-muted-foreground text-xs leading-relaxed sm:text-sm sm:mb-3">&ldquo;{t.text}&rdquo;</p>
                      <p className="font-semibold text-foreground text-xs sm:text-sm">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">{t.country}</p>
                      {(() => {
                        const service = (t as unknown as { service?: string }).service
                        return service ? (
                          <p className="text-[10px] font-medium text-accent mt-1 sm:text-xs">{service}</p>
                        ) : null
                      })()}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title={cta.title} subtitle={cta.subtitle} buttonText={cta.buttonText} buttonHref={cta.buttonHref} phone={phone} />

      {/* Instagram */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Seguí el estudio en Instagram</h2>
          <p className="mb-8 text-sm text-muted-foreground sm:text-base">Portadas, procesos, y contenido exclusivo en @dayah.litworks</p>
          <a
            href="https://www.instagram.com/dayah.litworks/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-xl border-2 border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:max-w-sm sm:p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white sm:h-12 sm:w-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground sm:text-base">@dayah.litworks</p>
              <p className="text-xs text-muted-foreground">Abrir perfil en Instagram →</p>
            </div>
          </a>
        </div>
      </section>

      {/* Newsletter */}
      {h.newsletter && (
        <section className="bg-primary py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-3 text-2xl font-bold text-primary-foreground sm:mb-4 sm:text-3xl">{h.newsletter.title}</h2>
            {h.newsletter.subtitle && <p className="mb-6 text-sm text-primary-foreground/80 sm:text-lg sm:mb-8">{h.newsletter.subtitle}</p>}
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola! Quiero suscribirme al newsletter de Dayah LitWorks")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-block w-full rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/90 active:scale-[0.98] sm:w-auto sm:px-10 sm:py-4"
            >
              {h.newsletter.ctaText || "Suscribirme por WhatsApp"}
            </a>
          </div>
        </section>
      )}
    </PageLayout>
  )
}
