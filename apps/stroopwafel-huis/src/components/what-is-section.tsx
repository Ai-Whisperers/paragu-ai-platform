import Link from 'next/link'
import { Info } from 'lucide-react'

interface WhatIsProps {
  title: string
  body: string
  tip: string
  cta: string
}

export function WhatIsSection({ title, body, tip, cta }: WhatIsProps) {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>
        
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">🧇</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>← Capa crujiente</p>
                    <p className="text-primary font-bold">♥ Relleno de caramelo</p>
                    <p>→ Capa crujiente</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-foreground/90 leading-relaxed mb-6">
                {body}
              </p>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
                <Info size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  {tip}
                </p>
              </div>
              <div className="mt-6">
                <Link href="/menu" className="text-primary font-medium hover:underline">
                  {cta} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
