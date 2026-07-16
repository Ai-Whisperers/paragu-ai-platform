"use client"
// Countdown timer to launch date — replaces generic "coming soon" copy
// with a real, ticking countdown. Creates urgency + reduces bounce.

import { useState, useEffect } from "react"
import { Clock, Sparkles } from "lucide-react"

interface CountdownProps {
  /** ISO target date, e.g. "2026-07-26" */
  target: string
  locale?: "es" | "en"
  variant?: "banner" | "inline"
}

export function Countdown({ target, locale = "es", variant = "banner" }: CountdownProps) {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const t = new Date()
      setNow(t)
      const targetDate = new Date(target + "T08:00:00")
      const diff = targetDate.getTime() - t.getTime()
      if (diff <= 0) {
        setIsLaunched(true)
        return
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [target])

  if (!mounted) {
    // SSR placeholder to avoid hydration mismatch
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm">
        <Clock className="w-4 h-4" />
        <span>{locale === "es" ? "Cargando…" : "Loading…"}</span>
      </div>
    )
  }

  if (isLaunched) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-medium">
        <Sparkles className="w-4 h-4" />
        <span>{locale === "es" ? "¡Abierto! Te esperamos." : "Open now. Come visit."}</span>
      </div>
    )
  }

  const labels = locale === "es"
    ? { days: "días", hours: "hs", minutes: "min", seconds: "seg", prefix: "Abrimos en" }
    : { days: "days", hours: "hrs", minutes: "min", seconds: "sec", prefix: "Opening in" }

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-sm">
        <Clock className="w-3 h-3" />
        {days}d {hours}h {minutes}m
      </span>
    )
  }

  return (
    <div className="inline-flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-fg-muted">{labels.prefix}</span>
      <div className="flex items-center gap-2 font-mono font-bold text-lg">
        <div className="flex flex-col items-center bg-navy text-white rounded-lg px-3 py-2 min-w-[3.5rem]">
          <span className="text-2xl">{days}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-80">{labels.days}</span>
        </div>
        <span className="text-fg-subtle">:</span>
        <div className="flex flex-col items-center bg-navy text-white rounded-lg px-3 py-2 min-w-[3.5rem]">
          <span className="text-2xl">{String(hours).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-80">{labels.hours}</span>
        </div>
        <span className="text-fg-subtle">:</span>
        <div className="flex flex-col items-center bg-navy text-white rounded-lg px-3 py-2 min-w-[3.5rem]">
          <span className="text-2xl">{String(minutes).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-80">{labels.minutes}</span>
        </div>
        <span className="text-fg-subtle">:</span>
        <div className="flex flex-col items-center bg-navy text-white rounded-lg px-3 py-2 min-w-[3.5rem]">
          <span className="text-2xl">{String(seconds).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-80">{labels.seconds}</span>
        </div>
      </div>
    </div>
  )
}
