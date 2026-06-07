export function QuickOrderInput() {
  return (
    <div className="flex items-center gap-2">
      <input type="text" placeholder="Código de producto (ej: F4-001)"
        className="w-36 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-ring" />
      <a href="https://wa.me/595981234567?text=¡Hola!%20Quiero%20el%20producto%20código%20" target="_blank" rel="noopener noreferrer"
        className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-semibold no-underline hover:bg-primary/90 whitespace-nowrap">
        Pedir por código
      </a>
    </div>
  )
}
