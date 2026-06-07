import type { Metadata } from "next"
import Link from "next/link"
import { getSiteName } from "@/lib/config/config"

export const metadata: Metadata = {
  title: `Tarjeta no encontrada — ${getSiteName()}`,
}

export default function GiftCardNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Tarjeta no encontrada</h1>
        <p className="text-gray-500 mb-6">Este enlace no corresponde a una tarjeta de regalo válida o puede haber expirado.</p>
        <Link href="/es" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
