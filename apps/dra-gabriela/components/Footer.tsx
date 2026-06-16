// Footer with graceful placeholder handling. Address, phone, WhatsApp, RUC
// only render when set; otherwise their row is hidden. Hardcoded "San
// Lorenzo · Paraguay" was wrong — now driven by business.address.

import Link from "next/link"
import { Mail, MessageCircle, MapPin, Phone, Clock } from "lucide-react"
import { whatsappLink, phoneDisplay, isPlaceholder } from "@/lib/content"

export function Footer({ locale, content }: { locale: string; content: any }) {
  const c = content
  const base = `/${locale}`
  const wa = whatsappLink(c.business?.whatsapp)
  const phone = phoneDisplay(c.business?.phone)
  const address = !isPlaceholder(c.business?.address) ? c.business.address : null
  const hasHours = c.openingHours && Object.keys(c.openingHours).length > 0
  const legalPages = [
    { href: locale === "es" ? `${base}/privacidad` : `${base}/privacy`, label: locale === "es" ? "Privacidad" : "Privacy" },
    { href: locale === "es" ? `${base}/terminos` : `${base}/terms`, label: locale === "es" ? "Términos" : "Terms" },
  ]

  return (
    <footer className="bg-[#0e1717] text-[#cdd2cf] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] flex items-center justify-center text-white text-xs font-semibold">
                DG
              </span>
              <h3 className="text-lg text-white font-medium">{c.site?.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#9aa39f] max-w-md mb-4">
              {c.site?.metaDescription}
            </p>
            <ul className="space-y-2 text-sm">
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
                    <Phone className="w-4 h-4" /> {phone}
                  </a>
                </li>
              )}
              {c.business?.email && !isPlaceholder(c.business.email) && (
                <li>
                  <a href={`mailto:${c.business.email}`} className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
                    <Mail className="w-4 h-4" /> {c.business.email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </li>
              )}
            </ul>
            {hasHours && (
              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold)] mb-2">
                  <Clock className="w-3.5 h-3.5" /> {locale === "es" ? "Horarios" : "Hours"}
                </div>
                <ul className="text-xs space-y-1 text-[#9aa39f] font-mono">
                  {Object.entries(c.openingHours).map(([day, hours]) => (
                    <li key={day} className="flex justify-between gap-3 max-w-[16rem]">
                      <span className="uppercase tracking-wide">{day}</span>
                      <span>{String(hours)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {locale === "es" ? "Servicios" : "Services"}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { es: "/es/segunda-opinion", en: "/en/second-opinion", label: locale === "es" ? "Segunda opinión" : "Second opinion" },
                { es: "/es/precios", en: "/en/pricing", label: locale === "es" ? "Precios" : "Pricing" },
                { es: "/es/servicios", en: "/en/services", label: locale === "es" ? "Servicios" : "Services" },
                { es: "/es/expat", en: "/en/expat", label: "Expat" },
              ].map((l) => (
                <li key={l.es}>
                  <Link href={locale === "es" ? l.es : l.en} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {locale === "es" ? "Empresa" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={locale === "es" ? `${base}/nosotros` : `${base}/about`} className="hover:text-white transition-colors">
                  {locale === "es" ? "Sobre mí" : "About"}
                </Link>
              </li>
              <li>
                <Link href={`${base}/faq`} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`${base}/process`} className="hover:text-white transition-colors">
                  {locale === "es" ? "Proceso" : "Process"}
                </Link>
              </li>
              <li>
                <Link href={`${base}/blog`} className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              {legalPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
            {c.business?.ruc && !isPlaceholder(c.business.ruc) && (
              <p className="text-xs text-[#7a827e] mt-4">RUC: {c.business.ruc}</p>
            )}
            {c.business?.mspbs && !isPlaceholder(c.business.mspbs) && (
              <p className="text-xs text-[#7a827e]">MSPBS: {c.business.mspbs}</p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[#7a827e]">
          <p>© {new Date().getFullYear()} {c.site?.name}. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}</p>
          <p>{locale === "es" ? "Asunción, Paraguay" : "Asunción, Paraguay"}</p>
        </div>
      </div>
    </footer>
  )
}
