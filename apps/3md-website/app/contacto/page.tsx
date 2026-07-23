import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Contacto</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Hablemos</h1>
            <p className="text-foreground-light max-w-xl mx-auto">Contanos tu proyecto y te responderemos en menos de 24 horas.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Direccion</p>
                  <p className="text-sm text-foreground-light">Fray Luis de Leon C/Venezuela, Asuncion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Telefono</p>
                  <p className="text-sm text-foreground-light">0991 691 501</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-foreground-light">3mindpy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Horarios</p>
                  <p className="text-sm text-foreground-light">Siempre abiertos</p>
                </div>
              </div>
              <a href="https://wa.me/595991691501?text=Hola!%20Quiero%20contarles%20mi%20proyecto"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all">
                <MessageCircle className="w-5 h-5" /> Escribinos por WhatsApp
              </a>
            </div>
            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">Envianos un mensaje</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Nombre" className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:border-secondary" />
                <input type="email" placeholder="Email" className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:border-secondary" />
                <select className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary">
                  <option>Servicio de interes</option>
                  <option>Marketing Digital</option>
                  <option>Produccion Audiovisual</option>
                  <option>Fotografia</option>
                  <option>Publicidad</option>
                  <option>Otro</option>
                </select>
                <textarea rows={4} placeholder="Contanos tu proyecto" className="w-full bg-surface-light border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:border-secondary" />
                <button type="submit" className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
