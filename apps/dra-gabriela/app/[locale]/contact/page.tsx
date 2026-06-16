// Contact page using merged content from getContent()
// Reads business, openingHours, and contacto sections from the merged content object.

import { notFound } from "next/navigation"
import { getContent, isLocale, isPlaceholder, whatsappLink } from "@/lib/content"
import { MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react"

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
  const hours = c.openingHours || data.hours || null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl mb-3">{data.title || (isEs ? "Contacto" : "Contact")}</h1>
      {data.subtitle && <p className="text-lg text-[var(--fg-muted)] mb-12">{data.subtitle}</p>}

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
              <MessageCircle className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">WhatsApp</div>
              <div className="font-semibold">{biz.whatsapp || "WhatsApp"}</div>
            </div>
          </a>
        )}
        {phone && (
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="card p-5 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
              <Mail className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Teléfono" : "Phone"}</div>
              <div className="font-semibold">{phone}</div>
            </div>
          </a>
        )}
        {biz.email && !isPlaceholder(biz.email) && (
          <a href={`mailto:${biz.email}`} className="card p-5 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
              <Send className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">Email</div>
              <div className="font-semibold">{biz.email}</div>
            </div>
          </a>
        )}
        {address && (
          <div className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {Object.entries(hours).filter(([k]) => /^(mon|tue|wed|thu|fri|sat|sun|lun|mar|mie|mié|jue|vie|sab|sáb|dom)/i.test(k)).map(([day, h]) => (
              <div key={day} className="flex justify-between font-mono text-[var(--fg-muted)]">
                <span className="uppercase text-xs text-[var(--fg-subtle)]">{day.slice(0, 3)}</span>
                <span>{String(h)}</span>
              </div>
            ))}
          </div>
          {hours.note && <p className="text-xs text-[var(--fg-subtle)] mt-3">{hours.note}</p>}
        </div>
      )}

      {/* Info sections from contacto JSON */}
      {data.sections?.slice(2).map((s: any, i: number) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl mb-2">{s.heading}</h2>
          {s.body && <p className="text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
        </section>
      ))}
    </div>
  )
}
