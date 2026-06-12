import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

interface FooterProps {
  businessName?: string
  tagline?: string
  address?: string
  phone?: string
  hours?: string | Record<string, string>
  waPhone?: string
  lang?: "es" | "en"
}

export function Footer({
  businessName = "Negocio",
  tagline = "",
  address = "",
  phone = "",
  hours = "Lun-Sáb: 9:00 - 20:00",
  waPhone = "",
}: FooterProps) {
  const hoursText = typeof hours === "string"
    ? hours
    : Object.entries(hours).map(([d, h]) => `${d}: ${h}`).join(" · ")
  const waMsg = encodeURIComponent("Hola! Quiero más información")
  const waLink = waPhone ? `https://wa.me/${waPhone}?text=${waMsg}` : "#"

  return (
    <footer className="bg-primary py-12 text-white">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold">{businessName}</h3>
            {tagline && <p className="text-sm text-white/70">{tagline}</p>}
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/es" className="text-white/80 hover:text-white transition-colors">Inicio</Link>
              <Link href="/es/servicios" className="text-white/80 hover:text-white transition-colors">Servicios</Link>
              <Link href="/es/nosotros" className="text-white/80 hover:text-white transition-colors">Nosotros</Link>
              <Link href="/es/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
              <Link href="/es/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link>
              <Link href="/es/contacto" className="text-white/80 hover:text-white transition-colors">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">Legales</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/es/privacidad" className="text-white/80 hover:text-white transition-colors">Privacidad</Link>
              <Link href="/es/terminos" className="text-white/80 hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">Contacto</h4>
            <div className="text-sm text-white/80 space-y-2">
              {address && <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{address}</p>}
              {phone && <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" />{phone}</p>}
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" />{hoursText}</p>
              {waPhone && (
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-2 text-secondary hover:text-secondary-dark transition-colors font-medium">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
