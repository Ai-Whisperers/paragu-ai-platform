import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown } from "lucide-react"

export const metadata = { title: "Preguntas Frecuentes — Mantra Spa" }

const faqs = [{'q': '¿Cuáles son los horarios?', 'a': 'Lunes a sábado de 10:00 a 20:00. Domingos cerrado.'}, {'q': '¿Necesito reservar?', 'a': 'Sí, todos nuestros servicios son con cita previa. Reservá por WhatsApp.'}, {'q': '¿Qué tratamientos ofrecen?', 'a': 'Masajes relajantes, descontracturantes, tratamientos faciales, corporales y paquetes de bienestar.'}, {'q': '¿Cuánto duran las sesiones?', 'a': 'Los masajes duran entre 45 y 90 minutos según el tipo de tratamiento.'}, {'q': '¿Tienen gift cards?', 'a': 'Sí, ofrecemos gift cards para regalar experiencias de bienestar.'}]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-2">Preguntas Frecuentes</h1>
          <p className="text-center text-foreground-light mb-12">Todo lo que necesitás saber sobre Mantra Spa</p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <summary className="px-6 py-4 font-medium text-foreground cursor-pointer hover:text-secondary transition-colors list-none flex items-center justify-between">
                  {item.q}
                  <ChevronDown className="w-4 h-4 text-foreground-light shrink-0" />
                </summary>
                <p className="px-6 pb-4 text-foreground-light text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer
        businessName="Mantra Spa"
        tagline="Bienestar y Relax en Concepción"
        address="Concepción"
        phone="0981 106 062"
        hours="Lun-Sáb: 10:00 - 20:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
