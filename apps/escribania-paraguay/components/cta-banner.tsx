import Link from 'next/link'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface CTABannerProps {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
}

export default function CTABanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: CTABannerProps) {
  const isExternal = buttonHref.startsWith('http')

  return (
    <section className="gradient-accent section-padding">
      <div className="container-page">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              {title}
            </h2>
            <p className="text-primary/70 text-lg mb-8">{subtitle}</p>
            {isExternal ? (
              <a
                href={buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-accent font-semibold px-8 py-3.5 rounded-lg transition-all text-base"
              >
                {buttonText}
              </a>
            ) : (
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-accent font-semibold px-8 py-3.5 rounded-lg transition-all text-base"
              >
                {buttonText}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
