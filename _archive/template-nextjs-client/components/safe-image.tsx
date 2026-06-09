"use client"
import { useState } from "react"

export function SafeImage({ src, alt, className = "", fallback = "✦" }: {
  src: string; alt: string; className?: string; fallback?: string
}) {
  const [error, setError] = useState(false)
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center text-primary/20 select-none ${className}`}>
        <span className="text-4xl">{fallback}</span>
      </div>
    )
  }
  return (
    <img src={src} alt={alt} className={className} onError={() => setError(true)}
      loading="lazy" />
  )
}
