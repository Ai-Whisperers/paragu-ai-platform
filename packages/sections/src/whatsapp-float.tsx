// WhatsApp Float — Paraguay-specific, unique to our platform
import { Button } from "@ai-whisperers/ui/button"
import { MessageCircle } from "lucide-react"

export interface WhatsAppFloatProps {
  phone: string
  message?: string
}

export function WhatsAppFloat({ phone, message = "Hola! Quiero información" }: WhatsAppFloatProps) {
  const cleanPhone = phone.replace(/[\s+]/g, "")
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
