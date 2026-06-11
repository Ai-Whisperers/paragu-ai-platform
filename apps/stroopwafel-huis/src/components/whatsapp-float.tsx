import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat({ phone, message }: { phone: string; message: string }) {
  const url = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#22C35E] hover:scale-105 transition-all duration-200"
      aria-label="WhatsApp"
    >
      <MessageCircle size={24} fill="white" stroke="none" />
      <span className="text-sm font-medium hidden sm:inline">Contactanos</span>
    </a>
  )
}
