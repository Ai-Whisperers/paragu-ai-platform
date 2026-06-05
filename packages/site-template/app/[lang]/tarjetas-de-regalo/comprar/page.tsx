/**
 * ANNOTATION: GiftCardPurchase (Comprar)
 *
 * What it is: A gift card purchase flow — client selects an amount tier
 * (Bronce/Plata/Oro/Premium), enters recipient name and email, and pays
 * via Stripe Checkout. On success, redirects to the success page where
 * payment is verified via /api/stripe/verify.
 *
 * Why your business needs it: Enables gift card sales directly from your
 * website. Clients buy for friends or family, bringing new customers through
 * the referral. The digital delivery via email makes it instant and convenient.
 *
 * What AI populates from your data:
 *   - Gift card amount tiers from your configured pricing
 *   - Business name and branding on the Stripe checkout
 *   - Denomination label for the gift card product name
 *
 * Your input: Tell us the gift card amounts you want to offer (e.g., 50k,
 * 100k, 150k, 250k Gs) and any discount tiers via WhatsApp. Configure Stripe
 * keys in .env.local for payment processing.
 *
 * Plan availability: Profesional
 */

"use client"

import { useMemo, useState } from "react"

export default function GiftCardPurchasePage() {
  const [amount, setAmount] = useState(100000)
  const [customAmount, setCustomAmount] = useState("")
  const [useCustom, setUseCustom] = useState(false)
  const [denomination, setDenomination] = useState("Plata")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [buyerPhone, setBuyerPhone] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [cancelled] = useState(false)

  const tiers = [
    { amount: 50000, label: "Bronce", savings: 0, discount: 0, color: "from-amber-600 to-amber-800" },
    { amount: 100000, label: "Plata", savings: 5000, discount: 5, color: "from-gray-400 to-gray-600" },
    { amount: 150000, label: "Oro", savings: 15000, discount: 10, color: "from-yellow-500 to-yellow-600" },
    { amount: 200000, label: "Premium", savings: 0, discount: 0, color: "from-rose-500 to-violet-600" },
  ]

  const handleSelectTier = (tier: typeof tiers[0]) => {
    setAmount(tier.amount)
    setDenomination(tier.label)
    setUseCustom(false)
    setCustomAmount("")
  }

  const handleCustomToggle = () => {
    setUseCustom(true)
    setDenomination("Personalizado")
  }

  const finalAmount = useCustom ? parseInt(customAmount || "0", 10) : amount
  const isValidAmount = finalAmount >= 50000

  const handlePurchase = async () => {
    if (!recipientName || !recipientEmail) {
      alert("Por favor completa el nombre y email del destinatario")
      return
    }

    if (!isValidAmount) {
      alert("El monto mínimo es Gs. 50,000")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          denomination,
          recipientName,
          recipientEmail,
          senderName,
          message,
          buyerPhone,
          recipientPhone,
          lang: "es",
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error === "stripe_not_configured") {
        alert("Pago con tarjeta no disponible. Contactanos por WhatsApp.")
      } else {
        alert(data.error || "Error al iniciar el pago")
      }
    } catch {
      alert("Error al iniciar el pago")
    } finally {
      setLoading(false)
    }
  }

  const previewCode = useMemo(() => {
    if (finalAmount < 50000) return 'MAGNOLIA-XXXX-XXXX'
    // Use a deterministic fallback for preview - real code generated at backend
    return 'MAGNOLIA-PREV-IWXX'
  }, [finalAmount])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tarjetas de Regalo</h1>
        <p className="text-gray-600">El regalo perfecto para cualquier ocasión</p>
      </div>

      {cancelled && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-center">
          El pago fue cancelado. Tu reserva no se procesó.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <button
            key={tier.amount}
            onClick={() => handleSelectTier(tier)}
            className={`p-4 rounded-xl border-2 transition-all ${
              !useCustom && amount === tier.amount
                ? "border-rose-600 bg-rose-50"
                : "border-gray-200 hover:border-rose-300"
            }`}
          >
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} mx-auto mb-2`} />
            <div className="text-sm text-gray-500 mb-1">{tier.label}</div>
            <div className="text-xl font-bold">Gs. {tier.amount.toLocaleString()}</div>
            {tier.savings > 0 && (
              <div className="text-xs text-green-600 mt-1">Ahorras Gs. {tier.savings.toLocaleString()}</div>
            )}
          </button>
        ))}
        <button
          onClick={handleCustomToggle}
          className={`p-4 rounded-xl border-2 transition-all ${
            useCustom ? "border-rose-600 bg-rose-50" : "border-gray-200 hover:border-rose-300"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-2" />
          <div className="text-sm text-gray-500 mb-1">Otro monto</div>
          <div className="text-xl font-bold">
            {useCustom ? `Gs. ${parseInt(customAmount || "0", 10).toLocaleString()}` : "Custom"}
          </div>
        </button>
      </div>

      {useCustom && (
        <div className="bg-white rounded-lg shadow p-4 border-2 border-rose-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monto personalizado (Gs.)</label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value)
              setAmount(parseInt(e.target.value || "0", 10))
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg"
            placeholder="Ej: 75000"
            min="50000"
            step="10000"
          />
          <p className="text-sm text-gray-500 mt-1">Mínimo Gs. 50,000 — en múltiplos de Gs. 10,000</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Datos del destinatario</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del destinatario *</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email del destinatario *</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono del destinatario (opcional)</label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="+595 9XX XXX XXX"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Datos del comprador</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu nombre (remitente)</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Cómo te llamas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu teléfono (opcional)</label>
              <input
                type="tel"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="+595 9XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje personal (opcional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg resize-none"
                rows={3}
                placeholder="Escribe un mensaje especial..."
                maxLength={280}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-violet-100 rounded-2xl p-6 border border-rose-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Vista previa de la tarjeta</h2>
        <div className="bg-gradient-to-br from-rose-500 to-violet-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm opacity-80">Tarjeta de Regalo</div>
              <div className="text-3xl font-bold">Gs. {finalAmount.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Para</div>
              <div className="font-semibold">{recipientName || "Destinatario"}</div>
            </div>
          </div>
          {message && (
            <div className="bg-white/20 rounded-lg p-3 mb-4 text-sm italic">
              &ldquo;{message}&rdquo;
            </div>
          )}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70">De</div>
              <div className="font-medium">{senderName || "Remitente anónimo"}</div>
            </div>
            <div className="text-xs opacity-70 text-right">
              <div>Código</div>
              <code className="font-mono text-sm">{previewCode}</code>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          Esta vista es solo una referencia. Tu código real se mostrará tras el pago.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center text-xl mb-4">
          <span>Total a pagar:</span>
          <span className="font-bold text-2xl text-rose-600">Gs. {finalAmount.toLocaleString()}</span>
        </div>
        <button
          onClick={handlePurchase}
          disabled={loading || !isValidAmount}
          className="w-full px-4 py-4 bg-rose-600 text-white rounded-xl hover:bg-rose-700 disabled:opacity-50 text-lg font-semibold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Procesando...
            </>
          ) : (
            "Pagar con Tarjeta"
          )}
        </button>
        <p className="text-sm text-gray-500 mt-3 text-center">
          La tarjeta se enviará al email del destinatario después del pago confirmado.
        </p>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Válido por 12 meses desde la fecha de compra.</p>
      </div>
    </div>
  )
}