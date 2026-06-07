// Admin content page — disabled. Content is managed via content/ files.
export default function AdminContentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
      <div className="text-center">
        <p className="text-lg mb-2">Panel de contenido</p>
        <p className="text-sm">El contenido se edita directamente en <code className="text-amber-500">content/es.json</code> y <code className="text-amber-500">content/en.json</code></p>
      </div>
    </div>
  )
}
