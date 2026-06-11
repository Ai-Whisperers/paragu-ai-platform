import { MessageCircle } from 'lucide-react'

export function MobileCta({ phone, message }: { phone: string; message: string }) {
  const url = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-3 md:hidden">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-3 rounded-full font-medium"
      >
        <MessageCircle size={20} />
        Contactanos por WhatsApp
      </a>
    </div>
  )
}
