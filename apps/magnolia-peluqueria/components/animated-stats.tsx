"use client"
import { useEffect, useRef, useState } from "react"
import { statsData } from "@/lib/config"

interface StatItem {
  value: string
  label: string
  suffix?: string
}

interface AnimatedStatProps {
  stat: StatItem
  delay?: number
}

function useCountUp(target: number, duration = 1500, isActive: boolean) {
  const [count, setCount] = useState(target) // SSR-safe: start at final value
  const frameRef = useRef(0)
  const startRef = useRef(0)

  useEffect(() => {
    if (!isActive) {
      setCount(target)
      return
    }
    startRef.current = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isActive, target, duration])

  return count
}

function AnimateOnce({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const numeric = parseInt(value.replace(/\D/g, ""), 10)
  const displayNum = useCountUp(numeric, 1500, active)
  const isFloat = value.includes(".")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.unobserve(el) } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const prefix = value.match(/^\D+/)?.[0] ?? ""
  const suffix_match = suffix || (isFloat ? "" : "+")

  const finalValue = isFloat
    ? (displayNum / 10).toFixed(1)
    : displayNum.toLocaleString("es-PY")

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl md:text-5xl font-bold text-primary">
        {prefix}{finalValue}{suffix_match}
      </div>
      <div className="text-sm font-medium text-foreground-light mt-1">{label}</div>
    </div>
  )
}

interface AnimatedStatsProps {
  lang?: "es" | "en" | "en"
}

export function AnimatedStats({ lang = "es" }: AnimatedStatsProps) {
  const raw = statsData(lang) as unknown as Record<string, string>
  const stats: StatItem[] = [
    { value: raw.customers, label: "Clientes Felices" },
    { value: raw.years, label: "Años de Experiencia" },
    { value: raw.services, label: "Servicios" },
    { value: raw.rating, label: "Calificación" },
  ]

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimateOnce key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </div>
    </section>
  )
}
