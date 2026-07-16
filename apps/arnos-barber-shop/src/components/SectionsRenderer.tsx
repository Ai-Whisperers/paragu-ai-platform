import { Header } from "./Header"
import { Footer } from "./Footer"

type AnyContent = Record<string, any>

function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

function ScissorsArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art-ring hero-art-ring-one" />
      <div className="hero-art-ring hero-art-ring-two" />
      <svg viewBox="0 0 320 320" role="presentation" focusable="false">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="14">
          <circle cx="82" cy="224" r="36" />
          <circle cx="150" cy="242" r="36" />
          <path d="M108 202L248 72" />
          <path d="M142 215L244 116" />
          <path d="M119 205L255 247" />
          <path d="M150 215L258 174" />
          <circle cx="132" cy="211" r="9" fill="currentColor" stroke="none" />
        </g>
      </svg>
      <span>{"Detalle · oficio · precisión"}</span>
    </div>
  )
}

function ServiceCard({ service, phone, index }: { service: AnyContent; phone: string; index: number }) {
  return (
    <article className="service-card">
      <div className="service-index">{String(index + 1).padStart(2, "0")}</div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="service-meta">
        <span>{service.duration}</span>
        <strong>{service.price}</strong>
      </div>
      <a href={whatsappUrl(phone, service.message)} target="_blank" rel="noopener noreferrer" data-cta={`service-${index + 1}`}>
        Consultar este servicio <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}

function Placeholder({ title, text, action, href }: { title: string; text: string; action?: string; href?: string }) {
  return (
    <div className="honest-placeholder">
      <div className="placeholder-lines" aria-hidden="true"><span /><span /><span /></div>
      <p className="eyebrow">Contenido real, no inventado</p>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && href && <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{action} <span aria-hidden="true">↗</span></a>}
    </div>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function TrustItem({ title, description }: { title: string; description: string }) {
  return (
    <article className="trust-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

function ScheduleRow({ day, open, close, status }: { day: string; open: string | null; close: string | null; status: string }) {
  return (
    <li className={`schedule-row ${status}`}>
      <span className="schedule-day">{day}</span>
      <span className="schedule-hours">
        {open && close ? `${open} – ${close}` : "Cerrado"}
      </span>
      <span className={`schedule-status status-${status}`}>
        <span aria-hidden="true">●</span> {status === "open" ? "Abierto" : status === "soon" ? "Próximo" : "Cerrado"}
      </span>
    </li>
  )
}

export function SectionsRenderer({ content }: { content: AnyContent }) {
  const phone = content.site.whatsapp
  const bookingUrl = whatsappUrl(phone, content.contact.whatsappMessage)
  const lines = String(content.hero.headline).split("\n")
  const heroHeadlineLines = lines.length > 1 ? lines : [lines[0]?.slice(0, Math.ceil(lines[0]?.length / 2)).trim(), lines[0]?.slice(Math.ceil(lines[0]?.length / 2)).trim()]

  return (
    <>
      <Header navigation={content.navigation} />
      <main>
        <section id="inicio" className="hero-section">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <div className="hero-meta">
                <p className="eyebrow">{content.hero.eyebrow}</p>
                <span className="hero-badge" aria-label="Estado de la barbería">
                  <span aria-hidden="true" /> {content.hero.badge}
                </span>
              </div>
              <h1 className="hero-headline">
                {heroHeadlineLines.map((line: string, i: number) => (
                  <span key={i} className="hero-headline-line">{line}</span>
                ))}
              </h1>
              <p className="hero-description">{content.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={content.hero.ctaPrimaryHref} target="_blank" rel="noopener noreferrer" data-cta="hero-booking">
                  {content.hero.ctaPrimaryText} <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-secondary" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondaryText}</a>
              </div>
              <ul className="trust-list" aria-label="Información rápida">
                {content.hero.trustItems.map((item: string) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
            </div>
            <ScissorsArt />
          </div>
        </section>

        <section className="metrics-strip" aria-label="Indicadores operativos">
          <div className="site-container metrics-grid">
            {content.metrics.items.map((metric: AnyContent) => (
              <MetricCard key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </section>

        <section id="servicios" className="section section-paper">
          <div className="site-container">
            <SectionHeading eyebrow={content.services.eyebrow} title={content.services.title} intro={content.services.intro} />
            <div className="service-grid">
              {content.services.items.map((service: AnyContent, index: number) => (
                <ServiceCard key={service.title} service={service} phone={phone} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="section section-dark">
          <div className="site-container">
            <SectionHeading eyebrow={content.experience.eyebrow} title={content.experience.title} intro={content.experience.intro} light />
            <div className="process-grid">
              {content.experience.items.map((item: AnyContent) => (
                <article key={item.number} className="process-card">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="site-container">
            <SectionHeading eyebrow={content.trust.eyebrow} title={content.trust.title} />
            <div className="trust-grid">
              {content.trust.items.map((item: AnyContent) => (
                <TrustItem key={item.title} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </section>

        <section id="trabajos" className="section section-paper">
          <div className="site-container split-section">
            <SectionHeading eyebrow={content.gallery.eyebrow} title={content.gallery.title} intro={content.gallery.intro} />
            <Placeholder title="Próximamente: trabajos reales" text={content.gallery.placeholder} action={content.gallery.ctaText} href={content.gallery.ctaHref} />
          </div>
        </section>

        <section id="equipo" className="section section-dark">
          <div className="site-container split-section">
            <SectionHeading eyebrow={content.team.eyebrow} title={content.team.title} intro={content.team.intro} light />
            <Placeholder title="Perfiles del equipo" text={content.team.placeholder} action={content.team.ctaText} href={content.team.ctaHref} />
          </div>
        </section>

        <section className="section section-paper">
          <div className="site-container">
            <SectionHeading eyebrow={content.testimonials.eyebrow} title={content.testimonials.title} intro={content.testimonials.intro} />
            <Placeholder title="Pronto publicaremos voces verificadas" text={content.testimonials.placeholder} action={content.testimonials.ctaText} href={content.testimonials.ctaHref} />
          </div>
        </section>

        <section id="horarios" className="section section-sand">
          <div className="site-container schedule-grid">
            <div>
              <SectionHeading eyebrow={content.schedule.eyebrow} title={content.schedule.title} intro={content.schedule.intro} />
              <p className="schedule-note">{content.schedule.note}</p>
              <ul className="schedule-list" aria-label="Horarios semanales">
                {content.schedule.weekly.map((row: AnyContent) => {
                  const isOpen = !!row.open
                  const status = !isOpen ? "closed" : "open"
                  return <ScheduleRow key={row.day} day={row.day} open={row.open} close={row.close} status={status} />
                })}
              </ul>
            </div>
            <div className="schedule-side">
              <div className="schedule-card">
                <p className="eyebrow">Medios de pago</p>
                <ul>
                  {content.schedule.payments.map((payment: string) => <li key={payment}>{payment}</li>)}
                </ul>
              </div>
              <div className="schedule-card schedule-policy">
                <p className="eyebrow">Política del local</p>
                <ul>
                  {content.schedule.policy.map((line: string) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="ubicacion" className="section section-paper">
          <div className="site-container location-grid">
            <div>
              <SectionHeading eyebrow={content.location.eyebrow} title={content.location.title} intro={content.location.description} />
              <address>{content.location.address}</address>
              <div className="location-actions">
                <a className="button button-dark" href={content.location.mapHref} target="_blank" rel="noopener noreferrer">{content.location.mapCta} <span aria-hidden="true">↗</span></a>
                <a className="text-link dark-link" href={bookingUrl} target="_blank" rel="noopener noreferrer">Pedir ubicación exacta</a>
              </div>
            </div>
            <div className="location-card" aria-label="Referencia de ubicación">
              <div className="map-grid" aria-hidden="true" />
              <span className="map-pin" aria-hidden="true" />
              <div>
                <strong>San Lorenzo</strong>
                <p>Ubicación final a confirmar al reservar</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section section-paper">
          <div className="site-container faq-layout">
            <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} intro="Respuestas honestas para evitar sorpresas antes del turno." />
            <div className="faq-list">
              {content.faq.items.map((item: AnyContent, index: number) => (
                <details key={item.question} open={index === 0}>
                  <summary aria-expanded="false">{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="site-container final-cta-inner">
            <div>
              <p className="eyebrow">Reserva directa</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.subtitle}</p>
            </div>
            <a className="button button-whatsapp" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-cta="final-booking">
              {content.contact.ctaLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <a className="whatsapp-float" href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label="Reservar por WhatsApp" title="Reservar por WhatsApp" data-cta="floating-whatsapp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-2.1-1-3.5-2.5-4.5-4.5-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.7 6c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.3-.5-.4M12 21.8c-1.8 0-3.6-.5-5.1-1.4L1.2 22l1.5-5.5A10 10 0 1 1 12 21.8m0-18.2a8.2 8.2 0 0 0-7 12.5l.2.3-.9 3.3 3.4-.9.3.2A8.2 8.2 0 1 0 12 3.6" /></svg>
      </a>
      <Footer content={content as any} />
    </>
  )
}
