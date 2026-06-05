"use client"

import { Gift, Copy, Check, MessageCircle, Clock, User, Heart } from "lucide-react"
import { useState } from "react"
import { business, siteConfig, getSiteName } from "@/lib/config/config"

type GiftCardData = {
  code: string
  amount_gs: number
  balance_gs: number
  buyer_name: string | null
  recipient_name: string | null
  message: string | null
  design: string | null
  status: string
  expires_at: string | null
}

const GRADIENTS: Record<string, string> = {
  rose: "from-rose-400 via-pink-500 to-rose-600",
  violet: "from-violet-400 via-purple-500 to-violet-600",
  amber: "from-amber-400 via-orange-500 to-amber-600",
  sky: "from-sky-400 via-blue-500 to-sky-600",
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Activa", color: "bg-green-100 text-green-700" },
  partial: { label: "Parcial", color: "bg-amber-100 text-amber-700" },
  redeemed: { label: "Redimida", color: "bg-gray-100 text-gray-600" },
  expired: { label: "Expirada", color: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelada", color: "bg-red-100 text-red-700" },
}

function formatGs(amount: number) {
  return `Gs. ${amount.toLocaleString("es-PY")}`
}

export default function GiftCardViewer({ card }: { card: GiftCardData }) {
  const [copied, setCopied] = useState(false)
  const gradient = GRADIENTS[card.design || "rose"] || GRADIENTS.rose
  const statusInfo = STATUS_LABELS[card.status] || { label: card.status, color: "bg-gray-100 text-gray-600" }
  const isUsable = card.status === "active" || card.status === "partial"
  const waMsg = encodeURIComponent(`Hola! Tengo una Tarjeta de Regalo con código ${card.code} (saldo: ${formatGs(card.balance_gs)}). ¿Puedo usarla?`)
  const waUrl = `https://wa.me/${business.whatsapp}?text=${waMsg}`

  function copyCode() {
    navigator.clipboard.writeText(card.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-md">
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl`}>
          <div className={`bg-gradient-to-br ${gradient} p-8 text-white`}>
            <div className="absolute top-4 right-4 opacity-20">
              <Gift className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-1">Tarjeta de Regalo</p>
              <p className="text-4xl font-bold mb-1">{formatGs(card.amount_gs)}</p>
              {card.status === "partial" && (
                <p className="text-sm opacity-90">Saldo restante: <strong>{formatGs(card.balance_gs)}</strong></p>
              )}
            </div>
          </div>

          <div className="bg-white p-6">
            {card.recipient_name && (
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <p className="text-gray-700">Para: <strong>{card.recipient_name}</strong></p>
              </div>
            )}
            {card.buyer_name && (
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <p className="text-gray-600 text-sm">De: {card.buyer_name}</p>
              </div>
            )}
            {card.message && (
              <p className="text-gray-600 italic text-sm border-l-2 border-rose-200 pl-3 mb-4">&ldquo;{card.message}&rdquo;</p>
            )}

            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Código</p>
                <p className="font-mono text-lg font-bold text-gray-900 tracking-widest">{card.code}</p>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              {card.expires_at && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {new Date(card.expires_at).toLocaleDateString("es-PY")}
                </span>
              )}
            </div>
          </div>
        </div>

        {isUsable && (
          <div className="mt-8 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">¿Cómo usar tu tarjeta?</h2>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Presentá este código en el salón al momento de pagar</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">2</span>
                  <span>O envialo por WhatsApp para reservar con saldo</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">3</span>
                  <span>El saldo se descuenta automáticamente</span>
                </li>
              </ol>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold w-full py-4 rounded-xl hover:bg-[#20BD5A] transition-all text-lg shadow-sm"
            >
              <MessageCircle className="w-6 h-6" />
              Usar por WhatsApp
            </a>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          {siteConfig.site?.name || getSiteName()} &middot; {siteConfig.business?.address || getSiteName()}
        </p>
      </div>
    </div>
  )
}
