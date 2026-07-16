// Single helper to build WhatsApp URLs using the live number from content/es.json.
// When the client responds the questionnaire 01, only `contacto.whatsapp` changes.

export function whatsappUrl(phone: string | null | undefined, message?: string) {
  const safe = (phone || "595981324569").replace(/\D/g, "");
  const base = `https://wa.me/${safe}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export interface SiteData {
  site: { url: string; title: string; description: string };
  contacto: { whatsapp: string; whatsappDisplay: string };
  businessName: string;
}

export function getSiteConfig(c: any): SiteData {
  return {
    site: c.site,
    contacto: c.contacto,
    businessName: c.businessName,
  };
}