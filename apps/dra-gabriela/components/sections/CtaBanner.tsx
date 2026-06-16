// Section: CTA Banner
// Bottom-of-page conversion band. Always shown. Falls back to a "tell us
// when" message if WhatsApp/phone are still placeholders — never a broken
// link.

import Link from "next/link"
import { ArrowRight, MessageCircle, Phone, Clock } from "lucide-react"
import { whatsappLink, isPlaceholder, phoneDisplay } from "@/lib/content"

export function CtaBanner({ c, locale }: { c: any; locale: string }) {
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const phone = phoneDisplay(c.business?.phone)
  const base = `/${locale}`
  return (
    <section className="section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white p-8 md:p-12">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--gold)] mb-3">
              {locale === "es" ? "Coordiná tu consulta" : "Book your consultation"}
            </span>
            <h2 className="text-2xl md:text-4xl mb-3 max-w-2xl">
              {c.cta?.title || (locale === "es" ? "Plan de tratamiento escrito antes de cualquier paso" : "Written treatment plan before any step")}
            </h2>
            <p className="text-white/80 max-w-xl mb-6">
              {c.cta?.subtitle || c.cta?.body || (locale === "es" ? "Evaluación honesta, opciones claras, sin presión." : "Honest assessment, clear options, no pressure.")}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <MessageCircle className="w-4 h-4" /> {locale === "es" ? "Escribime por WhatsApp" : "Message on WhatsApp"}
                </a>
              ) : (
                <Link href={`${base}/contacto`} className="btn btn-gold">
                  <MessageCircle className="w-4 h-4" /> {locale === "es" ? "Ver datos de contacto" : "See contact details"}
                </Link>
              )}
              {phone ? (
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="btn btn-ghost text-white border border-white/30 hover:bg-white/10">
                  <Phone className="w-4 h-4" /> {phone}
                </a>
              ) : (
                <Link href={`${base}/contacto`} className="btn btn-ghost text-white border border-white/30 hover:bg-white/10">
                  {locale === "es" ? "Datos de contacto" : "Contact details"} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            {!wa && !phone && (
              <div className="mt-4 text-sm text-white/70 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {locale === "es"
                  ? "Datos de contacto disponibles próximamente. Mientras tanto, usá el formulario de la página de contacto."
                  : "Contact details coming soon. In the meantime, use the form on the contact page."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
