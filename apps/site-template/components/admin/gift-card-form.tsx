/**
 * ANNOTATION: AdminGiftCardForm
 *
 * What it is: Modal form for creating gift cards manually in the admin panel.
 * Admin enters denomination, recipient name, phone, and validity period.
 *
 * Why your business needs it: Lets staff create physical/digital gift cards for walk-in customers
 * or over-the-phone orders who don't use the public purchase flow.
 *
 * What AI populates from your data: Gift card denominations from content/es/gift-cards/index.json.
 *
 * Your input: Tell ParaguAI the denomination options you want to offer.
 *
 * Plan availability: Profesional (admin feature)
 */

/**
 * @component AdminGiftCardForm
 * @description Modal form for creating new gift cards manually. Triggered from admin panel Nueva Tarjeta button with denomination, recipient, and validity options.
 * @featureFlags giftCards
 * @requires /api/admin/gift-cards endpoint, admin auth
 * @implementation POST to /api/admin/gift-cards with denomination, recipientName, recipientPhone, purchaserPhone, validMonths
 */

"use client"

import { useState, useEffect } from "react"
import { formatGs } from "@/lib/config/config"

type GiftCardCreated = {
  id: string
  code: string
  token: string
  denomination: number
  balance: number
  recipient_name: string | null
  recipient_phone: string | null
  purchaser_phone: string | null
  status: string
  valid_until: string
}

const DENOMINATIONS = [
  { label: "Gs. 50,000", value: 50000 },
  { label: "Gs. 100,000", value: 100000 },
  { label: "Gs. 150,000", value: 150000 },
  { label: "Gs. 200,000", value: 200000 },
  { label: "Gs. 300,000", value: 300000 },
  { label: "Gs. 500,000", value: 500000 },
  { label: "Otro", value: 0 },
]

const VALIDITY_OPTIONS = [
  { label: "3 meses", value: 3 },
  { label: "6 meses", value: 6 },
  { label: "12 meses", value: 12 },
]

interface GiftCardFormProps {
  onClose: () => void
  onCreated: (card: GiftCardCreated) => void
}

export default function GiftCardForm({ onClose, onCreated }: GiftCardFormProps) {
  const [denomination, setDenomination] = useState(100000)
  const [customDenomination, setCustomDenomination] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [purchaserPhone, setPurchaserPhone] = useState("")
  const [validMonths, setValidMonths] = useState(6)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [createdCard, setCreatedCard] = useState<GiftCardCreated | null>(null)

  const effectiveDenomination = denomination === 0
    ? parseInt(customDenomination.replace(/\./g, "")) || 0
    : denomination

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (effectiveDenomination < 10000) {
      setError("Monto mínimo: Gs. 10,000")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/gift-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveDenomination,
          recipientName,
          recipientPhone,
          purchaserPhone,
          validMonths,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al crear tarjeta")
        return
      }

      const card = await res.json()
      setCreatedCard(card)
      onCreated(card)
    } catch {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const handleDenominationChange = (val: number) => {
    setDenomination(val)
    if (val !== 0) setCustomDenomination("")
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (createdCard) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Tarjeta Creada!</h2>
            <p className="text-gray-500 mb-6">Guarda este código para el cliente:</p>
            <div className="bg-gray-900 rounded-xl p-6 mb-4">
              <p className="text-3xl font-mono font-bold text-white text-center tracking-widest">
                {createdCard.code}
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Denominación: <strong>{formatGs(createdCard.denomination)}</strong>
            </p>
            {createdCard.recipient_name && (
              <p className="text-sm text-gray-500 mb-1">
                Para: <strong>{createdCard.recipient_name}</strong>
              </p>
            )}
            <p className="text-sm text-gray-400 mb-6">
              Válida hasta: {new Date(createdCard.valid_until).toLocaleDateString("es-PY")}
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="gift-card-modal-title" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 id="gift-card-modal-title" className="text-xl font-bold text-gray-900">Nueva Tarjeta de Regalo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monto (Gs.)</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {DENOMINATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleDenominationChange(d.value)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-colors ${
                    denomination === d.value
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {denomination === 0 && (
              <input
                type="number"
                min="10000"
                step="10000"
                value={customDenomination}
                onChange={(e) => setCustomDenomination(e.target.value)}
                placeholder="Gs. 0"
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Destinatario</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Opcional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono del Destinatario</label>
            <input
              type="tel"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="+595 9XX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono del Comprador</label>
            <input
              type="tel"
              value={purchaserPhone}
              onChange={(e) => setPurchaserPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="+595 9XX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Validez</label>
            <div className="flex gap-2">
              {VALIDITY_OPTIONS.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setValidMonths(v.value)}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border-2 transition-colors ${
                    validMonths === v.value
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear Tarjeta"}
          </button>
        </form>
      </div>
    </div>
  )
}