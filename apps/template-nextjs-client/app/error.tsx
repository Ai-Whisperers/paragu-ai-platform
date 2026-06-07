"use client"
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Algo salió mal</h1>
      <p className="text-muted-foreground mb-8">Ocurrió un error inesperado. Ya lo estamos revisando.</p>
      <div className="flex gap-4">
        <button onClick={reset}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-primary/90">
          Intentar de nuevo
        </button>
        <a href="https://wa.me/595981234567?text=¡Hola!%20Vi%20un%20error%20en%20la%20web"
          target="_blank" rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-[#20BD5A]">
          Reportar por WhatsApp
        </a>
      </div>
    </div>
  )
}
