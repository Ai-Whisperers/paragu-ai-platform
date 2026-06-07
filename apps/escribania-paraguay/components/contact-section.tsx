import { MessageCircle } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface ContactSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
}

export default function ContactSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: ContactSectionProps) {
  return (
    <section className="bg-primary section-padding">
      <div className="container-page">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-white/60 text-lg mb-10">{subtitle}</p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)]/90 text-white font-accent font-semibold px-8 py-4 rounded-lg transition-all text-base shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={22} />
              {ctaText}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
