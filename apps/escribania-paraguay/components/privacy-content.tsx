import ScrollReveal from '@/components/animations/scroll-reveal'

interface Section {
  title: string
  text: string
}

interface PrivacyContentProps {
  sections: Section[]
}

export default function PrivacyContent({ sections }: PrivacyContentProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted leading-relaxed">{section.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
