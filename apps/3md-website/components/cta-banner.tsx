export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-secondary to-secondary-dark">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para crear algo increíble?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
          Contanos tu proyecto y te responderemos en menos de 24 horas.
        </p>
        <a href="https://wa.me/595991691501?text=Hola!%20Quiero%20contarles%20mi%20proyecto"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white text-secondary px-8 py-4 text-base font-bold shadow-lg transition-all hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
          Empezar proyecto
        </a>
      </div>
    </section>
  )
}
