// Calendly link with icon — for online booking.
// Free tier: 1 event type, unlimited bookings. Iván debe:
// 1. Crear cuenta en calendly.com
// 2. Configurar 1 evento "Consulta 45min"
// 3. Setear env var NEXT_PUBLIC_CALENDLY_URL

import { CalendarDays, ExternalLink } from "lucide-react"

export function CalendlyLink({
  url,
  label = "Agendar online",
  variant = "primary",
  className = "",
}: {
  url?: string
  label?: string
  variant?: "primary" | "outline" | "subtle"
  className?: string
}) {
  const finalUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL
  if (!finalUrl) return null

  const variantClasses = {
    primary: "btn btn-primary",
    outline: "btn btn-outline",
    subtle: "text-accent hover:text-accent-2 font-medium underline underline-offset-4",
  }[variant]

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClasses} inline-flex items-center gap-2 group ${className}`}
    >
      <CalendarDays className="w-4 h-4" />
      {label}
      <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
    </a>
  )
}
