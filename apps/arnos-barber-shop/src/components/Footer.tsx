type FooterContent = {
  site: { name: string; phone: string; whatsapp: string; address: string; hours: string; city: string }
  navigation: { items: { label: string; href: string }[]; ctaHref: string; businessName: string }
  footer: { text: string; copyright: string; disclaimer: string }
}

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span className="brand-text">
              <strong>{content.site.name}</strong>
              <small>{content.footer.text}</small>
            </span>
          </a>
          <p className="footer-meta">{content.site.city}, Paraguay · Barbería local</p>
        </div>
        <div>
          <h3>Explorar</h3>
          <ul>
            {content.navigation.items.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contacto</h3>
          <p><a href={`tel:${content.site.phone.replace(/\s+/g, "")}`}>{content.site.phone}</a></p>
          <p>{content.site.address}</p>
          <p>{content.site.hours}</p>
          <a className="footer-wa" href={content.navigation.ctaHref} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>{content.footer.copyright}</p>
        <p className="footer-disclaimer">{content.footer.disclaimer}</p>
        <p className="footer-tech">Diseño y tecnología por ParaguAI · Ai-Whisperers</p>
      </div>
    </footer>
  )
}
