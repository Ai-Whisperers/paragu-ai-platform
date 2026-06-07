"use client"
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <a href="https://wa.me/595991691501?text=Hola!%20Vi%20su%20portfolio%20y%20quiero%20mas%20informacion"
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all animate-pulse"
      aria-label="Contactar por WhatsApp">
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
