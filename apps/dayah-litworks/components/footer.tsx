'use client'
import Link from "next/link"
import raw from "@/content/es.json"
import type { Content } from "@/types/content"

const content = raw as unknown as Content
const footer = content.footer
const phone = content.whatsapp.phone

export function Footer() {
  const businessName = content.placeholders?.businessName || content.businessName || "Dayah LitWorks"
  return (
    <footer className="bg-secondary pb-24 pt-12 text-secondary-foreground md:pb-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-base font-bold sm:text-lg">{businessName}</h3>
            <p className="text-xs text-white/70 sm:text-sm">{footer.description}</p>
            <p className="mt-2 text-xs text-white/70 sm:text-sm">{footer.address}</p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70 sm:text-sm">Enlaces</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              {content.navigation.items.slice(0, 5).map((item) => (
                <Link key={item.href} href={item.href} className="text-white/80 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70 sm:text-sm">Contacto</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <a href={`mailto:${footer.email}`} className="text-white/80 hover:text-white transition-colors">{footer.email}</a>
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">WhatsApp</a>
              <span className="text-white/60">{footer.phone}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70 sm:text-sm">Seguinos</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <a href={`https://instagram.com/${footer.instagram}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">Instagram</a>
              <a href={`https://facebook.com/${footer.facebook}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">Facebook</a>
              <a href={`https://linkedin.com/in/${footer.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-[10px] text-white/50 sm:text-xs">
          &copy; 2025 {businessName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
