import { Eye, Target } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface AboutIntroProps {
  title: string
  content: string
  vision: string
  mission: string
}

export default function AboutIntro({
  title,
  content,
  vision,
  mission,
}: AboutIntroProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-muted text-lg md:text-xl leading-relaxed">
              {content}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <div className="bg-surface-alt border border-border rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <Eye size={32} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Visión
              </h3>
              <p className="text-muted text-sm leading-relaxed">{vision}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-surface-alt border border-border rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <Target size={32} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Misión
              </h3>
              <p className="text-muted text-sm leading-relaxed">{mission}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
