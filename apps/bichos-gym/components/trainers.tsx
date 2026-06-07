const trainers = [
  { name: "Carlos Benítez", role: "Head Coach / Funcional", image: "/images/trainer.jpg" },
  { name: "Laura Mendoza", role: "Spinning & Yoga", image: "/images/trainer2.jpg" },
  { name: "Miguel Ávalos", role: "CrossFit & Pesas", image: "/images/trainer.jpg" },
]

export function Trainers() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-2">
          Nuestro Equipo
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Entrenadores certificados para guiarte en cada paso
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((t, i) => (
            <div key={i} className="group text-center">
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/5]">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1a1a2e] mb-1">{t.name}</h3>
              <p className="text-sm text-[#e94560] font-medium">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
