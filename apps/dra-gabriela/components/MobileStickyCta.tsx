"use client"
// Mobile sticky CTA — fixed bar at the bottom of the viewport on small screens.
// Hidden on desktop (md+). Falls back to /contacto when WhatsApp is a placeholder.

import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import { whatsappLink, phoneDisplay, isPlaceholder } from "@/lib/content"

export function MobileStickyCta({ content }: { content: any }) {
  const wa = whatsappLink(content?.business?.whatsapp, content?.business?.whatsappMessage)
  const phone = phoneDisplay(content?.business?.phone)
  const locale = content?.site?.locale?.startsWith("en") ? "en" : "es"
  const base = `/${locale}`

  if (!wa && !phone) {
    // No real data yet — show only a "Contact" link to /contacto
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 backdrop-blur-lg border-t border-[var(--border)] shadow-[0_-4px_20px_rgba(15,76,76,0.08)]">
        <div className="max-w-md mx-auto px-4 py-3">
          <Link href={`${base}/contacto`} className="btn btn-primary w-full justify-center">
            <MessageCircle className="w-4 h-4" />
            {locale === "es" ? "Coordinar consulta" : "Book a consultation"}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 backdrop-blur-lg border-t border-[var(--border)] shadow-[0_-4px_20px_rgba(15,76,76,0.08)]">
      <div className="max-w-md mx-auto px-4 py-3 grid grid-cols-2 gap-2">
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !py-2.5 !text-sm justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        ) : (
          <Link href={`${base}/contacto`} className="btn btn-primary !py-2.5 !text-sm justify-center">
            <MessageCircle className="w-4 h-4" />
            {locale === "es" ? "Contacto" : "Contact"}
          </Link>
        )}
        {phone ? (
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="btn btn-outline !py-2.5 !text-sm justify-center"
          >
            <Phone className="w-4 h-4" />
            {locale === "es" ? "Llamar" : "Call"}
          </a>
        ) : (
          <Link href={`${base}/contacto`} className="btn btn-outline !py-2.5 !text-sm justify-center">
            {locale === "es" ? "Más opciones" : "More"}
          </Link>
        )}
      </div>
    </div>
  )
}
