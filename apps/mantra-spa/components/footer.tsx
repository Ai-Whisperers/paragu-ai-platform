import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

export function Footer({
  businessName,
  tagline,
  address,
  phone,
  hours,
  waPhone,
}: {
  businessName?: string
  tagline?: string
  address?: string
  phone?: string
  hours?: string
  waPhone?: string
}) {
  const name = businessName || "Mantra Spa"
  const tag = tagline || "Bienestar y Relax en Concepción"

  return (
    <footer className="bg-[#0f1a2e] py-12 text-white">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold font-heading">{name}</h3>
            <p className="text-sm text-white/60">{tag}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link href="/servicios" className="text-white/70 hover:text-white transition-colors">Servicios</Link>
              <Link href="/nosotros" className="text-white/70 hover:text-white transition-colors">Nosotros</Link>
              <Link href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link>
              <Link href="/contacto" className="text-white/70 hover:text-white transition-colors">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Legales</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacidad" className="text-white/70 hover:text-white transition-colors">Privacidad</Link>
              <Link href="/terminos" className="text-white/70 hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Contacto</h4>
            <div className="text-sm text-white/70 space-y-3">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#c9a96e]" />
                {address || "Concepción"}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#c9a96e]" />
                {phone || "0981 106 062"}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-[#c9a96e]" />
                {hours || "Lun-Sáb: 10:00 - 20:00"}
              </p>
              <a
                href={`https://wa.me/${waPhone || "595986106062"}?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n`}
                target="_blank" rel="noopener noreferrer"
                className="inline-block mt-1 text-[#c9a96e] hover:text-[#b8944e] transition-colors font-medium text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} {name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
