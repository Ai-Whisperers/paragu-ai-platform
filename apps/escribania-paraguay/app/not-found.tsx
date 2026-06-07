import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export const metadata: Metadata = {
  title: "Página no encontrada | Escribanía Paraguay",
  description: "La página que buscas no existe. Volvé al inicio o contactanos.",
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center section-padding">
        <div className="container-page text-center">
          <div className="mb-8">
            <span className="text-[8rem] leading-none font-heading font-bold text-[var(--color-accent)]">
              404
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Página no encontrada
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-md mx-auto mb-8">
            La página que estás buscando no existe o ha sido movida.
            Volvé al inicio o contactanos si necesitás ayuda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[var(--color-primary)] text-white font-accent font-medium hover:opacity-90 transition-opacity"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-accent font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
