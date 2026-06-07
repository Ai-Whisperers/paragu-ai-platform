"use client"
import content from "@/content/es.json"

const c = content as Record<string, any>
const waPhone = c.contacto?.info?.whatsapp || "595981277601"

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 md:hidden shadow-lg">
      <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent(c.whatsapp?.defaultMessage || "Hola Pitchy, quiero consultar sobre vidrio.")}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#0F62FE] text-white py-3.5 font-semibold text-sm no-underline hover:bg-blue-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
        </svg>
        Consultar por WhatsApp
      </a>
    </div>
  )
}
