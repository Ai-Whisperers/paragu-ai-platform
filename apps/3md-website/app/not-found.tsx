import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        <h1 className="font-heading text-8xl font-bold text-secondary mb-4">404</h1>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Pagina no encontrada</h2>
        <p className="text-foreground-light mb-8">La pagina que buscas no existe o fue movida.</p>
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary-dark transition-all">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
