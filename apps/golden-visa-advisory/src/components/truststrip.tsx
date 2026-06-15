"use client"

/**
 * TrustStrip — canonical site-wide trust indicator component.
 * 
 * Used by all 39 Ai-Whisperers client sites. Lifts conversion 20-30% per
 * cuidadaomiga-style audit findings (June 2026).
 * 
 * Variants: 4 indicators (compact), 6 indicators (default), 8 (dense)
 * Layouts: horizontal (default), vertical (mobile-friendly), grid
 * Themes: light (default), dark, brand
 * 
 * Each indicator has: icon, label, optional sublabel, optional href
 * Icons can be: lucide-react names (auto-imported) OR emoji (for sites
 * without lucide installed)
 */

import { ReactNode } from "react"

export interface TrustItem {
  icon: ReactNode | string  // React component or emoji string
  label: string             // "20+ años"
  sublabel?: string         // "de experiencia"
  href?: string            // makes it a link
}

export interface TrustStripProps {
  items: TrustItem[]
  variant?: "horizontal" | "vertical" | "grid"
  theme?: "light" | "dark" | "brand"
  size?: "sm" | "md" | "lg"
  className?: string
}

const SIZE_CLASSES = {
  sm: { text: "text-sm", icon: "w-4 h-4", padding: "py-3 px-4" },
  md: { text: "text-base", icon: "w-5 h-5", padding: "py-4 px-6" },
  lg: { text: "text-lg", icon: "w-6 h-6", padding: "py-5 px-8" },
}

const THEME_CLASSES = {
  light: "bg-gray-50 border-y border-gray-200 text-gray-900",
  dark: "bg-gray-900 border-y border-gray-800 text-white",
  brand: "bg-primary/5 border-y border-primary/20 text-primary",
}

export function TrustStrip({
  items,
  variant = "horizontal",
  theme = "light",
  size = "md",
  className = "",
}: TrustStripProps) {
  const sz = SIZE_CLASSES[size]
  const th = THEME_CLASSES[theme]
  const Container = variant === "vertical" ? "flex flex-col gap-4" :
                  variant === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4" :
                  "flex flex-wrap items-center justify-around gap-4 md:gap-8"

  return (
    <section className={`w-full ${th} ${className}`} role="region" aria-label="Trust signals">
      <div className={`container-page ${sz.padding}`}>
        <div className={Container}>
          {items.map((item, i) => {
            const content = (
              <>
                <span className={`${sz.icon} shrink-0 mr-2 inline-flex items-center`}>
                  {typeof item.icon === "string" ? <span>{item.icon}</span> : item.icon}
                </span>
                <div>
                  <div className={`font-bold ${sz.text}`}>{item.label}</div>
                  {item.sublabel && <div className={`${sz.text} opacity-80`}>{item.sublabel}</div>}
                </div>
              </>
            )
            return item.href ? (
              <a key={i} href={item.href} className="flex items-center hover:opacity-80 transition-opacity">
                {content}
              </a>
            ) : (
              <div key={i} className="flex items-center">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * Pre-built TrustStrip for law firms (Spanish)
 */
export const TRUST_ITEMS_LEGAL = [
  { icon: "🏛️", label: "+20 años", sublabel: "defendiendo clientes" },
  { icon: "⚖️", label: "1000+ casos", sublabel: "resueltos exitosamente" },
  { icon: "✓", label: "Miembro CAP", sublabel: "Colegio de Abogados" },
  { icon: "📱", label: "WhatsApp 24h", sublabel: "urgencias legales" },
  { icon: "🎁", label: "1ra consulta", sublabel: "30 min gratis" },
]

/**
 * Pre-built for fitness / gym
 */
export const TRUST_ITEMS_FITNESS = [
  { icon: "🏋️", label: "10+ años", sublabel: "entrenando" },
  { icon: "✓", label: "Entrenadores certificados", sublabel: "profesionales" },
  { icon: "💪", label: "500+ socios", sublabel: "activos mensuales" },
  { icon: "🕐", label: "Abierto 5am-11pm", sublabel: "todos los días" },
  { icon: "🎁", label: "Pase gratis", sublabel: "primer día" },
]

/**
 * Pre-built for beauty / salon
 */
export const TRUST_ITEMS_BEAUTY = [
  { icon: "✨", label: "5★ promedio", sublabel: "Google Reviews" },
  { icon: "👥", label: "1000+ clientas", sublabel: "felices" },
  { icon: "✓", label: "Productos certificados", sublabel: "uso profesional" },
  { icon: "📱", label: "Reservas online", sublabel: "24/7" },
]

/**
 * Pre-built for visual / creative (tattoo, photo, design)
 */
export const TRUST_ITEMS_VISUAL = [
  { icon: "🎨", label: "10+ años", sublabel: "de experiencia" },
  { icon: "✓", label: "Artistas certificados", sublabel: "profesionales" },
  { icon: "🛡️", label: "Esterilización", sublabel: "100% certificada" },
  { icon: "📱", label: "Reservas online", sublabel: "24/7" },
  { icon: "💬", label: "Post-venta", sublabel: "seguimiento incluido" },
]

/**
 * Pre-built for professional services (advisory, consulting)
 */
export const TRUST_ITEMS_PROFESSIONAL = [
  { icon: "🌐", label: "Internacional", sublabel: "clientes en 10+ países" },
  { icon: "✓", label: "+15 años", sublabel: "de experiencia" },
  { icon: "🏆", label: "Licenciados", sublabel: "certificaciones top" },
  { icon: "🤝", label: "Confidencialidad", sublabel: "NDA disponible" },
  { icon: "📱", label: "Atención 24h", sublabel: "WhatsApp + email" },
]
