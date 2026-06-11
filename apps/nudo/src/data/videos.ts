export interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
  date: string
  thumbnail?: string
}

export const videos: Video[] = [
  {
    id: 'desahogo-1',
    title: 'DESAHOGO (Video Oficial)',
    description: 'Tema completo del EP DESAHOGO — Hardcore Metal desde Capiatá.',
    youtubeId: 'dQw4w9WgXcQ',
    date: '2025-03-15',
  },
  {
    id: 'culpa-1',
    title: 'CULPA (Lyric Video)',
    description: 'Primer lanzamiento oficial. Single 2023.',
    youtubeId: 'dQw4w9WgXcQ',
    date: '2023-11-20',
  },
  {
    id: 'live-1',
    title: 'Nüdo en Vivo — Sala Aquiles',
    description: 'Grabación en vivo desde Sala Aquiles, Asunción.',
    youtubeId: 'dQw4w9WgXcQ',
    date: '2024-08-10',
  },
]
