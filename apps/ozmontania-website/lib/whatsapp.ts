// Oz Montanía — WhatsApp helper
// Phone number sourced from content JSON

import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'
const content = es as unknown as SiteContent

export function getWhatsAppUrl(message: string): string {
  const number = content.site.whatsapp
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}
