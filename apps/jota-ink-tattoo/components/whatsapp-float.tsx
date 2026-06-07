"use client"
import { useState } from "react"

export function WhatsAppFloat({ phone, message }: { phone: string; message?: string }) {
  const [visible] = useState(true)

  if (!visible || !phone) return null

  const href = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 hover:shadow-xl hover:scale-110 transition-all animate-fade-in-up"
      aria-label="WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      </svg>
    </a>
  )
}
