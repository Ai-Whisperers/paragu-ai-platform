import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-7xl mb-4">🪶</div>
        <div className="text-sm uppercase tracking-[0.3em] text-gold-400 mb-3">404</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
          Esta página se perdió en la noche
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed mb-8">
          La máscara se cayó, el escenario quedó vacío. La URL que buscás no existe — al menos no acá.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Volver al inicio
          </Link>
          <Link
            href="/eventos"
            className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Ver eventos
          </Link>
        </div>
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">O andá directo a</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/tienda" className="text-gray-300 hover:text-gold-400 transition-colors">
              Tienda
            </Link>
            <Link href="/aprender" className="text-gray-300 hover:text-gold-400 transition-colors">
              Aprender
            </Link>
            <Link href="/aliados" className="text-gray-300 hover:text-gold-400 transition-colors">
              Aliados
            </Link>
            <Link href="/colaborar" className="text-gray-300 hover:text-gold-400 transition-colors">
              Colaborar
            </Link>
            <Link href="/donar" className="text-gray-300 hover:text-gold-400 transition-colors">
              Donar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
