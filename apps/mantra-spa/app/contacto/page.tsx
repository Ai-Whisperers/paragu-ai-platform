import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"

export const metadata = { title: "Contacto — Mantra Spa" }

// TODO(engineer): real phone needed — '0981 106 062' + wa 595986106062 are placeholders
// (shared between cocodrilo-fitness + mantra-spa in prior clones)
const TODO_PHONE = "TODO_PHONE"
const displayPhone = TODO_PHONE
const waPhone = TODO_PHONE

export default function ContactoPage() {
  const hasPhone = displayPhone !== TODO_PHONE
  const hasWa = waPhone !== TODO_PHONE
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-primary mb-2">Contacto</h1>
          <p className="text-foreground-light mb-10">Estamos para ayudarte</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Dirección</p>
                  <p className="text-sm text-foreground-light">Concepción</p>
                </div>
              </div>
              {hasPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Teléfono</p>
                    <p className="text-sm text-foreground-light">{displayPhone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Horarios</p>
                  <p className="text-sm text-foreground-light">Lun-Sáb: 10:00 - 20:00</p>
                </div>
              </div>
            </div>
            {hasWa && (
              <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-primary mb-4">Escribinos por WhatsApp</h2>
                <p className="text-foreground-light mb-6">Respondemos en menos de 5 minutos</p>
                <a href={`https://wa.me/${waPhone}?text=Hola!%20Quiero%20informaci%C3%B3n`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all">
                  <MessageCircle className="w-5 h-5" /> Contactar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer
        businessName="Mantra Spa"
        tagline="Bienestar y Relax en Concepción"
        address="Concepción"
        phone={hasPhone ? displayPhone : undefined}
        hours="Lun-Sáb: 10:00 - 20:00"
        waPhone={hasWa ? waPhone : undefined}
      />
      <WhatsAppFloat />
    </>
  )
}
