import { Dumbbell } from "lucide-react"

export function CtaBanner({
  waPhone,
  message,
}: {
  waPhone?: string
  message?: string
}) {
  const phone = waPhone || "595986106062"
  const msg = message || "Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n"
  const wa = `https://wa.me/${phone}?text=${msg}`

  return (
    <section className="relative overflow-hidden py-20 bg-[#1a1a2e]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white font-heading">
          ¿Listo para transformar tu cuerpo?
        </h2>
        <div className="w-12 h-0.5 bg-[#e94560] mx-auto mb-6" />
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">
          Sumate hoy y empezá a ver resultados desde la primera semana
        </p>
        <a
          href={wa}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#e94560] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#d1344f] hover:scale-105"
        >
          <Dumbbell className="w-5 h-5" />
          Quiero sumarme
        </a>
      </div>
    </section>
  )
}
