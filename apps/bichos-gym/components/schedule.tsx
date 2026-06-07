const schedule = [
  { time: "07:00", mon: "Funcional", tue: "CrossFit", wed: "Funcional", thu: "CrossFit", fri: "Funcional", sat: "Yoga" },
  { time: "08:00", mon: "Spinning", tue: "Yoga", wed: "Spinning", thu: "Yoga", fri: "Spinning", sat: "Funcional" },
  { time: "10:00", mon: "Yoga", tue: "Funcional", wed: "Yoga", thu: "Funcional", fri: "Yoga", sat: "—" },
  { time: "17:00", mon: "CrossFit", tue: "Spinning", wed: "CrossFit", thu: "Spinning", fri: "CrossFit", sat: "—" },
  { time: "18:00", mon: "Funcional", tue: "CrossFit", wed: "Funcional", thu: "CrossFit", fri: "Funcional", sat: "—" },
  { time: "19:00", mon: "Spinning", tue: "Yoga", wed: "Spinning", thu: "Yoga", fri: "Spinning", sat: "—" },
]

const days = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"] as const

export function Schedule() {
  return (
    <section className="py-20 bg-[#f5f5f5]" id="horarios">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-2">
          Horarios de Clases
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Encontramos el horario perfecto para vos
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] shadow-sm">
          <table className="w-full text-sm bg-white">
            <thead>
              <tr className="bg-[#1a1a2e] text-white">
                <th className="p-3 text-left font-semibold">Horario</th>
                {days.map((d) => (
                  <th key={d} className="p-3 text-center font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr key={i} className="border-t border-[#e5e7eb] hover:bg-[#f5f5f5] transition-colors">
                  <td className="p-3 font-bold text-[#1a1a2e] whitespace-nowrap">{row.time}</td>
                  {days.map((d, j) => {
                    const key = d.toLowerCase().slice(0, 3) as keyof typeof row
                    const val = row[key] as string
                    const isActive = val !== "—"
                    return (
                      <td key={j} className="p-3 text-center">
                        {isActive ? (
                          <span className="inline-block px-3 py-1 rounded-full bg-[#e94560]/10 text-[#e94560] font-medium text-xs">
                            {val}
                          </span>
                        ) : (
                          <span className="text-[#9ca3af] text-xs">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-sm text-[#6b6b6b] mt-4">
          Domingos: 9:00 - 13:00 (Sala abierta, sin clases dirigidas)
        </p>
      </div>
    </section>
  )
}
