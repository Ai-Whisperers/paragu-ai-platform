import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import Link from "next/link"
import { getSiteName } from "@/lib/config/config"

export const metadata = { title: `Pagina no encontrada | ${getSiteName()}` }

const suggestedLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="mb-6">
            <span className="text-8xl font-bold text-primary/10">404</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary mb-3">
            Esta pagina no existe
          </h1>
          <p className="text-foreground-light mb-8 text-lg">
            Lo sentimos, no pudimos encontrar lo que buscabas. Puede que el enlace este roto o la pagina haya sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al inicio
            </Link>
            <Link href="/contacto" className="inline-flex items-center gap-2 border border-gray-300 text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all">
              Contactar por WhatsApp
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-foreground-muted mb-4">Tambien puedes probar:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-secondary hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer lang="es" />
      <WhatsAppFloat lang="es" />
    </>
  )
}