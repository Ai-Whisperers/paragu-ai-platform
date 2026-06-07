import content from '@/content/es.json'

interface FooterLink {
  label: string
  href: string
}

export default function Footer() {
  const footer = content.footer

  return (
    <footer
      className="section-padding pb-8"
      style={{ backgroundColor: 'var(--color-text)' }}
    >
      <div className="container-max">
        {/* Business name */}
        <div className="text-center mb-8">
          <p
            className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--color-crema)' }}
          >
            {footer.businessName}
          </p>
          <p
            className="font-[var(--font-body)] text-sm mt-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {footer.city}
          </p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {footer.navLinks.map((link: FooterLink) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[var(--font-body)] text-sm transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--color-crema-dark)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p
            className="font-[var(--font-body)] text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
