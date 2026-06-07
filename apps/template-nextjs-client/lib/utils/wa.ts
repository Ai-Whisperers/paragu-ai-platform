export function cleanPhone(phone: string): string {
  return phone.replace(/[\s+()-]/g, '')
}

export function waUrl(phone: string, message: string): string {
  return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`
}
