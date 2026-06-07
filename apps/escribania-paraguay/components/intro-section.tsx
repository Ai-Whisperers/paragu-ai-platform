import ScrollReveal from '@/components/animations/scroll-reveal'

interface IntroSectionProps {
  text: string
}

export default function IntroSection({ text }: IntroSectionProps) {
  return (
    <section className="bg-surface section-padding-sm">
      <div className="container-page">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <p className="text-foreground text-lg md:text-xl leading-relaxed text-center">
              {text}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
