export function formatPYG(amount: number): string {
  return `Gs. ${Math.round(amount).toLocaleString('es-PY')}`
}

export function formatPrice(amount: number, currency = 'PYG'): string {
  if (currency === 'PYG') return formatPYG(amount)
  return `$${amount.toFixed(2)}`
}
