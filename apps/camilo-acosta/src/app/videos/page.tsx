import { Play, Video, ExternalLink, Mic2 } from "lucide-react";
import MainLayout from "../../components/MainLayout";

const featuredVideos = [
  { id: 1, title: "Entrevista: origen de El Gato Siamés", platform: "Radio Up", image: "/images/gato/standup-context.webp", url: "https://radioup.com.ar/comedia-y-juegos-en-vivo-sala-tempo/", description: "Camilo explica el nombre, la estética del personaje, su humor negro y el formato one-liner." },
  { id: 2, title: "Noche de comedia en Absoluto Rock", platform: "ABC Color", image: "/images/gato/stage-microphone.webp", url: "https://www.abc.com.py/espectaculos/cultura/2023/11/27/noche-de-comedia-este-viernes-en-absoluto-rock/", description: "Registro de su show con humor negro, crítica social y gags para público metalero." },
  { id: 3, title: "Expresso: stand up paraguayo", platform: "La Nación", image: "/images/gato/gallery-workshop.webp", url: "https://www.lanacion.com.py/gran-diario-domingo/2025/05/18/es-muy-dificil-hacerle-reir-al-paraguayo/", description: "Perfil del comediante como una figura visible del movimiento emergente de stand up en Paraguay." },
];

const platforms = [
  { name: "Instagram", handle: "@el.gatosiames", color: "bg-gradient-to-br from-purple-500 to-pink-500", href: "https://www.instagram.com/el.gatosiames/" },
];

export default function VideosPage() {
  return (
    <MainLayout>
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
            <Play className="w-4 h-4" style={{ color: "#E63946" }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#E63946" }}>Clips, entrevistas y notas</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display mb-4">
            CONTENIDO <span style={{ color: "#E63946" }}>REAL</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Material público sobre Camilo Acosta / El Gato Siamés: entrevistas, notas y registro de shows.</p>
        </div>
      </section>

      <section className="py-8 bg-gray-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-sm text-white/40">Red principal:</span>
            {platforms.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                <span className={`w-6 h-6 ${p.color} rounded flex items-center justify-center`}><Video className="w-3 h-3 text-white" /></span>
                <span className="font-medium text-white">{p.name}</span>
                <span className="text-sm text-white/40">{p.handle}</span>
                <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group bg-black/50 border border-white/10 rounded-xl overflow-hidden hover:border-red-600/30 transition-all">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center overflow-hidden">
                  <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Mic2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-2">{video.platform}</div>
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-white/50 line-clamp-3 mb-4">{video.description}</p>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1 text-sm font-medium" style={{ color: "#E63946" }}>
                    Abrir fuente <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Seguile en Instagram</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">La cuenta pública asociada a El Gato Siamés es @el.gatosiames.</p>
        <a href="https://www.instagram.com/el.gatosiames/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-500 hover:opacity-90 text-white font-medium rounded-lg transition-all">
          <Video className="w-5 h-5" /> Instagram — @el.gatosiames
        </a>
      </section>
    </MainLayout>
  );
}
