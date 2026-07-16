// /en/contact + /es/contacto — contact page using PageHero + PageSection.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { MessageCircle, Send, MapPin, Clock, Phone, ArrowRight, FileText } from "lucide-react"
import Link from "next/link"
import { getContent, isLocale, isPlaceholder, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { ContactForm } from "@/components/ContactForm"
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed"
import { CalendlyLink } from "@/components/CalendlyLink"
import { Breadcrumbs } from "@/components/Breadcrumbs"

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
      <Breadcrumbs items={[
        { name: isEs ? "Inicio" : "Home", href: `/${locale}` },
        { name: isEs ? "Contacto" : "Contact", href: `/${locale}/contact` }
      ]} className="max-w-6xl mx-auto px-4 sm:px-6 pt-6" />
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
          <a href="#form" className="btn btn-primary">
            {isEs ? "Envianos un mensaje" : "Send us a message"}
          </a>
        )}
        {phone && (
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="btn btn-outline">
            <Phone className="w-4 h-4" /> {phone}
          </a>
        )}
      </PageHero>

      {data.disclaimer && (
        <PageSection layout="narrow" py="sm">
          <p className="text-sm text-fg-muted italic leading-relaxed border-l-2 border-accent/40 pl-4">
            {data.disclaimer}
          </p>
        </PageSection>
      )}

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
            {data.sections?.[2]?.note && (
              <p className="text-xs text-fg-subtle mt-4 italic">
                {data.sections[2].note}
              </p>
            )}
          </div>
        </PageSection>
      )}

      {/* Sections from contact.json — skip [0] intro, [1] methods, [2] hours (rendered above) */}
      {data.sections?.slice(3)?.map((s: any, i: number) => (
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
            <a href="#form" className="btn btn-primary">
              {isEs ? "Envianos un mensaje" : "Send us a message"}
            </a>
          )}
        </div>
      </PageSection>

      {/* What to bring + Cancellation policy */}
      
      <PageSection id="mapa" py="md">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
            {isEs ? "Cómo llegar" : "How to find us"}
          </h2>
          <p className="text-fg-muted mb-6 text-left">
            {isEs ? "Estamos en Mburucuyá, Asunción. Dos minutos caminando de la plaza principal." : "We are in Mburucuyá, Asunción. Two minutes walking from the main square."}
          </p>
          <GoogleMapEmbed locale={isEs ? "es" : "en"} />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <CalendlyLink
              variant="primary"
              label={isEs ? "📅 Agendar consulta online" : "📅 Book consultation online"}
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Auditores+de+la+Guerra+del+Chaco+617+Asuncion+Paraguay`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {isEs ? "Cómo llegar →" : "Get directions →"}
            </a>
          </div>
        </div>
      </PageSection>
<PageSection layout="wide" py="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="card-accent card p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl">{isEs ? "Qué traer" : "What to bring"}</h2>
            </div>
            <ul className="space-y-2.5 text-fg-muted text-sm">
              <li className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{isEs ? "Radiografías previas (si tenés, de los últimos 2 años)" : "Previous x-rays (if you have them, within 2 years)"}</span>
              </li>
              <li className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{isEs ? "Lista de medicamentos actuales" : "List of current medications"}</span>
              </li>
              <li className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{isEs ? "Tu pregunta principal en 2-3 oraciones" : "Your main question in 2-3 sentences"}</span>
              </li>
              <li className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{isEs ? "Presupuestos o planes de otras clínicas (si tenés)" : "Quotes or plans from other clinics (if you have them)"}</span>
              </li>
            </ul>
            <Link href={`${base}/first-visit`} className="text-accent text-sm font-medium mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all">
              {isEs ? "Ver más detalles" : "See more details"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="card-accent card p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl">{isEs ? "Política de cancelación" : "Cancellation policy"}</h2>
            </div>
            <p className="text-fg-muted text-sm leading-relaxed mb-3 text-left">
              {isEs
                ? "Si necesitás cancelar o reprogramar, avisame con al menos 24 horas de anticipación por WhatsApp. Sin penalidad, sin cargo."
                : "If you need to cancel or reschedule, let me know at least 24 hours in advance via WhatsApp. No penalty, no charge."}
            </p>
            <p className="text-fg-muted text-sm leading-relaxed text-left">
              {isEs
                ? "Si te ausentás sin aviso, no hay penalidad, pero te pido que reserves el siguiente turno con un pequeño anticipo para confirmar. Si estás enfermo/a o tenés una emergencia, lo entendemos."
                : "If you miss without notice, there's no penalty, but I ask that you book the next appointment with a small deposit to confirm. If you're sick or have an emergency, we understand."}
            </p>
          </div>
        </div>
      </PageSection>
    </>
  )
}
