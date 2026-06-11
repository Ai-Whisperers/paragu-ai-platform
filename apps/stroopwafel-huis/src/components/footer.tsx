import Link from 'next/link'

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-background border-t-2 border-primary/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧇</span>
              <span className="font-serif font-bold text-xl text-primary">Stroopwafel Huis</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La primera cafetería holandesa del Paraguay. Stroopwafels frescos & specialty coffee, hechos con amor.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Menú', href: '/menu' },
                { label: 'Historia', href: '/historia' },
                { label: 'Ubicación', href: '/ubicacion' },
                { label: 'Catering', href: '/catering' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Privacidad', href: '/privacidad' },
                { label: 'Términos', href: '/terminos' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">Seguinos</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://instagram.com/stroopwafelhuis" target="_blank" rel="noopener" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="https://facebook.com/stroopwafelhuis" target="_blank" rel="noopener" className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                <FacebookIcon size={20} />
              </a>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📍 Villa Morra, Asunción</p>
              <p>📞 +595 XXX XXX XXX</p>
              <p>✉️ hola@stroopwafelhuis.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2026 Stroopwafel Huis · Asunción, Paraguay · Hecho con amor holandés 🇳🇱</p>
        </div>
      </div>
    </footer>
  )
}
