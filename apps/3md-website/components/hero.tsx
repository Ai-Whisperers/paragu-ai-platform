"use client"
import { Play, ArrowDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30 z-10" />
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #FF6B35 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FF6B35 0%, transparent 50%)",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-4">Agencia Creativa</p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Transformamos ideas en{" "}
          <span className="text-secondary">experiencias visuales</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground-light mb-10 max-w-2xl mx-auto">
          Marketing digital, produccion audiovisual, fotografia y publicidad para marcas que quieren destacar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-secondary-dark hover:scale-105 transition-all shadow-lg shadow-secondary/25">
            <Play className="w-5 h-5 fill-white" /> Ver nuestro trabajo
          </Link>
          <a href="https://wa.me/595991691501" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg font-semibold text-base hover:bg-surface-light transition-all">
            Contactanos
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="w-6 h-6 text-foreground-muted" />
      </div>
    </section>
  )
}
