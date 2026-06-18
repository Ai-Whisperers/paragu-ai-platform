// /en/contact + /es/contacto — contact page using PageHero + PageSection.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { MessageCircle, Send, MapPin, Clock, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getContent, isLocale, isPlaceholder, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { ContactForm } from "@/components/ContactForm"

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

  // Cards data — only show cards that have real data (not PENDING/TBD).
  // While the business info is still placeholder, we still show a
  // contact card pointing to the contact form (a graceful fallback).
  const contactCards: Array<{
    key: string
    icon: any
    label: string
    value: string
    sub: string
    href: string
    primary?: boolean
  }> = []
  if (wa) {
    contactCards.push({
      key: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      value: isEs ? "Coordinar por WhatsApp" : "Message on WhatsApp",
      sub: isEs ? "Respuesta en menos de 24h" : "Response within 24h",
      href: wa,
      primary: true,
    })
  }
  if (phone) {
    contactCards.push({
      key: "phone",
      icon: Phone,
      label: isEs ? "Teléfono" : "Phone",
      value: phone,
      sub: isEs ? "Llamadas y WhatsApp" : "Calls and WhatsApp",
      href: `tel:${phone.replace(/\D/g, "")}`,
    })
  }
  if (biz.email && !isPlaceholder(biz.email)) {
    contactCards.push({
      key: "email",
      icon: Send,
      label: "Email",
      value: biz.email,
      sub: isEs ? "Para facturas y derivaciones" : "For invoices and referrals",
      href: `mailto:${biz.email}`,
    })
  }
  if (address) {
    contactCards.push({
      key: "address",
      icon: MapPin,
      label: isEs ? "Dirección" : "Address",
      value: address,
      sub: isEs ? "Acceso y estacionamiento" : "Access and parking",
      href: "#",
    })
  }
  // Fallback: if no cards have real data, show the contact form as a card
  if (contactCards.length === 0) {
    contactCards.push({
      key: "form",
      icon: MessageCircle,
      label: isEs ? "Formulario de contacto" : "Contact form",
      value: isEs ? "Envianos un mensaje" : "Send us a message",
      sub: isEs
        ? "Te respondemos por email en menos de 24 horas hábiles."
        : "We'll reply by email within 24 business hours.",
      href: `${base}/contact#form`,
      primary: true,
    })
  }

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
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
          </a>
        ) : biz.email && !isPlaceholder(biz.email) ? (
          <a href={`mailto:${biz.email}?subject=${encodeURIComponent(
            isEs ? "Consulta — Dra. Gabriella" : "Consultation — Dra. Gabriella"
          )}`} className="btn btn-primary">
            <Send className="w-4 h-4" />
            {isEs ? "Escribime por email" : "Email me"}
          </a>
        ) : (
          <Link href={`${base}/contact`} className="btn btn-primary">
            {isEs ? "Ver datos de contacto" : "See contact details"}
          </Link>
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
                    ? "card p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-0.5 transition-all border-2 border-accent/30 hover:border-accent"
                    : "card p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                }
              >
                <div
                  className={
                    isPrimary
                      ? "w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0"
                      : "w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center flex-shrink-0"
                  }
                >
                  <Icon className={isPrimary ? "w-7 h-7 text-white" : "w-7 h-7 text-accent"} />
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

      {/* Contact form — always shown, primary fallback when WA/phone aren't set */}
      <PageSection layout="wide" py="md" bg="muted">
        <div id="form" className="max-w-3xl mx-auto scroll-mt-24">
          <div className="text-center mb-8">
            <span className="eyebrow inline-flex">
              <Send className="w-3 h-3" />
              {isEs ? "Formulario" : "Form"}
            </span>
            <h2 className="text-2xl md:text-3xl mb-2">
              {isEs ? "Envianos un mensaje" : "Send us a message"}
            </h2>
            <p className="text-fg-muted max-w-lg mx-auto">
              {isEs
                ? "Te respondemos por email en menos de 24 horas hábiles."
                : "We'll reply by email within 24 business hours."}
            </p>
          </div>
          <ContactForm locale={locale} />
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
          ) : biz.email && !isPlaceholder(biz.email) ? (
            <a href={`mailto:${biz.email}?subject=${encodeURIComponent(
              isEs ? "Consulta — Dra. Gabriella" : "Consultation — Dra. Gabriella"
            )}`} className="btn btn-primary">
              <Send className="w-4 h-4" />
              {isEs ? "Escribime por email" : "Email me"}
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
