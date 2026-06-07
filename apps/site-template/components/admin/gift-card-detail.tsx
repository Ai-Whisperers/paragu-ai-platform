/* eslint-disable @next/next/no-img-element */
/**
 * ANNOTATION: AdminGiftCardDetail
 *
 * What it is: Gift card detail view in the admin panel showing card info, current balance, transaction history, and redemption controls.
 *
 * Why your business needs it: Staff need to check gift card balances and record redemptions when customers use them at your business.
 *
 * What AI populates from your data: Transaction history from Supabase gift_cards table.
 *
 * Your input: Nothing — this is internal staff tooling.
 *
 * Plan availability: Profesional (admin feature)
 */

/**
 * @component AdminGiftCardDetail
 * @description Full detail view of a gift card showing info, balance, transaction history, and a Canjear (redeem) button for staff to record redemptions.
 * @featureFlags giftCards
 * @requires /api/admin/gift-cards/[cardId] and /api/admin/gift-cards/[cardId]/redeem endpoints, admin auth
 * @implementation GET for card data, POST for redemption, QR code via api.qrserver.com, formatGs for PYG formatting
 */

"use client"

import { useState, useEffect, useCallback } from "react"
import { formatGs } from "@/lib/config/config"

interface Transaction {
  id: string
  type: "issue" | "redeem" | "cancel" | "expire"
  amount: number
  balance_after: number
  notes: string | null
  redeemed_by: string | null
  created_at: string
}

interface GiftCardDetailData {
  id: string
  code: string
  token: string
  denomination: number
  balance: number
  recipient_name: string | null
  recipient_phone: string | null
  purchaser_phone: string | null
  status: string
  valid_from: string
  valid_until: string
  created_at: string
  updated_at: string
  transactions?: Transaction[]
}

interface GiftCardDetailProps {
  cardId: string
  onClose: () => void
  onUpdate: () => void
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Activa", color: "bg-green-100 text-green-800" },
  redeemed: { label: "Canjeada", color: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-800" },
  expired: { label: "Expirada", color: "bg-red-100 text-red-800" },
}

export default function GiftCardDetail({ cardId, onClose, onUpdate }: GiftCardDetailProps) {
  const [card, setCard] = useState<GiftCardDetailData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showRedeem, setShowRedeem] = useState(false)
  const [redeemAmount, setRedeemAmount] = useState("")
  const [redeemNotes, setRedeemNotes] = useState("")
  const [redeemLoading, setRedeemLoading] = useState(false)
  const [redeemError, setRedeemError] = useState("")

  const fetchCard = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/gift-cards/${cardId}`, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setCard(data)
        setTransactions(Array.isArray(data.transactions) ? data.transactions : [])
      }
    } catch {
      console.error("Error fetching card")
    } finally {
      setLoading(false)
    }
  }, [cardId])

   
/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchCard()
  }, [fetchCard])
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    setRedeemError("")

    if (!card) return

    const amount = parseInt(redeemAmount.replace(/\./g, ""))
    if (!amount || amount <= 0) {
      setRedeemError("Monto inválido")
      return
    }

    if (amount > card.balance) {
      setRedeemError(`No puede exceder el saldo (${formatGs(card.balance)})`)
      return
    }

    setRedeemLoading(true)
    try {
      const res = await fetch(`/api/admin/gift-cards/${cardId}/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, notes: redeemNotes }),
      })

      if (!res.ok) {
        const data = await res.json()
        setRedeemError(data.error || "Error al canjear")
        return
      }

      setShowRedeem(false)
      setRedeemAmount("")
      setRedeemNotes("")
      await fetchCard()
      onUpdate()
    } catch {
      setRedeemError("Error de conexión")
    } finally {
      setRedeemLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">Cargando...</div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <p>Tarjeta no encontrada</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">Cerrar</button>
        </div>
      </div>
    )
  }

  const statusInfo = STATUS_LABELS[card.status] || STATUS_LABELS.active
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(card.code)}&size=180x180&format=png`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">Detalle de Tarjeta</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              { }
              <img src={qrUrl} alt={`QR for ${card.code}`} className="w-44 h-44 rounded-xl border" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Código</p>
                <p className="text-2xl font-mono font-bold text-gray-900 tracking-widest">{card.code}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-rose-50 rounded-xl p-3">
                  <p className="text-xs text-rose-500 mb-1">Denominación</p>
                  <p className="text-lg font-bold text-rose-700">{formatGs(card.denomination)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-green-600 mb-1">Saldo Disponible</p>
                  <p className="text-lg font-bold text-green-700">{formatGs(card.balance)}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              {card.recipient_name && (
                <div>
                  <p className="text-xs text-gray-500">Destinatario</p>
                  <p className="text-sm font-medium text-gray-900">{card.recipient_name}</p>
                </div>
              )}
              {card.recipient_phone && (
                <div>
                  <p className="text-xs text-gray-500">Teléfono Destinatario</p>
                  <a
                    href={`https://wa.me/${card.recipient_phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    {card.recipient_phone}
                  </a>
                </div>
              )}
              {card.purchaser_phone && (
                <div>
                  <p className="text-xs text-gray-500">Teléfono Comprador</p>
                  <a
                    href={`https://wa.me/${card.purchaser_phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    {card.purchaser_phone}
                  </a>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Creada</p>
                  <p className="text-gray-700">{new Date(card.created_at).toLocaleDateString("es-PY")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Válida hasta</p>
                  <p className="text-gray-700">{new Date(card.valid_until).toLocaleDateString("es-PY")}</p>
                </div>
              </div>
            </div>
          </div>

          {card.status === "active" && (
            <div className="border-t pt-4">
              {!showRedeem ? (
                <button
                  onClick={() => setShowRedeem(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Canjear
                </button>
              ) : (
                <form onSubmit={handleRedeem} className="space-y-3 bg-green-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900">Registrar Canje</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto a canjear (Gs.)</label>
                    <input
                      type="text"
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(e.target.value)}
                      placeholder={card.balance.toLocaleString("es-PY")}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                    <input
                      type="text"
                      value={redeemNotes}
                      onChange={(e) => setRedeemNotes(e.target.value)}
                      placeholder="Servicio o producto"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  {redeemError && (
                    <p className="text-sm text-red-600 bg-white rounded px-3 py-2">{redeemError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={redeemLoading}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {redeemLoading ? "Procesando..." : "Confirmar Canje"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowRedeem(false); setRedeemError("") }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Historial de Transacciones</h3>
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-500">Sin transacciones</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        tx.type === "issue" ? "bg-green-100 text-green-700" :
                        tx.type === "redeem" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {tx.type === "issue" ? "+" : tx.type === "redeem" ? "−" : "×"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {tx.type === "issue" ? "Emisión" :
                           tx.type === "redeem" ? "Canje" :
                           tx.type === "cancel" ? "Cancelación" : "Expiración"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(tx.created_at).toLocaleDateString("es-PY")} · {new Date(tx.created_at).toLocaleTimeString("es-PY", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {tx.notes && <p className="text-xs text-gray-400">{tx.notes}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${
                        tx.type === "issue" ? "text-green-600" :
                        tx.type === "redeem" ? "text-red-600" : "text-gray-500"
                      }`}>
                        {tx.type === "issue" ? "+" : "−"}{formatGs(tx.amount)}
                      </p>
                      <p className="text-xs text-gray-400">Saldo: {formatGs(tx.balance_after)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}