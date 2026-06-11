'use client'
import { socials } from '@/data/socials'
import Link from 'next/link'

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.26 1.699-4.771 4.92-4.919 1.265-.058 1.644-.07 4.85-.07zm0 2.163c-3.259 0-3.639.012-4.907.072-2.17.087-3.374 1.128-3.458 3.458-.06 1.269-.072 1.649-.072 4.908 0 3.258.012 3.639.072 4.907.084 2.33 1.287 3.371 3.458 3.458 1.268.06 1.648.072 4.907.072 3.259 0 3.639-.012 4.908-.072 2.17-.087 3.374-1.128 3.458-3.458.06-1.268.072-1.649.072-4.907 0-3.259-.012-3.639-.072-4.908-.084-2.33-1.287-3.371-3.458-3.458-1.268-.06-1.649-.072-4.908-.072zm0 3.639c2.993 0 5.418 2.425 5.418 5.418s-2.425 5.418-5.418 5.418-5.418-2.425-5.418-5.418 2.425-5.418 5.418-5.418zm0 8.937a3.519 3.519 0 100-7.038 3.519 3.519 0 000 7.038zm6.847-9.497a1.304 1.304 0 100-2.608 1.304 1.304 0 000 2.608z"/>
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  spotify: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  apple: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  ),
}

const WA_NUMBER = '595991000000'

export default function ContactSection() {
  return (
    <section id="contact" className="py-[clamp(3rem,6vw,6rem)] px-6 bg-[#111]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Follow */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] text-[#f0f0f0] mb-2">
              FOLLOW
            </h2>
            <p className="text-[#888] text-sm mb-6 font-[family-name:var(--font-accent)] italic">
              Seguí a Nüdo en todas las redes
            </p>
            <div className="space-y-3">
              {socials.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 no-underline group hover:border-[#8B0000]/50 transition-all">
                  <div className="text-[#8B0000] group-hover:text-[#B22222] transition-colors">
                    {socialIcons[social.icon] || null}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#f0f0f0] text-sm font-semibold">{social.name}</p>
                    <p className="text-xs text-[#888]">{social.handle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" className="group-hover:stroke-[#f0f0f0] transition-colors">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] text-[#f0f0f0] mb-2">
              GET IN TOUCH
            </h2>
            <p className="text-[#888] text-sm mb-6 font-[family-name:var(--font-accent)] italic">
              Booking, shows, lo que sea
            </p>
            <div className="space-y-3">
              <a href={`https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=Hola%20N%C3%BCdo!%20Queremos%20contactarlos%20para%20un%20show.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 no-underline group hover:border-[#25D366]/50 transition-all">
                <div className="text-[#25D366]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#f0f0f0] text-sm font-semibold">WhatsApp</p>
                  <p className="text-xs text-[#888]">Message me directly</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" className="group-hover:stroke-[#f0f0f0] transition-colors">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>

              <a href="mailto:nudobandpy@gmail.com"
                className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 no-underline group hover:border-[#8B0000]/50 transition-all">
                <div className="text-[#8B0000]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#f0f0f0] text-sm font-semibold">Email</p>
                  <p className="text-xs text-[#888]">nudobandpy@gmail.com</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" className="group-hover:stroke-[#f0f0f0] transition-colors">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
