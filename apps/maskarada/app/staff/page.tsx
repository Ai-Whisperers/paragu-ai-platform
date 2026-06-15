import RevealOnScroll from "@/components/RevealOnScroll";
import { content } from "@/lib/content";

const team = [
  {
    id: "organizacion",
    role: "Organización",
    name: "El equipo",
    bio: "Detrás de cada evento está un equipo que trabaja en silencio — coordinación, seguridad, producción y comunicación — para que cuando llegués, todo esté listo.",
    icon: "🎭",
  },
  {
    id: "djs",
    role: "DJ Sets",
    name: "Sonido oscuro",
    bio: "EBM, dark techno, industrial y todo lo que mueve cuerpos en la oscuridad. Nuestra selección musical crea la atmósfera que define cada edición.",
    icon: "🎶",
  },
  {
    id: "shibari",
    role: "Shibari & Ropes",
    name: "Moñai Ropes",
    bio: "El equipo de cuerdas shobari. Encargados de la Zona Cuerdas donde se realizan ligaduras conscientes, demostraciones y prácticas supervisadas. Todas nuestras cuerdas son artesanalmente hechas en Asunción.",
    icon: "⛓️",
  },
  {
    id: "performer",
    role: "Performances",
    name: "Artistas del cuerpo",
    bio: "Body painting en vivo, performances eróticas y cuadros que transforman el espacio. Cada edición convoca artistas locales que traen algo único.",
    icon: "🎨",
  },
  {
    id: "seguridad",
    role: "Seguridad & Consentimiento",
    name: "El equipo SS",
    bio: "Encargados de velar por el cumplimiento de las reglas SSC/RACK. Están para consensuar, intervienen cuando algo no está bien y sostienen el espacio seguro.",
    icon: "🛡️",
  },
];

export default function Staff() {
  return (
    <>
      <RevealOnScroll />
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-5xl mb-6">🎭</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 reveal">
              El equipo maškaráda
            </h1>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6 reveal" />
            <p className="text-gray-400 text-lg reveal max-w-xl mx-auto">
              La experiencia no se construye sola. Conocé a las personas y roles detrás de cada
              edición.
            </p>
          </div>

          <div className="space-y-8">
            {team.map((m) => (
              <div
                key={m.id}
                className="reveal border border-white/5 rounded-xl p-8 bg-white/[0.02] hover:border-gold-400/20 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0 mt-1">{m.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gold-400 mb-1">
                      {m.role}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{m.name}</h2>
                    <p className="text-gray-400 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-8 border border-white/5 rounded-xl bg-white/[0.02] reveal">
            <div className="text-3xl mb-4">🎟️</div>
            <h3 className="text-xl font-bold text-white mb-2">¿Querés ser parte del equipo?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Buscamos DJs, performers, bodies y artistas para futuras ediciones.
              <br />
              Escribinos y contanos qué proponés.
            </p>
            <a
              href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20ser%20parte%20del%20equipo%20maškaráda`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              Contactar por WhatsApp
            </a>
          </div>

          <div className="mt-8 p-8 border border-gold-400/20 rounded-xl bg-gold-400/5 reveal">
            <div className="flex items-start gap-6">
              <div className="text-5xl flex-shrink-0 mt-1">🪢</div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-gold-400 mb-1">
                  Moñai Ropes
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Cuerdas shobari artesanales
                </h2>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  El proyecto de cuerdas artesanales de Club maškaráda. Cáñamo natural y algodón
                  orgánico, fabricados a mano en Asunción. Tested para uso en shibari y bondage.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="/tienda"
                    className="bg-gold-400 hover:bg-gold-500 text-black px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
                  >
                    Ver tienda Moñai
                  </a>
                  <span className="text-xs text-gray-500">Gs. 45.000 — 145.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
