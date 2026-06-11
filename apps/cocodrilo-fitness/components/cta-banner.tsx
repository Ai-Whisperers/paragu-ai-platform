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
    <section className="relative overflow-hidden py-16 bg-gradient-to-r from-primary to-primary-light">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">¿Listo para empezar?</h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
          Contactanos hoy y te responderemos a la brevedad
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary-dark hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  )
}
