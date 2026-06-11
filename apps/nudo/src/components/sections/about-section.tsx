'use client'

export default function AboutSection() {
  return (
    <section id="about" className="py-[clamp(3rem,6vw,6rem)] px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,3rem)] text-[#f0f0f0] mb-2">
          About Nüdo
        </h2>
        <p className="text-[#888] text-sm mb-10 font-[family-name:var(--font-accent)] italic">
          Hardcore Metal desde Capiatá, Paraguay
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#ccc] leading-relaxed mb-6">
              Nüdo nace en Capiatá, Paraguay, en 2017 de la mano del guitarrista Edilson Gauto.
              Lo que empezó como un proyecto de amigos apasionados por el metal extremo pronto se consolidó
              como una banda con identidad propia: un sonido que fusiona la agresividad del hardcore con la
              técnica del metalcore, pasando por influencias del nu metal.
            </p>
            <p className="text-[#ccc] leading-relaxed mb-6">
              Integrada por <strong>Mauricio Arce</strong> (voz), <strong>Manuel Díaz</strong> (guitarra),
              <strong>Edilson Gauto</strong> (guitarra líder), <strong>Fidel Dávalos</strong> (bajo) y
              <strong>Víctor Maldonado</strong> (batería), Nüdo ha compartido escenario con bandas de la
              escena local en espacios como Tunakó Pool Party, Absoluto Rock Bar, Black Mango y el BREAKDOWN FEST.
            </p>
            <p className="text-[#ccc] leading-relaxed">
              En enero de 2025 lanzaron su primer EP, <strong>&ldquo;DESAHOGO&rdquo;</strong>, bajo el sello
              Bad Vibes Records. Grabado en The Beach Homestudio. Con influencias que van desde Pantera y
              Slipknot hasta bandas del metalcore contemporáneo, Nüdo representa la nueva sangre del metal paraguayo:
              crudo, directo y sin concesiones.
            </p>
          </div>

          {/* Team */}
          <div className="space-y-3">
            {[
              { name: 'Mauricio Arce', role: 'Voz', initial: 'M' },
              { name: 'Manuel Díaz', role: 'Guitarra', initial: 'M' },
              { name: 'Edilson Gauto', role: 'Guitarra Líder', initial: 'E' },
              { name: 'Fidel Dávalos', role: 'Bajo', initial: 'F' },
              { name: 'Víctor Maldonado', role: 'Batería', initial: 'V' },
            ].map(m => (
              <div key={m.name} className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-4 hover:border-[#8B0000]/50 transition-all">
                <div className="w-10 h-10 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-sm font-bold text-[#8B0000] flex-shrink-0">
                  {m.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm">{m.name}</p>
                  <p className="text-xs text-[#888]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
