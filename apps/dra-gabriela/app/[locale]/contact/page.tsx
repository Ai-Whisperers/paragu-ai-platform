// Contact page using merged content from getContent() with PageHero.

import { notFound } from "next/navigation"
import { MessageCircle, Mail, MapPin, Clock, Send, Phone, ArrowRight } from "lucide-react"
import { getContent, isLocale, isPlaceholder, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  return { title: c.contact?.title || (locale === "es" ? "Contacto" : "Contact") }
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

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Contacto" : "Contact"}
        title={data.title || (isEs ? "Contacto y turnos" : "Contact & appointments")}
        subtitle={data.subtitle || (isEs
          ? "Coordinación por WhatsApp. Horarios claros, acceso práctico y disponibilidad real."
          : "WhatsApp coordination. Clear hours, practical access, honest availability.")}
        align="center"
        variant="default"
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

      <section className="section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="card-accent card p-6 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">WhatsApp</div>
                  <div className="font-semibold">{biz.whatsapp || "WhatsApp"}</div>
                  {data.subtitle && <div className="text-xs text-[var(--fg-muted)] mt-1">{isEs ? "Respuesta en menos de 24h" : "Response within 24h"}</div>}
                </div>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="card-accent card p-6 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors flex-shrink-0">
                  <Phone className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Teléfono" : "Phone"}</div>
                  <div className="font-semibold">{phone}</div>
                </div>
              </a>
            )}
            {biz.email && !isPlaceholder(biz.email) && (
              <a href={`mailto:${biz.email}`} className="card-accent card p-6 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors flex-shrink-0">
                  <Send className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">Email</div>
                  <div className="font-semibold break-all">{biz.email}</div>
                </div>
              </a>
            )}
            {address && (
              <div className="card-accent card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Dirección" : "Address"}</div>
                  <div className="font-semibold text-sm">{address}</div>
                </div>
              </div>
            )}
          </div>

          {/* Hours */}
          {hours && (
            <div className="card p-6 mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-lg">{isEs ? "Horarios" : "Hours"}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(hours).filter(([k]) => /^(mon|tue|wed|thu|fri|sat|sun)/i.test(k)).map(([day, h]) => (
                  <div key={day} className="card-flat p-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">{day.slice(0, 3)}</span>
                    <span className="text-sm font-mono text-[var(--fg)]">{String(h)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info sections from contacto JSON */}
          {data.sections?.slice(2)?.map((s: any, i: number) => (
            <div key={i} className="mb-8 last:mb-0">
              <h2 className="text-xl mb-2">{s.heading}</h2>
              {s.body && <p className="text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
              {s.note && <p className="text-xs text-[var(--fg-subtle)] mt-1 italic">{s.note}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
