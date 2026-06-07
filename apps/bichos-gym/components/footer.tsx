import Link from "next/link"
import { MapPin, Phone, Clock, Dumbbell } from "lucide-react"

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
  const name = businessName || "Bicho's Gym"
  const tag = tagline || "Transformá tu Cuerpo en Capiatá"

  return (
    <footer className="bg-[#1a1a2e] py-12 text-white">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="w-5 h-5 text-[#e94560]" />
              <h3 className="text-lg font-bold font-heading">{name}</h3>
            </div>
            <p className="text-sm text-white/60">{tag}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link href="/servicios" className="text-white/70 hover:text-white transition-colors">Servicios</Link>
              <Link href="/horarios" className="text-white/70 hover:text-white transition-colors">Horarios</Link>
              <Link href="/nosotros" className="text-white/70 hover:text-white transition-colors">Nosotros</Link>
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
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#e94560]" />
                {address || "Capiatá"}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#e94560]" />
                {phone || "0981 106 062"}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-[#e94560]" />
                {hours || "Lun-Sáb: 7:00 - 21:00"}
              </p>
              <a
                href={`https://wa.me/${waPhone || "595986106062"}?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n`}
                target="_blank" rel="noopener noreferrer"
                className="inline-block mt-1 text-[#e94560] hover:text-[#d1344f] transition-colors font-medium text-sm"
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
