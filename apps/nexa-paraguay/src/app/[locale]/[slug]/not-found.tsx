export default function NotFound() {
  return (
    <div className="text-center py-32 px-4">
      <h1 className="text-4xl font-bold text-primary mb-4">404 — Página no encontrada</h1>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        Esta página no existe o ha sido consolidada en otra sección del sitio.
      </p>
      <a
        href="/es"
        className="inline-block px-8 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity no-underline"
      >
        Volver al inicio
      </a>
    </div>
  )
}