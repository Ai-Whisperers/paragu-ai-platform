"use client"
export function CtaBanner() {
  return (
    <section className="my-10 rounded-xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F62FE 100%)" }}>
      <h2 className="text-xl font-bold text-white mb-2">¿Necesitás vidrio para tu proyecto?</h2>
      <p className="text-white/80 mb-5 text-sm">Consultanos sin compromiso. Te respondemos en el día.</p>
      <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
        className="inline-block rounded-lg bg-white text-[#0F62FE] px-6 py-3 font-semibold text-sm hover:bg-white/90 transition-colors">
        Consultar por WhatsApp
      </a>
    </section>
  )
}
