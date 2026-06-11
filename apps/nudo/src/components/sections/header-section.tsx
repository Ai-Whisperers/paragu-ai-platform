'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Music', href: '#music' },
  { label: 'Live', href: '#events' },
  { label: 'Merch', href: '#merch' },
  { label: 'Lyrics', href: '#lyrics' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#contact' },
]

export default function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur border-b border-[#2a2a2a]' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-xl tracking-widest text-[#f0f0f0] no-underline hover:text-[#8B0000] transition-colors">
          NÜDO
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-[#f0f0f0] no-underline transition-colors">
              {link.label}
            </Link>
          ))}
          <a href="https://open.spotify.com/artist/2N3Z6SOIw7MOSxtRyzgJLv" target="_blank" rel="noopener noreferrer"
            className="bg-[#8B0000] text-white text-xs px-5 py-2.5 rounded-full font-semibold no-underline hover:bg-[#B22222] transition-colors uppercase tracking-wider">
            Spotify
          </a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#f0f0f0] p-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-[#2a2a2a] px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block text-[#ccc] no-underline uppercase text-xs tracking-[0.2em] hover:text-white">
              {link.label}
            </Link>
          ))}
          <a href="https://open.spotify.com/artist/2N3Z6SOIw7MOSxtRyzgJLv" target="_blank" rel="noopener noreferrer"
            className="block text-center bg-[#8B0000] text-white px-4 py-2.5 rounded-full font-semibold no-underline text-sm mt-4">
            Escuchar en Spotify
          </a>
        </div>
      )}
    </header>
  )
}
