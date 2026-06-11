import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
}

export function HeroSection({ headline, subheadline, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="text-7xl block mb-4">🧇</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary/25"
          >
            {ctaPrimary}
          </Link>
          <Link
            href="/ubicacion"
            className="border-2 border-foreground/40 text-foreground px-8 py-3 rounded-full font-medium hover:border-primary hover:text-primary transition-all duration-200"
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
