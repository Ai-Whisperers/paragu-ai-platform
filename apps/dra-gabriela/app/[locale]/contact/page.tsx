// /en/contact + /es/contacto — contact page using PageHero + PageSection.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { MessageCircle, Send, MapPin, Clock, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getContent, isLocale, isPlaceholder, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  const isEs = locale === "es"
  return buildMetadata({
    slug: "contact",
    title: c.contact?.title ? `${c.contact.title} · Dra. Gabriella` : (isEs ? "Contacto" : "Contact"),
    description: isEs ? "Coordiná tu consulta con la Dra. Gabriella González Pane. WhatsApp, horarios y dirección de la clínica en Asunción." : "Book a consultation with Dra. Gabriella González Pane. WhatsApp, hours, and clinic address in Asunción.",
    locale: isEs ? "es" : "en",
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = getContent(locale)
  const isEs = locale === "es"
  const data = c.contact || c.contacto || {}
  const biz = c.business || {}
  const wa = whatsappLink(biz.whatsapp, biz.whatsappMessage)
  const phone = biz.phone && !isPlaceholder(biz.phone) ? String(biz.phone).trim() : null
  const address = biz.address && !isPlaceholder(biz.address) ? String(biz.address).trim() : null
  const hours = c.openingHours || null
  const base = `/${locale}`

  // Cards data
  const contactCards = [
    { key: "whatsapp", icon: MessageCircle, label: "WhatsApp", value: biz.whatsapp || "WhatsApp", sub: isEs ? "Respuesta en menos de 24h" : "Response within 24h", href: wa || `${base}/contact`, primary: true, exists: !!wa },
    { key: "phone", icon: Phone, label: isEs ? "Teléfono" : "Phone", value: phone || "—", sub: isEs ? "Llamadas y WhatsApp" : "Calls and WhatsApp", href: phone ? `tel:${phone.replace(/\D/g, "")}` : "#", primary: false, exists: !!phone },
    { key: "email", icon: Send, label: "Email", value: biz.email || "—", sub: isEs ? "Para facturas y derivaciones" : "For invoices and referrals", href: biz.email && !isPlaceholder(biz.email) ? `mailto:${biz.email}` : "#", primary: false, exists: !!(biz.email && !isPlaceholder(biz.email)) },
    { key: "address", icon: MapPin, label: isEs ? "Dirección" : "Address", value: address || isEs ? "Por confirmar" : "TBD", sub: isEs ? "Acceso y estacionamiento" : "Access and parking", href: "#", primary: false, exists: !!address },
  ].filter((c) => c.exists)

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Contacto" : "Contact"}
        title={data.title || (isEs ? "Contacto y turnos" : "Contact & appointments")}
        subtitle={data.subtitle || (isEs
          ? "Coordinación por WhatsApp. Horarios claros, acceso práctico y disponibilidad real."
          : "WhatsApp coordination. Clear hours, practical access, honest availability.")}
        variant="default"
        align="center"
      >
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
          </a>
        )}
        {phone && (
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="btn btn-outline">
            <Phone className="w-4 h-4" /> {phone}
          </a>
        )}
      </PageHero>

      {/* Contact method cards — 2-col grid */}
      <PageSection layout="wide" py="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon
            const isPrimary = card.primary && card.key === "whatsapp"
            return (
              <a
                key={card.key}
                href={card.href}
                className={
                  isPrimary
                    ? "card p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-0.5 transition-all border-2 border-accent/30 hover:border-[var(--accent)]"
                    : "card p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                }
              >
                <div
                  className={
                    isPrimary
                      ? "w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center flex-shrink-0"
                      : "w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0"
                  }
                >
                  <Icon className={isPrimary ? "w-7 h-7 text-white" : "w-7 h-7 text-[var(--accent)]"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-fg-subtle font-semibold mb-0.5">{card.label}</div>
                  <div className="font-medium text-base break-all">{card.value}</div>
                  {card.sub && <div className="text-xs text-fg-muted mt-0.5">{card.sub}</div>}
                </div>
                {card.key !== "address" && <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />}
              </a>
            )
          })}
        </div>
      </PageSection>

      {/* Hours */}
      {hours && (
        <PageSection layout="wide" py="md">
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl">{isEs ? "Horarios" : "Hours"}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(hours).filter(([k]) => /^(mon|tue|wed|thu|fri|sat|sun)/i.test(k)).map(([day, h]) => (
                <div key={day} className="card-flat p-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-fg-subtle">{day.slice(0, 3)}</span>
                  <span className="text-sm font-mono text-fg">{String(h)}</span>
                </div>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      {/* Sections from contacto.json */}
      {data.sections?.slice(2)?.map((s: any, i: number) => (
        <PageSection key={i} layout="narrow" py="md">
          <h2 className="text-xl mb-2">{s.heading}</h2>
          {s.body && <p className="text-fg-muted leading-relaxed">{s.body}</p>}
          {s.note && <p className="text-xs text-fg-subtle mt-2 italic">{s.note}</p>}
        </PageSection>
      ))}

      {/* Bottom CTA */}
      <PageSection layout="narrow" py="md" bg="muted">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl mb-3">
            {isEs ? "Coordiná tu consulta" : "Schedule a consultation"}
          </h2>
          <p className="text-fg-muted mb-6">
            {isEs
              ? "Respondemos mensajes en menos de 24 horas hábiles."
              : "We respond to messages within 24 business hours."}
          </p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle className="w-4 h-4" />
              {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
            </a>
          ) : (
            <Link href={`${base}/contact`} className="btn btn-primary">
              {isEs ? "Ver datos de contacto" : "See contact details"}
            </Link>
          )}
        </div>
      </PageSection>
    </>
  )
}
