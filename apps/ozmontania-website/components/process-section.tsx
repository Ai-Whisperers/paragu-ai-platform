import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'
import Reveal from '@/components/reveal'

const content = es as unknown as SiteContent

const steps = [
  {
    step: '01',
    title: 'Briefing',
    description: 'Conozco tu espacio, tu marca y tu visión. Definimos el concepto, presupuesto y cronograma.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Boceto',
    description: 'Diseño la propuesta visual con referencias, bocetos digitales y paleta de colores para tu aprobación.',
    icon: '✏️',
  },
  {
    step: '03',
    title: 'Producción',
    description: 'Ejecuto el mural o ilustración con materiales profesionales, documentando todo el proceso.',
    icon: '🎨',
  },
  {
    step: '04',
    title: 'Entrega',
    description: 'Finalizamos con fotos profesionales, video time-lapse y material para redes si lo deseás.',
    icon: '📸',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-zinc-800/30">
      <div className="container-art">
        <Reveal>
          <div className="text-center mb-10 sm:mb-16 px-4 sm:px-0">
            <h2 className="section-title mb-4">¿Cómo trabajo?</h2>
            <p className="section-subtitle mx-auto text-sm sm:text-base">
              De la idea al muro — mi proceso creativo paso a paso
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <Reveal key={step.step} variant="up" delay={i * 120}>
              <div className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-amber-500/20 to-transparent" />
                )}
                <div className="glass-panel p-5 sm:p-6 text-center hover:border-amber-500/20 transition-colors duration-500 h-full">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{step.icon}</div>
                  <span className="text-[10px] sm:text-xs font-mono text-amber-500 mb-1 block">{step.step}</span>
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-100 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
