'use client'
import { useState } from 'react'
import { videos } from '@/data/videos'
import Link from 'next/link'

export default function VideosSection() {
  const featured = videos[0]
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section id="videos" className="py-[clamp(3rem,6vw,6rem)] px-6 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,3rem)] text-[#f0f0f0] mb-2">
          Videos
        </h2>
        <p className="text-[#888] text-sm mb-10 font-[family-name:var(--font-accent)] italic">
          Videoclips, lyric videos y presentaciones en vivo
        </p>

        {/* Featured video */}
        <div className="mb-12">
          <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden border border-[#2a2a2a] group cursor-pointer"
            onClick={() => setShowVideo(!showVideo)}>
            {showVideo ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <div className="w-20 h-20 rounded-full bg-[#8B0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#f0f0f0] mt-4">{featured.title}</h3>
          <p className="text-sm text-[#888] mt-1">{featured.description}</p>
        </div>

        {/* Video grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {videos.slice(1).map(video => (
            <a key={video.id} href={`/videos#${video.id}`}
              className="group bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#8B0000]/50 transition-all no-underline">
              <div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-[#8B0000]/80 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-[#f0f0f0] group-hover:text-[#8B0000] transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-[#666] mt-1">{video.date}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link href="/videos"
            className="inline-block bg-transparent text-[#f0f0f0] px-8 py-3 rounded-lg border border-[#3a3a3a] hover:border-[#8B0000] hover:text-[#8B0000] transition-all uppercase tracking-wider text-sm no-underline">
            Ver todos los videos →
          </Link>
        </div>
      </div>
    </section>
  )
}
