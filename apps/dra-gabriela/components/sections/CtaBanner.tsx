// Section: CTA Banner — bottom-of-page conversion
// Gradient band with gold accent CTA. Graceful fallback if no WA number.

import Link from "next/link"
import { ArrowRight, MessageCircle, Phone, Clock } from "lucide-react"
import { whatsappLink, isPlaceholder, phoneDisplay } from "@/lib/content"

export function CtaBanner({ c, locale }: { c: any; locale: string }) {
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const phone = phoneDisplay(c.business?.phone)
  const base = `/${locale}`
  const isEs = locale === "es"

  return (
    <section className="section-sm bg-[var(--surface)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] text-white p-10 md:p-16 shadow-xl">
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }} />

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--gold)] mb-4">
              {isEs ? "Coordiná tu consulta" : "Book your consultation"}
            </span>
            <h2 className="text-3xl md:text-4xl md:text-5xl font-heading mb-3 max-w-2xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {(Array.isArray(c.cta) ? c.cta[0]?.title : c.cta?.title) || (isEs
                ? "Plan de tratamiento escrito antes de cualquier paso"
                : "Written treatment plan before any step")}
            </h2>
            <p className="text-white/80 text-lg max-w-xl mb-8 leading-relaxed">
              {(Array.isArray(c.cta) ? c.cta[0]?.subtitle : c.cta?.subtitle) || (isEs
                ? "Evaluación honesta, opciones claras, sin presión."
                : "Honest assessment, clear options, no pressure.")}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-gold text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {isEs ? "Ver datos de contacto" : "See contact details"}
                </Link>
              )}
              {phone ? (
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="btn btn-white text-base px-8 py-4">
                  <Phone className="w-5 h-5" /> {phone}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-white text-base px-8 py-4">
                  {isEs ? "Datos de contacto" : "Contact details"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>

            {!wa && !phone && (
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {isEs
                  ? "Datos de contacto disponibles próximamente. Usá el formulario de la página de contacto."
                  : "Contact details coming soon. Use the form on the contact page."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
