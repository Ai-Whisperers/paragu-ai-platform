import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-6xl font-black mb-4 bg-gradient-to-br from-rose-700 to-pink-500 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-black mb-3">Página no encontrada</h2>
      <p className="text-foreground-muted mb-8">
        La página que buscás no existe o fue movida.
      </p>
      <Link href="/es" className="inline-block bg-rose-700 hover:bg-rose-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
        Ir al mapa
      </Link>
    </div>
  )
}
