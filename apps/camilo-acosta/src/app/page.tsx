import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Play, Mail, Mic2 } from "lucide-react";
import MainLayout from "../components/MainLayout";

const highlights = [
  { label: "Nombre real", value: "Camilo Acosta", icon: "🎭" },
  { label: "Formato", value: "One-liners", icon: "🎤" },
  { label: "Estilo", value: "Humor negro", icon: "🖤" },
];

const sources = [
  "La Nación 2025: figura visible del stand up emergente en Paraguay; humor ácido, negro, absurdo e inexpresivo.",
  "Radio Up: entrevista sobre Esposadas, one-liners, humor negro y origen del nombre.",
  "ABC Color: show en Absoluto Rock con humor negro, crítica social y público metalero.",
  "La Nación 2023: video viral de stand up en bondis; también brinda clases de stand up.",
];

const gallery = [
  { src: "/images/gato/stage-microphone.webp", alt: "El Gato Siamés con micrófono en vivo", label: "En vivo" },
  { src: "/images/gato/live-performance.webp", alt: "El Gato Siamés en performance", label: "Stand up" },
  { src: "/images/gato/gallery-group.webp", alt: "El Gato Siamés con elenco y comunidad", label: "Escena" },
];

export default function HomePage() {
  return (
    <MainLayout>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src="/images/gato/hero-camilo-acosta.webp" alt="Camilo Acosta — El Gato Siamés" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-950/70 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-8 opacity-0 animate-fade-in">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
              Stand up paraguayo · Humor negro · One-liners
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6 opacity-0 animate-fade-in delay-100">
            EL GATO<span style={{ color: "#E63946" }}> SIAMÉS</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in delay-200">
            Camilo Acosta. Comediante paraguayo de stand up con humor oscuro, seco y directo:
            one-liners, doble sentido y una persona escénica negra, seria e inolvidable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-300">
            <Link href="/shows" className="group flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all" style={{ backgroundColor: "#E63946" }}>
              <Calendar className="w-5 h-5" />
              Ver Shows
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/videos" className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium rounded-lg transition-all">
              <Play className="w-5 h-5" />
              Ver Contenido
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-0 animate-fade-in delay-400">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="text-3xl mb-1">{item.icon}</div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-6">
            <Mail className="w-4 h-4" style={{ color: "#E63946" }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#E63946" }}>
              Agenda y novedades
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Enterate del próximo show</h2>
          <p className="text-white/60 mb-8">
            Dejá tu correo para recibir fechas, entradas anticipadas y contenido detrás de escena.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="tu@email.com" className="flex-1" required />
            <button type="submit" className="px-6 py-3 text-white font-semibold rounded-lg transition-colors" style={{ backgroundColor: "#E63946" }}>
              Suscribirme
            </button>
          </form>
          <p className="text-xs text-white/30 mt-4">Sin spam. Solo fechas y material útil.</p>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Próximos <span style={{ color: "#E63946" }}>Shows</span>
            </h2>
            <p className="text-white/60">Agenda abierta para teatros, bares, festivales y eventos privados.</p>
          </div>
          <div className="grid gap-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[60px]">
                  <div className="font-bold" style={{ color: "#E63946" }}>2026</div>
                  <div className="text-white/40 text-sm">Agenda</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Paraguay y región</div>
                  <div className="text-sm text-white/50 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Fechas por confirmar
                  </div>
                </div>
              </div>
              <a href="/contacto" className="px-5 py-2 text-white text-sm font-medium rounded-lg transition-colors" style={{ backgroundColor: "#E63946" }}>
                Consultar booking
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/images/gato/bio-dark-portrait.webp" alt="El Gato Siamés — retrato oscuro" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-xs font-medium uppercase tracking-wider mb-4" style={{ color: "#E63946" }}>
                Sobre el personaje
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Humor oscuro, serio y <span style={{ color: "#E63946" }}>sin acting de más</span>
              </h2>
              <p className="text-white/60 mb-4">
                El nombre juega con dos sentidos: la raza de gato siamés y la idea de dos cuerpos unidos desde el nacimiento. Su logo —un gato cargando otro— resume esa dualidad entre Camilo y su alter ego.
              </p>
              <p className="text-white/60 mb-6">
                En escena aparece de negro, con falda y cadenas, casi inexpresivo. Su humor usa monólogos, chistes cortos, doble sentido y humor negro sin buscar ofender: el filtro final es que el remate funcione.
              </p>
              <Link href="/bio" className="inline-flex items-center gap-2 font-medium" style={{ color: "#E63946" }}>
                Leer perfil completo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Mic2 className="w-10 h-10 mx-auto mb-4" style={{ color: "#E63946" }} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Investigación base</h2>
            <p className="text-white/60">Contenido actualizado con fuentes públicas sobre Camilo Acosta / El Gato Siamés.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sources.map((source) => (
              <div key={source} className="p-5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60">
                {source}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Material <span style={{ color: "#E63946" }}>visual real</span></h2>
            <p className="text-white/60">Fotos provistas desde el archivo público de @el.gatosiames.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {gallery.map((item) => (
              <div key={item.src} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-medium uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
