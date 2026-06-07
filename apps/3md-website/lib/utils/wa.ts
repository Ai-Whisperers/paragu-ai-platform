export function wa(phone: string, message?: string): string {
  const msg = message || "Hola! Quiero mas informacion"
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`
}
