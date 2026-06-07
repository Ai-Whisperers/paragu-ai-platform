export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8">La página que buscás no existe o fue movida.</p>
      <div className="flex gap-4">
        <a href="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold no-underline hover:bg-primary/90">
          Volver al inicio
        </a>
        <a href="https://wa.me/595981234567?text=¡Hola!%20No%20encuentro%20una%20página"
          target="_blank" rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-[#20BD5A]">
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
