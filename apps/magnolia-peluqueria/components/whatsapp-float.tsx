"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { waLink } from "@/lib/config"

const MESSAGES = {
  es: "Hola! Quiero consultar por sus servicios",
  en: "Hi! I want to ask about their services",
}

export function WhatsAppFloat({ lang = "es" }: { lang?: "es" | "en" }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const message = MESSAGES[lang] ?? MESSAGES.es
  const href = `${waLink}?text=${encodeURIComponent(message)}`

  if (!visible) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}