"use client"
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Algo salio mal</h1>
        <p className="text-foreground-light mb-8">Ocurrio un error inesperado.</p>
        <button onClick={() => reset()} className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary-dark transition-all">
          Intentar de nuevo
        </button>
      </div>
    </main>
  )
}
