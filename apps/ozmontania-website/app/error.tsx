'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-serif font-bold mb-4">Algo salió mal</h1>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Hubo un error al cargar esta página. Probá de nuevo o volvé al inicio.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </button>
          <a href="/" className="btn-outline">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  )
}
