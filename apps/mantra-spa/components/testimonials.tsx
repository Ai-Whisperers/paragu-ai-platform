const testimonials = [
  {
    name: "María López",
    text: "La mejor experiencia de spa en Concepción. El masaje con piedras calientes es increíble, salí renovada.",
  },
  {
    name: "Carlos Mendoza",
    text: "Excelente atención y profesionales. Muy recomendable para desconectar del estrés diario.",
  },
  {
    name: "Ana Ferreira",
    text: "El paquete bienestar es perfecto. Masaje, facial y exfoliación en una misma sesión. Volveré seguro.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-[#f8f7f4]">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#0f1a2e] mb-2">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Opiniones reales de quienes ya vivieron la experiencia
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-[#e5e2da] shadow-sm">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#6b6b6b] mb-4 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8d5b7] flex items-center justify-center text-[#0f1a2e] font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#2d2d2d]">{t.name}</p>
                  <p className="text-xs text-[#9ca3af]">Cliente verificad@</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
