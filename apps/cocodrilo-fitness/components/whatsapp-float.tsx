"use client"
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  const wa = "https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all"
      aria-label="Contactar por WhatsApp">
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
