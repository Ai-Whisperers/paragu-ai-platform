interface ServiceDetailHeroProps {
  headline: string
  subheadline: string
}

export default function ServiceDetailHero({
  headline,
  subheadline,
}: ServiceDetailHeroProps) {
  return (
    <section className="bg-[var(--color-primary)] text-white">
      <div className="container-page">
        <div className="py-24 md:py-32 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            {subheadline}
          </p>
        </div>
      </div>
    </section>
  )
}
