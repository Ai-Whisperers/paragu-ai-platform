import Link from 'next/link'
import { getSite, type Lang } from '@/lib/content'

export default async function NotFound({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = getSite((lang as Lang) || 'es')
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-6xl font-black mb-4 bg-gradient-to-br from-rose-700 to-pink-500 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-black mb-3">Página no encontrada</h2>
      <p className="text-foreground-muted mb-8">
        La página que buscás no existe o fue movida. Volvé al mapa para explorar los casos.
      </p>
      <div className="flex justify-center gap-3">
        <Link href={`/${lang}`} className="inline-block bg-rose-700 hover:bg-rose-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Ir al mapa
        </Link>
        <Link href={`/${lang}/recursos`} className="inline-block border border-rose-700 text-rose-700 hover:bg-rose-50 px-6 py-3 rounded-lg font-semibold transition-colors">
          Ver recursos de ayuda
        </Link>
      </div>
    </div>
  )
}
