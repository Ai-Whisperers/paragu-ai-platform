import { MapPin, Phone, Clock, Dumbbell } from "lucide-react"

export function Location() {
  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container-page">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              Veni a entrenar
            </h2>
            <p className="text-[#6b6b6b] mb-8 leading-relaxed">
              Estamos en Capiatá. Equipamiento moderno, ambiente único y entrenadores listos para ayudarte.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e94560] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Dirección</p>
                  <p className="text-sm text-[#6b6b6b]">Capiatá, Paraguay</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#e94560] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Teléfono</p>
                  <p className="text-sm text-[#6b6b6b]">0981 106 062</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#e94560] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#2d2d2d]">Horarios</p>
                  <p className="text-sm text-[#6b6b6b]">Lun - Sáb: 7:00 - 21:00 | Dom: 9:00 - 13:00</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/595986106062?text=Hola!%20Quiero%20arrancar%20en%20Bicho's%20Gym"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#e94560] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d1344f] transition-all"
            >
              <Dumbbell className="w-5 h-5" /> Quiero sumarme
            </a>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-[#e5e7eb] h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115894.80339108072!2d-57.3509684!3d-25.3841585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945ddaaa8b5f8e59%3A0xa504015f5a0f0a7b!2sCapiat%C3%A1%2C%20Paraguay!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Bicho's Gym en Capiatá"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
