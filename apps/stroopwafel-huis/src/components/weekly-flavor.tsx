import { ArrowRight, Sparkles } from 'lucide-react'

interface WeeklyFlavorProps {
  title: string
  subtitle: string
  name: string
  description: string
  price: string
  cta: string
  phone: string
  message: string
}

export function WeeklyFlavor({ title, subtitle, name, description, price, cta, phone, message }: WeeklyFlavorProps) {
  const waUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message + ' - Quiero el ' + name)}`

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles size={16} />
          {subtitle}
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          {title}
        </h2>
        
        <div className="mt-8 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-8 md:p-12 border border-border">
          <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">🍊🧇</span>
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
            {name}
          </h3>
          <p className="text-muted-foreground mb-2">{description}</p>
          <p className="text-2xl font-bold text-foreground mb-6">{price}</p>
          
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary/25"
          >
            {cta} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
