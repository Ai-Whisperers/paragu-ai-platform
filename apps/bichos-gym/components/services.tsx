import { Clock } from "lucide-react"

const cats = [
  {
    name: "Membresías",
    image: "/images/gym-1.jpg",
    items: [
      { name: "Plan Básico", price: "Gs. 120.000/mes", desc: "Acceso a sala de pesas y cardio", duration: "Mensual" },
      { name: "Plan Premium", price: "Gs. 200.000/mes", desc: "Acceso total + clases dirigidas", duration: "Mensual" },
      { name: "Plan Anual", price: "Gs. 1.800.000/año", desc: "Acceso total por 12 meses (3 meses gratis)", duration: "Anual" },
    ],
  },
  {
    name: "Clases",
    image: "/images/gym-2.jpg",
    items: [
      { name: "Funcional", price: "Incluido", desc: "HIIT y entrenamiento funcional", duration: "45 min" },
      { name: "Spinning", price: "Incluido", desc: "Ciclismo indoor de alto nivel", duration: "45 min" },
      { name: "CrossFit", price: "Incluido", desc: "Entrenamiento de alta intensidad", duration: "60 min" },
      { name: "Yoga", price: "Incluido", desc: "Clases de yoga para todos los niveles", duration: "50 min" },
    ],
  },
  {
    name: "Servicios",
    image: "/images/gym-3.jpg",
    items: [
      { name: "Evaluación Física", price: "Gratis", desc: "Evaluación inicial para nuevos miembros", duration: "30 min" },
      { name: "Rutina Personalizada", price: "Incluida", desc: "Plan de entrenamiento diseñado para vos", duration: "—" },
      { name: "Nutrición", price: "Gs. 50.000", desc: "Consulta con nutricionista deportivo", duration: "45 min" },
    ],
  },
]

export function Services() {
  return (
    <section className="py-20 bg-[#f5f5f5]" id="servicios">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-2">
          Nuestros Servicios
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Dale fuerte, transformá tu cuerpo
        </p>
        <div className="space-y-12">
          {cats.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#e94560]/30">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#1a1a2e]">{cat.name}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((svc, si) => (
                  <div key={si} className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm hover:shadow-md hover:border-[#e94560]/30 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#2d2d2d]">{svc.name}</h4>
                      <span className="text-[#e94560] font-bold whitespace-nowrap ml-2">{svc.price}</span>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">{svc.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-[#9ca3af]">
                      <Clock className="w-3 h-3" /> {svc.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
