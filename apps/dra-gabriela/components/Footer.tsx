"use client"
// Footer with proper structure: 3-col grid on desktop, stacked on mobile.
// Left-aligned text. Brand badge with monogram. Hours table.
//
// "use client" because the Cookie settings button dispatches a window event
// that the CookieConsent component listens to (see components/CookieConsent.tsx).

import Link from "next/link"
import { Mail, MessageCircle, MapPin, Phone, Clock, AtSign, type LucideIcon } from "lucide-react"
import { whatsappLink, phoneDisplay, isPlaceholder } from "@/lib/content"

export function Footer({ locale, content }: { locale: string; content: any }) {
  const c = content
  const base = `/${locale}`
  const wa = whatsappLink(c.business?.whatsapp)
  const phone = phoneDisplay(c.business?.phone)
  const address = !isPlaceholder(c.business?.address) ? c.business.address : null
  const hasHours = c.openingHours && Object.keys(c.openingHours).length > 0
  const isEs = locale === "es"
  const localize = (href: string) => {
    if (!href || href === "/" || href === `/${locale}`) return ""
    return href.replace(/^\/(en|es)/, "") || "/"
  }

  return (
    <footer className="tone-ocean-8 text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-left">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-yellow flex items-center justify-center text-navy text-xs font-semibold">
                DG
              </span>
              <h3 className="text-lg text-white font-medium">{c.site?.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/65 mb-5 max-w-xs">
              {c.site?.description ?? c.site?.metaDescription}
            </p>
            <ul className="space-y-2 text-sm">
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" /> {phone}
                  </a>
                </li>
              )}
              {c.business?.email && !isPlaceholder(c.business.email) && (
                <li>
                  <a href={`mailto:${c.business.email}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors break-all">
                    <Mail className="w-4 h-4 flex-shrink-0" /> {c.business.email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </li>
              )}
              {c.business?.instagram && !isPlaceholder(c.business.instagram) && (
                <li>
                  <a
                    href={c.business.instagramUrl || `https://instagram.com/${c.business.instagram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-gold transition-colors"
                  >
                    <AtSign className="w-4 h-4" /> {c.business.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Services + Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {isEs ? "Servicios" : "Services"}
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href={`${base}/second-opinion`} className="hover:text-white transition-colors">{isEs ? "Segunda opinión" : "Second opinion"}</Link></li>
              <li><Link href={`${base}/pricing`} className="hover:text-white transition-colors">{isEs ? "Precios" : "Pricing"}</Link></li>
              <li><Link href={`${base}/services`} className="hover:text-white transition-colors">{isEs ? "Servicios" : "Services"}</Link></li>
              <li><Link href={`${base}/expat`} className="hover:text-white transition-colors">Expat</Link></li>
            </ul>

            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 mt-8">
              {isEs ? "Empresa" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`${base}/about`} className="hover:text-white transition-colors">{isEs ? "Sobre mí" : "About"}</Link></li>
              <li><Link href={`${base}/faq`} className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href={`${base}/process`} className="hover:text-white transition-colors">{isEs ? "Proceso" : "Process"}</Link></li>
              <li><Link href={`${base}/blog`} className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href={`${base}/reviews`} className="hover:text-white transition-colors">{isEs ? "Reseñas" : "Reviews"}</Link></li>
              <li><Link href={`${base}/clinic`} className="hover:text-white transition-colors">{isEs ? "La clínica" : "The clinic"}</Link></li>
              <li><Link href={`${base}/first-visit`} className="hover:text-white transition-colors">{isEs ? "Primera visita" : "First visit"}</Link></li>
              <li><Link href={`${base}/insurance`} className="hover:text-white transition-colors">{isEs ? "Seguro y pago" : "Insurance & payment"}</Link></li>
              <li><Link href={`${base}/patient-rights`} className="hover:text-white transition-colors">{isEs ? "Derechos del paciente" : "Patient rights"}</Link></li>
              <li><Link href={`${base}/privacy`} className="hover:text-white transition-colors">{isEs ? "Privacidad" : "Privacy"}</Link></li>
              <li><Link href={`${base}/terms`} className="hover:text-white transition-colors">{isEs ? "Términos" : "Terms"}</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("dra-gp:reopen-cookie-consent"))
                    }
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  {isEs ? "Preferencias de cookies" : "Cookie settings"}
                </button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
              {isEs ? "Horarios" : "Hours"}
            </h4>
            {hasHours && (
              <ul className="text-sm space-y-1.5 text-white/65 font-mono">
                {Object.entries(c.openingHours).filter(([k]) => /^(mon|tue|wed|thu|fri|sat|sun)/i.test(k)).map(([day, h]) => (
                  <li key={day} className="flex justify-between gap-3 max-w-[14rem]">
                    <span className="uppercase tracking-wider text-xs">{day.slice(0, 3)}</span>
                    <span>{String(h)}</span>
                  </li>
                ))}
              </ul>
            )}
            {c.business?.ruc && !isPlaceholder(c.business.ruc) && (
              <p className="text-xs text-white/50 mt-6">RUC: {c.business.ruc}</p>
            )}
            {c.business?.mspbs && !isPlaceholder(c.business.mspbs) && (
              <p className="text-xs text-white/50">MSPBS: {c.business.mspbs}</p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {c.site?.name}. {isEs ? "Todos los derechos reservados." : "All rights reserved."}</p>
          <p>Asunción, Paraguay</p>
        </div>
      </div>
    </footer>
  )
}
