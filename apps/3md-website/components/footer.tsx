import Link from "next/link"
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-xl font-bold text-foreground">
              3<span className="text-secondary">MIND</span>
            </Link>
            <p className="text-sm text-foreground-light mt-3 max-w-xs">
              Transformamos ideas en experiencias visuales impactantes.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://instagram.com/somos3md" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-light flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/p/3-MIND-61565791512167" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-light flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-foreground-light hover:text-foreground transition-colors">Inicio</Link>
              <Link href="/portfolio" className="text-foreground-light hover:text-foreground transition-colors">Portfolio</Link>
              <Link href="/servicios" className="text-foreground-light hover:text-foreground transition-colors">Servicios</Link>
              <Link href="/nosotros" className="text-foreground-light hover:text-foreground transition-colors">Nosotros</Link>
              <Link href="/blog" className="text-foreground-light hover:text-foreground transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">Servicios</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/servicios" className="text-foreground-light hover:text-foreground transition-colors">Marketing Digital</Link>
              <Link href="/servicios" className="text-foreground-light hover:text-foreground transition-colors">Produccion Audiovisual</Link>
              <Link href="/servicios" className="text-foreground-light hover:text-foreground transition-colors">Fotografia</Link>
              <Link href="/servicios" className="text-foreground-light hover:text-foreground transition-colors">Publicidad</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">Contacto</h4>
            <div className="text-sm text-foreground-light space-y-3">
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />Fray Luis de Leon C/Venezuela, Asuncion</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" />0991 691 501</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" />3mindpy@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} 3 MIND. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-foreground transition-colors">Terminos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
