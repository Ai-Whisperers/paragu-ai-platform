"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center px-4 max-w-lg mx-auto">
          <h1 className="font-heading text-4xl font-bold text-primary mb-2">Algo salio mal</h1>
          <p className="text-foreground-light mb-8">Ocurrio un error inesperado. Por favor intenta de nuevo.</p>
          <button onClick={() => reset()} className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-all">
            Intentar de nuevo
          </button>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}