'use client'
import { useState } from 'react'
import type { Video } from '@/data/videos'

export default function VideoPageClient({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-[clamp(3rem,6vw,6rem)] px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4rem)] text-[#f0f0f0] mb-2">
          Videos
        </h1>
        <p className="text-[#888] mb-12 font-[family-name:var(--font-accent)] italic">
          Todos los videos de Nüdo
        </p>

        {playing && (
          <div className="mb-12">
            <div className="aspect-video bg-[#111] rounded-xl overflow-hidden border border-[#2a2a2a]">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <div key={video.id}
              className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#8B0000]/50 transition-all group cursor-pointer"
              onClick={() => setPlaying(video.youtubeId)}>
              <div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#8B0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#f0f0f0] group-hover:text-[#8B0000] transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-[#888] mt-1">{video.description}</p>
                <p className="text-xs text-[#555] mt-2">{video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
