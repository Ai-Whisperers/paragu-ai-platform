import { Dumbbell, Heart, Users, Award } from "lucide-react"

const stats = [
  { icon: Dumbbell, value: "3+", label: "Años de experiencia" },
  { icon: Heart, value: "800+", label: "Miembros activos" },
  { icon: Users, value: "10+", label: "Entrenadores" },
  { icon: Award, value: "15+", label: "Clases semanales" },
]

export function Stats() {
  return (
    <section className="py-16 bg-[#1a1a2e]">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-8 h-8 text-[#e94560] mx-auto mb-3" />
              <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                {s.value}
              </div>
              <div className="text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
