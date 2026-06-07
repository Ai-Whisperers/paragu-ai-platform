'use client'

import { MessageCircle } from 'lucide-react'
import content from '@/content/es.json'

export default function WhatsAppFloat() {
  const href = content.home.cta?.href ?? content.home.hero?.ctaSecondaryHref ?? 'https://wa.me/595981324569'

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-mercado)] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  )
}
