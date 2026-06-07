"use client"
import { useState, useEffect, type ReactNode } from "react"
import contentRaw from "@/content/es.json"
const content = contentRaw as any

const AGE_KEY = "fun4me_age_verified"
const AGE_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days

export function AgeGate({ children }: { children: ReactNode }) {
  const [verified, setVerified] = useState(false)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AGE_KEY)
      if (raw) {
        const { ts } = JSON.parse(raw)
        if (Date.now() - ts < AGE_EXPIRY) setVerified(true)
      }
    } catch {}
  }, [])
  const confirm = () => {
    try { localStorage.setItem(AGE_KEY, JSON.stringify({ ts: Date.now() })) } catch {}
    setVerified(true)
  }
  if (verified) return <>{children}</>
  return (
    <div className="fixed inset-0 z-[999999] glass-overlay flex flex-col items-center justify-center p-5 text-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-rose-500/10 to-purple-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-600/10 to-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <div className="glass-card rounded-2xl p-10 max-w-sm mx-auto relative animate-scale-in">
        <div className="mb-6 text-5xl">✨</div>
        <h1 className="text-3xl font-extrabold text-accent mb-2">Fun<span className="text-primary">4</span>Me</h1>
        <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">{content.home?.hero?.ageGate}</p>
        <button onClick={confirm} className="btn-glow bg-primary text-primary-foreground border-none px-10 py-3.5 rounded-xl text-lg font-semibold cursor-pointer hover:bg-primary/90 w-full">
          Soy mayor de 18 años
        </button>
      </div>
    </div>
  )
}
