import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Container } from '@/components/ui/container'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

export interface CTABannerSectionProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonHref?: string
}

export function CTABannerSection({
  title,
  subtitle,
  buttonText,
  buttonHref = '#contacto',
}: CTABannerSectionProps) {
  return (
    <section
      className="font-heading relative overflow-hidden py-16 bg-deep"
    >
      {/* Decorative pattern (solid low-opacity wash — no gradients) */}
      <div
        className="font-heading absolute inset-0 opacity-[0.05]"
        style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
      />

      <Container className="font-heading relative z-10 text-center">
        <AnimateOnScroll>
          <Heading level={2}
            className="font-heading mb-4 text-xl sm:text-3xl font-bold text-[var(--secondary-foreground)] sm:text-4xl"
           
          >
            {title}
          </Heading>
          {subtitle && (
            <p className="font-heading mx-auto mb-8 max-w-xl text-lg text-[var(--secondary-foreground)] opacity-80">{subtitle}</p>
          )}
          <Button
            variant="primary"
            size="lg"
            href={buttonHref}
          >
            {buttonText}
          </Button>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}
