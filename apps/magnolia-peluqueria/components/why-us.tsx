import { Award, Users, Star, Clock } from "lucide-react"

const reasons = [
  {
    icon: Clock,
    title: "Más de 15 Años",
    desc: "Experiencia que se nota en cada corte y coloración",
  },
  {
    icon: Users,
    title: "+800 Clientas",
    desc: "Mujeres que confían en Magnolia mes a mes",
  },
  {
    icon: Star,
    title: "4.9 Estrellas Google",
    desc: "Calificación promedio con más de 100 reseñas",
  },
  {
    icon: Award,
    title: "Productos Premium",
    desc: "Solo usamos marcas profesionales de alta gama",
  },
]

export function WhyUs() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "32px 32px"
      }} />

      <div className="container-page relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Tu Confianza, Nuestra Reputación
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            Cada clienta es única, y cada trabajo lo tratamos con la misma dedicación.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all text-center">
              <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}