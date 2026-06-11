import { Sparkles, Heart, Users, Award } from "lucide-react"

const stats = [
  { icon: Sparkles, value: "5+", label: "Años de experiencia" },
  { icon: Heart, value: "1000+", label: "Tratamientos realizados" },
  { icon: Users, value: "500+", label: "Clientes satisfechos" },
  { icon: Award, value: "4.9", label: "Calificación promedio" },
]

export function Stats() {
  return (
    <section className="py-16 bg-[#0f1a2e]">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-[#c9a96e] mx-auto mb-3" />
              <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
