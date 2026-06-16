import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifiesto — Club maškaráda",
  description:
    "El manifiesto de maškaráda: lo que creemos, cómo nos vinculamos, qué defendemos. Cultura del consentimiento, exploración consciente, cuidado mutuo. Asunción, Paraguay.",
};

const principles = [
  {
    icon: "🤝",
    title: "Consentimiento antes que todo",
    body: "El consentimiento es el piso, no el techo. No es solo decir que sí: es poder decir que no, en cualquier momento, sin justificación, sin culpa. Es revisar, ajustar, parar. Es volver a empezar. La cultura del consentimiento (SSC — Safe, Sane, Consensual / RACK — Risk-Aware Consensual Kink) no es un protocolo: es la forma en que nos vinculamos.",
  },
  {
    icon: "🎭",
    title: "La máscara como permiso",
    body: "La máscara protege y libera. Protege del ojo público — del trabajo, de la familia, del barrio. Libera versiones menos exhibidas del self: las que el día a día no tiene espacio para. Cuando te la ponés, no estás dejando de ser vos. Estás dándole espacio a una parte de vos que el resto del mundo no siempre recibe bien.",
  },
  {
    icon: "🌑",
    title: "Lo oscuro necesita cuidado",
    body: "El kink y el BDSM tocan intensidades que la cultura mainstream patologiza o romantiza. Las dos cosas fallan. Lo que hacemos es real, requiere preparación, requiere vocabulario, requiere saber parar. El aftercare no es un agregado: es parte del juego. Si después de una noche no sabés cómo está la otra persona, algo hiciste mal.",
  },
  {
    icon: "🚪",
    title: "La puerta queda abierta",
    body: "Cualquiera puede entrar, nadie tiene que quedarse. Si venís por primera vez, lo más amable es empezar por un encuentro (munch, café) sin play, público, vanilla. Si ya tenés experiencia, sabés dónde encontrar el calendario. Si no querés venir más, está bien. Si querés proponer algo, hablamos.",
  },
  {
    icon: "🛡️",
    title: "Cero tolerancia con lo que rompe el acuerdo",
    body: "Acoso, presión, manipulación, consumo problemático, cruzadas de límites, no-respuesta a un stop. Esto no tiene grises. Cualquiera de estas cosas te deja afuera. Si pasa, hablamos: el staff escucha, acompaña, y si corresponde, actúa. No esperamos a que la persona afectada haga todo el trabajo de denunciar.",
  },
  {
    icon: "🌱",
    title: "Aprendemos en comunidad",
    body: "No somos expertos: somos personas que aprendemos juntas. Las guías en /aprender, los munches, los talleres, el foro — todo es parte de un mismo proyecto: que cada persona tenga mejores herramientas para lo que quiera hacer. La mejor versión de esta comunidad es la que se enseña a sí misma.",
  },
];

const nonNegotiables = [
  "Sin play con personas que no puedan dar consentimiento claro (sustancias, sueño, presión).",
  "Sin tomar fotos de otras personas sin su permiso explícito, en cualquier momento.",
  "Sin compartir nombres, caras, ni detalles de personas que conociste acá.",
  "Sin juzgar a nadie por lo que hace o deja de hacer, adentro o afuera del espacio.",
  "Sin cruzar un stop. Un stop es un stop. No se discute, no se negocia, no se reconsidera después.",
];

export default function Manifiesto() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🪶</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Manifiesto
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Lo que creemos, cómo nos vinculamos, qué defendemos. Si esto te resuena, este es tu espacio. Si no, está bien — hay otros.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Nuestros principios</h2>
          <div className="space-y-6">
            {principles.map((p) => (
              <article
                key={p.title}
                className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{p.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Lo no negociable</h2>
          <ul className="space-y-3 border-l-2 border-blood-500 pl-6">
            {nonNegotiables.map((line) => (
              <li key={line} className="text-gray-300 leading-relaxed text-sm">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Lo que no somos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <p className="text-gray-300">
                No somos una fiesta para &ldquo;probar algo&rdquo;. Si venís a mirar desde afuera, hay otros espacios — esta no es.
              </p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <p className="text-gray-300">
                No somos terapia, ni sustituto de terapia. La exploración consciente puede ser parte de un proceso, pero no es el proceso mismo.
              </p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <p className="text-gray-300">
                No somos una marca de lifestyle, ni un producto para vender. Somos una comunidad que se sostiene con trabajo voluntario.
              </p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <p className="text-gray-300">
                No somos una fantasía masculina heterosexual. La cultura kink que cultivamos es queer, trans-inclusive, y abierta a todas las configuraciones.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Si esto es para vos</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Leé las <Link href="/reglas" className="text-gold-400 hover:text-gold-300">reglas</Link> y la página de <Link href="/consentimiento" className="text-gold-400 hover:text-gold-300">consentimiento</Link> antes de venir a un evento. Si tenés dudas, escribinos por <Link href="/contacto" className="text-gold-400 hover:text-gold-300">contacto</Link> o anotate a un <Link href="/eventos" className="text-gold-400 hover:text-gold-300">encuentro</Link> para empezar más tranquilo.
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Club maškaráda · Asunción, Paraguay · 2026
          </p>
        </section>
      </div>
    </div>
  );
}
