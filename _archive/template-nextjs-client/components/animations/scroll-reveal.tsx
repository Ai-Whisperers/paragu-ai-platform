"use client"
import { useEffect, useRef, useState, type ReactNode } from "react"

export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function StaggerGrid({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function StaggerItem({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return <FadeUp delay={index * 100}>{children}</FadeUp>
}
