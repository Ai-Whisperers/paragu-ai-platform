"use client"

import { useEffect, useState } from "react"
import { Gift, CheckCircle, Loader2, Copy, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/config/config"

interface SuccessContentProps {
  lang: string
  query: Record<string, string | undefined>
}

interface CardDetails {
  denomination: string
  amount: number
  recipientName: string
  senderName: string
  message: string
  code: string | null
  paid: boolean
}

export function SuccessContent({ lang, query }: SuccessContentProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [card, setCard] = useState<CardDetails | null>(null)

  const sessionId = query.session_id

  useEffect(() => {
    if (!sessionId) {
      queueMicrotask(() => {
        setError("No se encontró el ID de sesión")
        setLoading(false)
      })
      return
    }

    async function verify() {
      try {
        const res = await fetch(`/api/stripe/verify?session_id=${sessionId}`)
        if (!res.ok) throw new Error("Error al verificar el pago")
        const data = await res.json()

        setCard({
          denomination: data.denomination || "Tarjeta de Regalo",
          amount: data.amount || 0,
          recipientName: data.recipientName || "",
          senderName: data.senderName || "",
          message: data.message || "",
          code: data.code || null,
          paid: data.paid || false,
        })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al verificar"
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-secondary mx-auto mb-4" />
          <p className="text-foreground-light">
            {lang === "es" ? "Verificando tu pago..." : "Verifying your payment..."}
          </p>
        </div>
      </div>
    )
  }

  if (error || !card?.paid) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">
            {lang === "es" ? "Algo salió mal" : "Something went wrong"}
          </h1>
          <p className="text-foreground-light mb-6">
            {error || (lang === "es" ? "El pago no pudo ser verificado" : "Payment could not be verified")}
          </p>
          <a href={`/${lang}/tarjetas-de-regalo/comprar`}
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary-dark transition-colors">
            {lang === "es" ? "Volver a intentar" : "Try again"}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-rose-400 to-rose-600 p-6 text-center text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-2xl font-bold">
              {lang === "es" ? "¡Pago exitoso!" : "Payment successful!"}
            </h1>
            <p className="text-white/80 mt-1">
              {lang === "es"
                ? "Tu tarjeta de regalo está lista"
                : "Your gift card is ready"}
            </p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-400 to-violet-500 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-1">
                {card.denomination}
              </h2>
              <p className="text-2xl font-bold text-secondary">
                Gs. {card.amount?.toLocaleString("es-PY")}
              </p>
              {card.recipientName && (
                <p className="text-foreground-light mt-2">
                  {lang === "es" ? "Para:" : "For:"} {card.recipientName}
                </p>
              )}
              {card.senderName && (
                <p className="text-foreground-light text-sm">
                  {lang === "es" ? "De:" : "From:"} {card.senderName}
                </p>
              )}
            </div>

            {card.code ? (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-2">
                  {lang === "es" ? "Código de la tarjeta" : "Card code"}
                </p>
                <div className="flex items-center justify-between">
                  <code className="font-mono text-xl font-bold text-primary tracking-wider">{card.code}</code>
                  <button
                    onClick={() => card.code && navigator.clipboard.writeText(card.code)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title={lang === "es" ? "Copiar" : "Copy"}
                  >
                    <Copy className="w-5 h-5 text-foreground-light" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-amber-800 text-sm">
                  {lang === "es"
                    ? "Tu código de tarjeta se enviará por email en breves minutos."
                    : "Your card code will be sent to your email shortly."}
                </p>
              </div>
            )}

            <p className="text-sm text-foreground-light text-center mb-6">
              {lang === "es"
                ? "Recibirás un email con los detalles de tu tarjeta. También puedes mostrar este código en el local."
                : "You will receive an email with your card details. You can also show this code at our location."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/${siteConfig.business?.whatsapp}?text=${encodeURIComponent(`Hola! Acabo de comprar una tarjeta de regalo ${card.denomination} con código ${card.code}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#20BD5A] transition-colors">
                <ExternalLink className="w-4 h-4" />
                {lang === "es" ? "Confirmar por WhatsApp" : "Confirm via WhatsApp"}
              </a>
              <a href={`/${lang}`}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                {lang === "es" ? "Volver al inicio" : "Back to home"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}


