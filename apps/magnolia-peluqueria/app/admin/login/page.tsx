"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, AlertCircle, Loader2, Scissors } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [notConfigured, setNotConfigured] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    fetch("/api/admin/bookings")
      .then((r) => {
        if (!r.ok) setNotConfigured(true)
      })
      .catch(() => setNotConfigured(true))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al iniciar sesión")
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

  if (notConfigured) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Supabase no está configurado</h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            El panel admin requiere Supabase configurado. Agregá las variables en <code className="text-amber-400 font-mono">.env.local</code>:
          </p>
          <div className="bg-zinc-950 rounded-xl p-4 text-left mb-6 font-mono text-sm space-y-2">
            <p className="text-zinc-300">NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co</p>
            <p className="text-zinc-300">SUPABASE_SERVICE_ROLE_KEY=eyJ...</p>
          </div>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-7 h-7 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel Admin</h1>
          <p className="text-zinc-500 text-sm mt-1">Magnolia Peluquería</p>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@magnolia.com"
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
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