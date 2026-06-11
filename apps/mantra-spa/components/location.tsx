import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"

export function Location() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0f1a2e] mb-4">
              Visitanos
            </h2>
            <p className="text-[#6b6b6b] mb-8 leading-relaxed">
              Estamos ubicados en Concepción, Paraguay. Contactanos para agendar tu cita.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Dirección</p>
                  <p className="text-sm text-[#6b6b6b]">Concepción, Paraguay</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Teléfono</p>
                  <p className="text-sm text-[#6b6b6b]">0981 106 062</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Horarios</p>
                  <p className="text-sm text-[#6b6b6b]">Lun - Sáb: 10:00 - 20:00</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/595986106062?text=Hola!%20Quiero%20agendar%20una%20cita"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#c9a96e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8944e] transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Agendar por WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-[#e5e2da] h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115903.15247763393!2d-57.50516545136719!3d-23.407825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94605f163e6b6b5d%3A0x9c6c4e8a7bdb1c9b!2sConcepci%C3%B3n%2C%20Paraguay!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Mantra Spa en Concepción"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
