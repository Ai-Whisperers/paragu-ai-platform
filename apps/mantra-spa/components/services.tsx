import { Clock, Flower2 } from "lucide-react"

const cats = [
  {
    name: "Masajes",
    image: "/images/massage.jpg",
    items: [
      { name: "Masaje Relajante", price: "Gs. 150.000", desc: "Masaje suave para liberar tensiones", duration: "60 min" },
      { name: "Masaje Descontracturante", price: "Gs. 180.000", desc: "Masaje profundo para nudos musculares", duration: "60 min" },
      { name: "Masaje con Piedras Calientes", price: "Gs. 250.000", desc: "Piedras volcánicas para relajación profunda", duration: "75 min" },
    ],
  },
  {
    name: "Tratamientos Faciales",
    image: "/images/facial.jpg",
    items: [
      { name: "Limpieza Facial", price: "Gs. 100.000", desc: "Limpieza profunda con productos naturales", duration: "45 min" },
      { name: "Hidratación Facial", price: "Gs. 130.000", desc: "Tratamiento hidratante revitalizante", duration: "45 min" },
      { name: "Anti-Edad", price: "Gs. 200.000", desc: "Tratamiento reafirmante y nutritivo", duration: "60 min" },
    ],
  },
  {
    name: "Corporales",
    image: "/images/spa-1.jpg",
    items: [
      { name: "Exfoliación Corporal", price: "Gs. 180.000", desc: "Exfoliación de cuerpo completo", duration: "50 min" },
      { name: "Envoltura Corporal", price: "Gs. 220.000", desc: "Envoltura nutritiva e hidratante", duration: "60 min" },
      { name: "Paquete Bienestar", price: "Gs. 350.000", desc: "Masaje + facial + exfoliación", duration: "2 horas" },
    ],
  },
]

export function Services() {
  return (
    <section className="py-20 bg-[#f8f7f4]" id="servicios">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#0f1a2e] mb-2">
          Nuestros Servicios
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Renová tu cuerpo y mente con nuestros tratamientos
        </p>
        <div className="space-y-12">
          {cats.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#e8d5b7]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#0f1a2e]">{cat.name}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((svc, si) => (
                  <div key={si} className="bg-white rounded-xl p-5 border border-[#e5e2da] shadow-sm hover:shadow-md hover:border-[#c9a96e]/30 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#2d2d2d]">{svc.name}</h4>
                      <span className="text-[#c9a96e] font-bold whitespace-nowrap ml-2">{svc.price}</span>
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
