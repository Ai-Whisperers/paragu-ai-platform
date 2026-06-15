import { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre — Club maškaráda",
  description:
    "Conocé más sobre Club maškaráda: la fiesta BDSM/kink en Asunción, Paraguay. Cultura del consentimiento, espacios seguros y liberación del deseo.",
};

const momentImages = [
  "instagram_474917",
  "instagram_474979",
  "instagram_475433",
  "instagram_476627",
  "instagram_503576",
];

const teamCards = [
  {
    icon: "🎭",
    name: "Organizador",
    role: "Fundador & Anfitrión",
    bio: "Creador del espacio y responsable de mantener la visión, la logística y la atmósfera de cada evento.",
  },
  {
    icon: "🎧",
    name: "DJ",
    role: "Música & Ambiente",
    bio: "Encargado del set musical que construye el viaje sensorial de la noche: electrónica, EBM y ritmos hipnóticos.",
  },
  {
    icon: "🛡️",
    name: "Seguridad",
    role: "Supervisión & Cuidado",
    bio: "Persona entrenada que vela por el cumplimiento de las normas SSC/RACK y el bienestar de todos los participantes.",
  },
];

export default function Sobre() {
  return (
    <>
      <RevealOnScroll />
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 reveal">Sobre maškaráda</h1>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6 reveal" />
          </div>

          <div className="mb-12 rounded-xl overflow-hidden border border-white/5 reveal">
            <picture>
              <source srcSet="/images/photos/event_508986.webp" type="image/webp" />
              <img
                src="/images/photos/event_508986.jpg"
                alt="Ambiente maškaráda"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-lg font-light reveal">
              maškaráda nace de la necesidad de un espacio donde el deseo pueda mostrarse sin caretas
              sociales, donde el juego erótico y la exploración kink tengan un hogar en Asunción.
            </p>
            <p className="reveal">
              Somos una comunidad que celebra la diversidad del deseo. No importa si sos experto en
              BDSM o si es tu primera vez explorando — nuestro espacio está diseñado para que te
              sientas seguro, respetado y libre.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 reveal">Nuestra filosofía</h2>
            <p className="reveal">
              Todas nuestras actividades se enmarcan en los principios{" "}
              <strong className="text-gold-400">SSC</strong> (Sano, Seguro y Consensuado) y{" "}
              <strong className="text-gold-400">RACK</strong> (Risk-Aware Consensual Kink). El
              consentimiento explícito, la comunicación y el bienestar de cada participante son
              innegociables.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 reveal">Qué ofrecemos</h2>
            <ul className="space-y-3 reveal">
              <li className="flex items-start gap-3">
                <span className="text-blood-500 mt-1">⛓️</span>
                <span>
                  <strong>Zonas de juego:</strong> Espacios habilitados para prácticas BDSM con
                  supervisión y mobiliario adecuado.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blood-500 mt-1">🎶</span>
                <span>
                  <strong>DJ Sets:</strong> Música electrónica y EBM para crear la atmósfera
                  perfecta.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blood-500 mt-1">🎨</span>
                <span>
                  <strong>Body painting en vivo:</strong> Artistas transformando cuerpos en obras
                  de arte erótico.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blood-500 mt-1">🪢</span>
                <span>
                  <strong>Shibari:</strong> Espacios de cuerdas para ataduras conscientes y
                  exploración sensorial.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blood-500 mt-1">💬</span>
                <span>
                  <strong>Chill zone:</strong> Un espacio para desconectar, conversar y recargar
                  energía.
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 reveal">El nombre</h2>
            <p className="reveal">
              Maškaráda (con š, del alfabeto eslovaco) evoca el misterio de las máscaras
              venecianas, el juego de identidades y la libertad que viene con el anonimato. Acá no
              importa quién sos afuera —importa lo que querés explorar adentro.
            </p>
          </div>

          <div className="mt-16 reveal">
            <h2 className="text-2xl font-semibold text-white text-center mb-8">
              Momentos maškaráda
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {momentImages.map((img) => (
                <div key={img} className="overflow-hidden rounded-xl border border-white/5">
                  <picture>
                    <source srcSet={`/images/photos/${img}.webp`} type="image/webp" />
                    <img
                      src={`/images/photos/${img}.jpg`}
                      alt="Momento maškaráda"
                      className="w-full h-full object-cover aspect-square"
                      loading="lazy"
                    />
                  </picture>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 reveal">
            <h2 className="text-2xl font-semibold text-white text-center mb-4">El equipo</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamCards.map((m) => (
                <div
                  key={m.name}
                  className="bg-white/5 rounded-xl border border-white/10 p-6 text-center backdrop-blur-sm hover:border-blood-500/50 transition-colors duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blood-700 to-purple-dark mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">{m.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{m.name}</h3>
                  <p className="text-sm text-gold-400/80 mb-3">{m.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 mb-8 reveal">
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-blood-700/20 via-purple-dark/20 to-transparent p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blood-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Te gustaría ser parte?
              </h2>
              <p className="text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
                Conseguí tus entradas para la próxima edición o escribinos por WhatsApp para
                consultas, colaboraciones y más información.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/entradas"
                  className="inline-flex items-center gap-2 bg-blood-600 hover:bg-blood-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 glow-red"
                >
                  <span>🎟️</span>
                  <span>Comprar entradas</span>
                </a>
                <a
                  href={`https://wa.me/${content.site.whatsappNumber}?text=Hola%20maškaráda%20👋`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
