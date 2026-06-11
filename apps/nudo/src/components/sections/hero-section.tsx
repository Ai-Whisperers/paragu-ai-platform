'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#110000] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,0,0,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-grid" />

      <div className={`relative text-center px-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[#8B0000] text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-accent)] italic">
          Desde Capiatá, Paraguay
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0] mb-4 leading-none">
          NÜDO
        </h1>
        <p className="text-[#888] text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Hardcore Metal · Fundada en 2017 · Bad Vibes Records
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#music"
            className="bg-[#8B0000] text-white px-8 py-3.5 rounded-lg font-semibold no-underline hover:bg-[#B22222] transition-all uppercase tracking-wider text-sm glow-red">
            Escuchar DESAHOGO
          </a>
          <a href="https://instagram.com/nudo_band" target="_blank" rel="noopener noreferrer"
            className="bg-transparent text-[#f0f0f0] px-8 py-3.5 rounded-lg font-semibold no-underline border border-[#3a3a3a] hover:border-[#8B0000] hover:text-[#8B0000] transition-all uppercase tracking-wider text-sm">
            Instagram
          </a>
        </div>
        <div className="flex gap-8 justify-center mt-12 text-xs text-[#555] uppercase tracking-[0.2em]">
          <span>Hardcore Metal</span>
          <span className="text-[#3a3a3a]">|</span>
          <span>Desde 2017</span>
          <span className="text-[#3a3a3a]">|</span>
          <span>Bad Vibes Records</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  )
}
