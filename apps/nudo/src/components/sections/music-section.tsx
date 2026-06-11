'use client'
import { useState } from 'react'
import { streamingLinks } from '@/data/socials'

export default function MusicSection() {
  return (
    <section id="music" className="py-[clamp(3rem,6vw,6rem)] px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,3rem)] text-[#f0f0f0] mb-2">
          Music
        </h2>
        <p className="text-[#888] text-sm mb-10 font-[family-name:var(--font-accent)] italic">
          DESAHOGO EP (2025) — Hardcore Metal desde Capiatá
        </p>

        {/* Spotify Embed */}
        <div className="mb-12">
          <iframe
            style={{ borderRadius: '12px', width: '100%', height: '352px' }}
            src="https://open.spotify.com/embed/artist/2N3Z6SOIw7MOSxtRyzgJLv?utm_source=generator"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Discography */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 flex gap-5 hover:border-[#8B0000]/50 transition-all">
            <img src="https://i.scdn.co/image/ab67616d00001e029eb75be054c928ad5c3576e3" alt="DESAHOGO EP"
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">DESAHOGO (EP)</h3>
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Bad Vibes Records · 2025</p>
              <div className="text-xs text-[#666] space-y-0.5 mb-2">
                <div>JUICIO</div>
                <div>ESPEJO</div>
                <div>CULPA</div>
                <div>APOCALIPSIS</div>
              </div>
              <a href="https://open.spotify.com/album/6X6mvKVxK5uLqPe9yPaB3r" target="_blank" rel="noopener noreferrer"
                className="text-[#8B0000] text-xs font-semibold no-underline hover:underline">
                Escuchar en Spotify →
              </a>
            </div>
          </div>
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 flex gap-5 hover:border-[#8B0000]/50 transition-all">
            <img src="https://i.scdn.co/image/ab67616d00001e02bcb531a6e29d197d153d3e4d" alt="CULPA Single"
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">CULPA (Single)</h3>
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Independiente · 2023</p>
              <p className="text-xs text-[#666] mb-2">El primer lanzamiento oficial de Nüdo.</p>
              <a href="https://open.spotify.com/album/1Prl93tdri8HYGguyvsXSP" target="_blank" rel="noopener noreferrer"
                className="text-[#8B0000] text-xs font-semibold no-underline hover:underline">
                Escuchar en Spotify →
              </a>
            </div>
          </div>
        </div>

        {/* Streaming Links */}
        <h3 className="text-sm uppercase tracking-[0.2em] text-[#666] mb-4">Disponible en todas las plataformas</h3>
        <div className="flex flex-wrap gap-3">
          {streamingLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
              className="bg-[#111] border border-[#2a2a2a] text-[#f0f0f0] px-5 py-3 rounded-lg text-sm no-underline hover:border-[#8B0000] hover:bg-[#1a1a1a] transition-all">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
