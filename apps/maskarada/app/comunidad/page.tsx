import Link from "next/link";
import { content } from "@/lib/content";

export const metadata = {
  title: "Comunidad — Club maškaráda",
  description:
    "La comunidad maškaráda: cómo unirse, el equipo, las reglas, los eventos, y todo lo que necesitás saber para ser parte.",
};

const STAFF = [
  { icon: "🎭", role: "Organización", name: "El equipo", bio: "Coordinación, seguridad, producción, comunicación." },
  { icon: "🎶", role: "DJ Sets", name: "Sonido oscuro", bio: "EBM, dark techno, industrial. La atmósfera musical." },
  { icon: "🪢", role: "Shibari & Ropes", name: "Moñai Ropes", bio: "Equipo de cuerdas shobari. Zona Cuerdas, demos, práctica supervisada." },
  { icon: "🎨", role: "Performances", name: "Artistas del cuerpo", bio: "Body painting, performances eróticas, instalaciones." },
  { icon: "🛡️", role: "Seguridad & Consentimiento", name: "El equipo SS", bio: "Velar por las reglas SSC/RACK. Intervenir cuando algo no está bien." },
];

export default function Comunidad() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎭</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Comunidad
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            maškaráda es una comunidad de personas que exploran el kink de forma consensuada. Esta
            sección es para quienes quieren ser parte, entender cómo operamos, y conocer al
            equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link
            href="/eventos"
            className="block border border-blood-500/20 rounded-xl p-6 bg-white/[0.02] hover:border-blood-500/40 transition-all"
          >
            <div className="text-3xl mb-3">📅</div>
            <h2 className="text-lg font-semibold text-white mb-1">Eventos formales</h2>
            <p className="text-sm text-gray-400">Calendario de ediciones de gran formato: próximos, pasados, line-up, preventa.</p>
          </Link>
          <Link
            href="/encuentros"
            className="block border border-gold-400/20 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/40 transition-all"
          >
            <div className="text-3xl mb-3">☕</div>
            <h2 className="text-lg font-semibold text-white mb-1">Encuentros regulares</h2>
            <p className="text-sm text-gray-400">Munches, rope jams, workshops. Sin play, principiantes bienvenidos.</p>
          </Link>
          <Link
            href="/reglas"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-3">🤝</div>
            <h2 className="text-lg font-semibold text-white mb-1">Reglas del Club</h2>
            <p className="text-sm text-gray-400">El código de conducta. Lectura obligatoria antes de cualquier evento.</p>
          </Link>
        </div>

        {/* Conversación + recursos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link
            href="/foro"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-3">💬</div>
            <h2 className="text-lg font-semibold text-white mb-1">Foro</h2>
            <p className="text-sm text-gray-400">Conversación de la comunidad por categoría. Para principiantes, encuentros, seguridad.</p>
          </Link>
          <Link
            href="/cine"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-3">🎬</div>
            <h2 className="text-lg font-semibold text-white mb-1">Cine</h2>
            <p className="text-sm text-gray-400">Películas, cortos y series curados con temas de deseo, sensualidad y kink.</p>
          </Link>
          <Link
            href="/musica"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-3">🎵</div>
            <h2 className="text-lg font-semibold text-white mb-1">Música y podcasts</h2>
            <p className="text-sm text-gray-400">DJ sets, mixtapes, podcasts. Lo que suena en los eventos y en el viaje.</p>
          </Link>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">El equipo</h2>
          <p className="text-sm text-gray-400 mb-6">Las personas que organizan cada edición, mantienen la atmósfera y velan por el cumplimiento de las reglas.</p>
          <div className="space-y-4">
            {STAFF.map((m, i) => (
              <div key={i} className="border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-4xl shrink-0">{m.icon}</div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gold-400 mb-0.5">{m.role}</div>
                    <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/aprender/que-es-bdsm"
            className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
          >
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-white mb-1">¿Nuevo en el kink?</h3>
            <p className="text-sm text-gray-400">Empezá con la guía "¿Qué es BDSM?". Cubre lo básico.</p>
          </Link>
          <Link
            href="/tienda/aplicar"
            className="block border border-gold-400/20 rounded-xl p-6 bg-gold-400/5 hover:border-gold-400/40 transition-all"
          >
            <div className="text-3xl mb-2">🏪</div>
            <h3 className="font-semibold text-white mb-1">¿Querés vender en la tienda?</h3>
            <p className="text-sm text-gray-400">Si tenés un emprendimiento kink-friendly, podés aplicar a ser vendor.</p>
          </Link>
        </div>

        <div className="p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">
            ¿Tenés preguntas o querés saber más antes de venir?
          </p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20la%20comunidad%20ma%C5%A1kar%C3%A1da`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
