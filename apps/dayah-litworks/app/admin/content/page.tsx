// Admin content page — disabled. Content is managed via content/es.json.
// To re-enable, install @ai-whisperers/client-kit from private registry.
export default function AdminContentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Editor de Contenido</h1>
        <p className="text-muted-foreground">El contenido se edita en content/es.json. El editor dinámico requiere acceso al registry privado de @ai-whisperers.</p>
      </div>
    </div>
  )
}
