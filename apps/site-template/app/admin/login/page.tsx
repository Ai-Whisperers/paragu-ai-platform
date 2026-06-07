"use client"

/**
 * ANNOTATION: AdminLogin
 * WhatsApp OTP authentication page for admin access.
 * Flow: phone number entry → OTP verification → session cookie set
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, AlertCircle, Loader2, ShieldCheck, MessageSquare } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const RESEND_COOLDOWN_SECONDS = 300
  const OTP_LENGTH = 6

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al enviar el código")
        setLoading(false)
        return
      }

      setStep("otp")
      setCountdown(RESEND_COOLDOWN_SECONDS)
      setLoading(false)
    } catch {
      setError("Error de conexión")
      setLoading(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Código inválido")
        setLoading(false)
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("Error de conexión")
      setLoading(false)
    }
  }

  function formatCountdown(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel Admin</h1>
          <p className="text-zinc-500 text-sm mt-1">Verificá tu identidad con WhatsApp</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          {step === "phone" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Número de WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+595 991 234 567"
                  required
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3.5 rounded-xl hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    Enviar Código
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Código de verificación
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  maxLength={OTP_LENGTH}
                  required
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-secondary transition-colors text-center text-2xl tracking-widest font-mono"
                />
              </div>

              <div className="text-center text-sm text-zinc-500">
                {countdown > 0 ? (
                  <span>Reenviar en {formatCountdown(countdown)}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setStep("phone")
                      setOtp("")
                      setError("")
                    }}
                    className="text-secondary hover:underline"
                  >
                    Cambiar número
                  </button>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== OTP_LENGTH}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3.5 rounded-xl hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Verificar
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          <Link href="/" className="hover:text-zinc-400 transition-colors">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  )
}