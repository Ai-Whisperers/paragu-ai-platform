import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import Link from "next/link"

export const metadata = { title: "Página no encontrada — Complejo Cocodrilo" }

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center px-4 max-w-lg mx-auto">
          <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Página no encontrada</h2>
          <p className="text-foreground-light mb-8">La página que buscas no existe o fue movida.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-all">
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer
        businessName="Complejo Cocodrilo"
        tagline=""
        address=""
        phone="595986106062"
        hours=""
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
