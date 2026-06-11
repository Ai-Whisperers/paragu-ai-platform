'use client'
import { useState } from 'react'
import { PageLayout } from '@/components/page-layout'
import raw from '@/content/es.json'
import type { Content } from '@/types/content'

const c = raw as unknown as Content
const content = c
const phone = c.whatsapp.phone

const achievementBadges = [
  { id: '015cb595', file: '015cb595-f029-4097-8ee9-857d55cd6c5d.jpg', label: 'Amazon Ranking' },
  { id: '03f02d6d', file: '03f02d6d-63e9-4062-8a79-54a5e0006252.jpg', label: 'Reader Stats' },
  { id: '08f90c00', file: '08f90c00-a79a-4857-91fe-614484b1b704.jpg', label: 'Amazon Badge' },
  { id: '102ba13b', file: '102ba13b-6612-49f5-822c-c55b000d2eb2.jpg', label: 'Achievement Card' },
  { id: '125314e7', file: '125314e7-5e60-40b6-b0a2-d5655ee42fa9.jpg', label: 'Performance' },
  { id: '162121fb', file: '162121fb-0459-4880-978c-5d439d576f7f.jpg', label: 'Reader Milestone' },
  { id: '248b3ba0', file: '248b3ba0-9e32-443d-9d6f-4f905431d170.jpg', label: 'Amazon Badge' },
  { id: '2f5e0217', file: '2f5e0217-6484-43cf-99ad-22ca470ad734.jpg', label: 'KDP Ranking' },
  { id: '376d297e', file: '376d297e-0154-49b7-b457-ff00397cf097.jpg', label: 'Achievement Row' },
  { id: '479e7ff9', file: '479e7ff9-b896-40aa-b930-55840149c695.jpg', label: 'Prime Badge' },
  { id: '5b4a67ce', file: '5b4a67ce-63b4-4aea-ba69-6a06913c4ae4.jpg', label: 'Reader Count' },
  { id: '754010ef', file: '754010ef-6a5f-485a-86a1-b18943bac7d2.jpg', label: 'Award Badge' },
  { id: '791a98fc', file: '791a98fc-50a4-41c5-8b81-63166641a5c8.jpg', label: 'KDP Stats' },
  { id: '85802e39', file: '85802e39-0ff1-4f09-acb9-17f4a34b3ef2.jpg', label: 'Ranking' },
  { id: '85b4ee79', file: '85b4ee79-62e4-4a10-84d7-188c67789e6b.jpg', label: 'Badge' },
  { id: '8b9000d6', file: '8b9000d6-a9ef-4f69-8998-186368ede80f.jpg', label: 'Achievement Card' },
  { id: 'a3a82967', file: 'a3a82967-8296-4506-a091-50a091ecf0b0.jpg', label: 'Amazon Ranking' },
  { id: 'b1582b80', file: 'b1582b80-3864-42c0-9b17-c067c5376471.jpg', label: 'Milestone' },
  { id: 'b9c5536e', file: 'b9c5536e-515c-4c91-9c85-b53d38a5fcd9.jpg', label: 'Achievement Card' },
  { id: 'bd6f22d8', file: 'bd6f22d8-c0a8-400d-aa51-4e5174059722.jpg', label: 'Performance' },
  { id: 'c62ac0b6', file: 'c62ac0b6-6a49-4a7b-93c9-41156b31ccae.jpg', label: 'Reader Milestone' },
  { id: 'cf082ce9', file: 'cf082ce9-7115-4136-a8c4-bafc771fff13.jpg', label: 'Prime Selection' },
  { id: 'f5eca7c2', file: 'f5eca7c2-6c22-43fa-bf9d-42c81a8b00ab.jpg', label: 'KDP Badge' },
  { id: 'f97f86f9', file: 'f97f86f9-ef38-4172-af58-eaefd91bb9c2.jpg', label: 'Ranking Card' },
]

const screenshots = [
  { file: 'Screenshot_20260503-222652.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-222703.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-222706.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-222723.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-222727.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-223119.png', label: 'Book Rankings' },
  { file: 'Screenshot_20260503-223258.png', label: 'Amazon KDP Dashboard' },
  { file: 'Screenshot_20260503-223306.png', label: 'Amazon KDP Dashboard' },
]

const instaPosts = [
  { file: '470796663_1132686094889933_8828749378078306471_n.jpg', label: 'Banner Promocional' },
  { file: '480223592_1184467823045093_5905793266537609347_n.jpg', label: 'Post de Portada' },
  { file: '480293908_1184467789711763_71164501875288169_n.jpg', label: 'Miniatura' },
  { file: '496887252_18077666440791978_3849376747660141644_n.jpg', label: 'Portada Promo' },
  { file: '496946328_18077666455791978_8322586373109501935_n.jpg', label: 'Portada Promo' },
  { file: '504435439_18080309425791978_4342579863971155988_n.jpg', label: 'Portada Promo' },
  { file: '622301487_18103501078791978_6470847817026684593_n.jpg', label: 'Portada Promo' },
  { file: '683883198_18112505434791978_1545045044397013279_n.jpg', label: 'Portada Promo' },
]

export default function LogrosPage() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <PageLayout phone={phone}>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="mb-2 text-center text-4xl font-bold text-foreground">Logros</h1>
          <p className="mb-12 text-center text-muted-foreground">
            Resultados comprobables de mi trabajo como diseñadora y autora
          </p>

          {/* Stats summary */}
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '400+', label: 'Portadas diseñadas' },
              { value: '3', label: 'Libros publicados' },
              { value: 'Amazon Prime', label: 'Selección invitation-only' },
              { value: '#1', label: 'Bestsellers Dark Romance' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-6 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges grid */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Badges y Rankings</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {achievementBadges.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setLightbox(`/dayah/logros/${b.file}`)}
                  className="overflow-hidden rounded-lg border border-border bg-white p-2 transition-all hover:scale-105 hover:shadow-md"
                >
                  <img
                    src={`/dayah/logros/${b.file}`}
                    alt={b.label}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Screenshots */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Amazon KDP Dashboard</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {screenshots.map((s) => (
                <button
                  key={s.file}
                  onClick={() => setLightbox(`/dayah/logros/${s.file}`)}
                  className="overflow-hidden rounded-lg border border-border bg-surface transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <img
                    src={`/dayah/logros/${s.file}`}
                    alt={s.label}
                    className="w-full object-cover"
                    style={{ maxHeight: 400 }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Instagram posts */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Contenido de Instagram</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {instaPosts.map((p) => (
                <button
                  key={p.file}
                  onClick={() => setLightbox(`/dayah/logros/${p.file}`)}
                  className="overflow-hidden rounded-lg border border-border bg-surface transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <img
                    src={`/dayah/logros/${p.file}`}
                    alt={p.label}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5' }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 text-3xl text-white hover:text-gray-300"
          >
            &times;
          </button>
          <img
            src={lightbox}
            alt="Achievement"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageLayout>
  )
}