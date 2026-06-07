interface HeroLayoutProps {
  title: string
  subtitle?: string
  description?: string
  image: string
  cta?: {
    label: string
    href: string
    secondary?: { label: string; href: string }
  }
  badge?: string
}

export default function HeroLayout({ title, subtitle, description, image, cta, badge }: HeroLayoutProps) {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        {badge && <span className="hero-badge animate-fade-in">{badge}</span>}
        <h1 className="hero-title animate-hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle animate-fade-in stagger-2">{subtitle}</p>}
        {description && <p className="hero-description animate-fade-in stagger-3">{description}</p>}
        {cta && (
          <div className="hero-cta animate-fade-in stagger-4">
            <a href={cta.href} className="btn btn-primary btn-lg">{cta.label}</a>
            {cta.secondary && (
              <a href={cta.secondary.href} className="btn btn-secondary btn-lg">{cta.secondary.label}</a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
