import { Heart, Users, Calendar, Mic2 } from "lucide-react";
import MainLayout from "../../components/MainLayout";

const milestones = [
  { year: "Origen", title: "Camilo Acosta crea El Gato Siamés", description: "El nombre nace de un juego de palabras: la raza felina y la idea de hermanos siameses, una dualidad que también aparece en su logo." },
  { year: "Escena", title: "Identidad oscura y seca", description: "Su presencia escénica es deliberadamente seria: ropa negra, falda, cadenas y una expresión neutra: lo que él define como la falta de acting." },
  { year: "2023", title: "Absoluto Rock", description: "ABC Color registra su llegada al stand up en Absoluto Rock, con humor negro, crítica social y gags dirigidos al público metalero." },
  { year: "2025", title: "Expresso / La Nación", description: "La Nación lo perfila como una figura visible del stand up emergente en Paraguay y profundiza en su alter ego, autogestión y proceso creativo." },
  { year: "2026", title: "Esposadas en Sala Tempo", description: "En Radio Up explicó su show en Posadas: one-liners, doble sentido, humor negro y chistes cortos con remate inmediato." },
];

const stylePillars = [
  { name: "Humor negro", description: "No busca el golpe fácil: trabaja temas oscuros con remate, ritmo y control de la dosis según el público.", quote: "Mi único filtro es el humor." },
  { name: "One-liners", description: "Prefiere chistes cortos y directos antes que relatos largos: setup rápido, remate inmediato.", quote: "En mi caso, son chistes cortos." },
  { name: "Doble sentido", description: "Usa juegos de palabras como motor creativo; incluso el show Esposadas juega con Posadas y estar esposado.", quote: "Me gustan los juegos de palabras." },
  { name: "Inexpresividad", description: "La seriedad del personaje funciona como contraste: monólogos oscuros dichos casi sin actuación exagerada.", quote: "Siempre serio." },
];

const mediaQuotes = [
  { quote: "Una de las figuras más visibles del emergente movimiento del stand up en Paraguay.", source: "La Nación / Expresso", date: "2025" },
  { quote: "Mi acting es la falta de acting.", source: "La Nación / Expresso", date: "2025" },
  { quote: "Camilo Acosta llega a Posadas para presentar su show de stand-up Esposadas, una propuesta cargada de humor negro y chistes en formato one-liner.", source: "Radio Up 95.5", date: "2026" },
  { quote: "El Gato Siamés propone su acostumbrado estilo que incluye componentes de humor negro y crítica social.", source: "ABC Color", date: "2023" },
];

const stats = [
  { label: "Nombre real", value: "Camilo Acosta", icon: Calendar },
  { label: "Arte", value: "Stand up", icon: Mic2 },
  { label: "Red principal", value: "Instagram", icon: Users },
];

export default function BioPage() {
  return (
    <MainLayout>
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
                <Mic2 className="w-4 h-4" style={{ color: "#E63946" }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#E63946" }}>Camilo Acosta · Stand up Paraguay</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display mb-6">
                EL GATO <span style={{ color: "#E63946" }}>SIAMÉS</span>
              </h1>
              <p className="text-xl text-white/60 mb-4">
                El Gato Siamés es el alter ego escénico de Camilo Acosta: comediante paraguayo de stand up, reconocido por su humor negro, su delivery serio y sus chistes cortos.
              </p>
              <p className="text-lg text-white/40 mb-6">
                Su propuesta mezcla experiencias personales, doble sentido, crítica social y una estética oscura que lo diferencia dentro del circuito local.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <stat.icon className="w-5 h-5 mb-2" style={{ color: "#E63946" }} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="aspect-[3/4] w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/images/gato/hero-camilo-acosta.webp" alt="Camilo Acosta — El Gato Siamés" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Perfil <span style={{ color: "#E63946" }}>verificado</span></h2>
            <p className="text-white/60">Perfil basado en fuentes públicas y material visual real del archivo de El Gato Siamés.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-px" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className={`relative flex items-start gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="flex-1">{i % 2 === 0 ? <div className="sm:pr-12"><div className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-xs font-medium mb-2" style={{ color: "#E63946" }}>{m.year}</div><h3 className="text-xl font-bold text-white mb-2">{m.title}</h3><p className="text-white/60">{m.description}</p></div> : null}</div>
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-1" style={{ backgroundColor: "#E63946" }}><div className="w-2 h-2 bg-white rounded-full" /></div>
                  <div className="flex-1 sm:pl-12">{i % 2 !== 0 ? <div><div className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-xs font-medium mb-2" style={{ color: "#E63946" }}>{m.year}</div><h3 className="text-xl font-bold text-white mb-2">{m.title}</h3><p className="text-white/60">{m.description}</p></div> : null}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Código de <span style={{ color: "#E63946" }}>comedia</span></h2>
            <p className="text-white/60">Los rasgos que definen el personaje y el show.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stylePillars.map((item) => (
              <div key={item.name} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/30 transition-all">
                <div className="text-4xl mb-4">🖤</div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/60 mb-4">{item.description}</p>
                <blockquote className="border-l-2 pl-4 mb-4" style={{ borderColor: "#E63946" }}>
                  <p className="font-medium italic" style={{ color: "#E63946" }}>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lo que dicen los <span style={{ color: "#E63946" }}>medios</span></h2>
          </div>
          <div className="space-y-6">
            {mediaQuotes.map((item) => (
              <div key={item.quote} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <blockquote className="mb-4"><p className="text-lg text-white/80 italic">&ldquo;{item.quote}&rdquo;</p></blockquote>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <span className="font-medium text-white/60">{item.source}</span><span>—</span><span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div className="order-2 sm:order-1">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                <img src="/images/gato/bio-clean.webp" alt="Camilo Acosta — foto de archivo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 sm:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-4">
                <Heart className="w-4 h-4" style={{ color: "#E63946" }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#E63946" }}>Proceso creativo</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">La incomodidad como material</h2>
              <p className="text-white/60 mb-4">Camilo no escribe desde un molde familiar de comedia blanca. Su terreno es más raro: silencios, tensión, doble sentido, observación y frases que parecen serias hasta que el remate cambia todo.</p>
              <p className="text-white/60 mb-4">Adapta la dosis según la sala. En públicos que saben a qué van, se permite ir más oscuro; en espacios mixtos, regula el filo para que el humor siga siendo el centro.</p>
              <p className="text-white/60">Esa combinación —oscuridad, seriedad y precisión— es la marca real de El Gato Siamés.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
