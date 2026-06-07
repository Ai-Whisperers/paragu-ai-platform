"use client"

import { Share2 } from "lucide-react"

export function CopyLinkButton({ url, label }: { url: string; label: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url)
        const btn = document.activeElement as HTMLButtonElement
        if (btn) {
          btn.innerHTML = "✓ " + (label === "Copy link" ? "Copied!" : "¡Copiado!")
          setTimeout(() => {
            btn.innerHTML = `<svg class="w-4 h-4" ...></svg> ${label}`
          }, 2000)
        }
      }}
      className="inline-flex items-center gap-2 bg-surface-muted text-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <Share2 className="w-4 h-4" />
      {label}
    </button>
  )
}
