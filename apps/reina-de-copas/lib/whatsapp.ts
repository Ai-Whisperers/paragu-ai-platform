const PHONE_NUMBER = '595982774456';
const BASE_URL = 'https://wa.me/' + PHONE_NUMBER;

export function getProductWhatsAppUrl(
  product: { name: string },
  size?: string,
  qty?: number
): string {
  const sizeText = size ? ` - Talla: ${size}` : '';
  const qtyText = qty && qty > 1 ? ` (${qty} unidades)` : '';
  const message = `Hola, quiero consultar sobre: ${product.name}${sizeText}${qtyText}`;
  return `${BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function getCheckoutWhatsAppMessage(
  items: { product: { name: string; price: number }; size?: string; qty: number }[],
  customer: { phone: string; address: string; name: string; notes?: string }
): string {
  const formatPrice = (price: number) =>
    `Gs ${price.toLocaleString('es-PY').replace(/,/g, '.')}`;

  let message = `🛒 *Nuevo Pedido - Reina de Copas*\n\n`;
  message += `👤 *Cliente:* ${customer.name}\n`;
  message += `📞 *Teléfono:* ${customer.phone}\n`;
  message += `📍 *Dirección:* ${customer.address}\n`;

  if (customer.notes) {
    message += `📝 *Notas:* ${customer.notes}\n`;
  }

  message += `\n*Productos:*\n`;

  let total = 0;
  items.forEach((item, index) => {
    const sizeText = item.size ? ` (${item.size})` : '';
    const subtotal = item.product.price * item.qty;
    total += subtotal;
    message += `${index + 1}. ${item.product.name}${sizeText} x${item.qty} - ${formatPrice(subtotal)}\n`;
  });

  message += `\n*Total: ${formatPrice(total)}*`;

  return message;
}
