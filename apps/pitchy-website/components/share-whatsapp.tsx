"use client"
import content from "@/content/es.json"

const c = content as Record<string, any>
const waPhone = c.contacto?.info?.whatsapp || "595981277601"

export function ShareWhatsApp({ title, url }: { title: string; url?: string }) {
  const baseUrl = c.site?.url || "https://pitchy.paragu-ai.com"
  const href = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Consultá sobre: ${title}${url ? ` - ${baseUrl}${url}` : ""}`)}`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-[#6B7280] hover:text-[#1A1A2E] hover:border-[#0F62FE] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      </svg>
      Consultar
    </a>
  )
}
