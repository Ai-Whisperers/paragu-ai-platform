import contentJson from "@/content/es.json";

export const content = contentJson as {
  site: {
    name: string;
    tagline: string;
    description: string;
    domain: string;
    whatsappNumber: string;
    instagramHandle: string;
    instagramUrl: string;
    address: string;
    addressMaps: string;
    eventDate: string;
    eventDateLabel: string;
    eventDateLong: string;
    eventPassed: boolean;
  };
  nav: Array<{ href: string; label: string; cta?: boolean }>;
  footer: {
    tagline: string;
    copyright: string;
    disclaimer: string;
    contentDisclaimer: string;
  };
  ageGate: {
    enabled: boolean;
    title: string;
    body: string;
    rememberDays: number;
  };
  hero: { title: string; subtitle: string; tagline: string };
};

export function whatsappLink(message = "Hola! Quiero info sobre maškaráda"): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${content.site.whatsappNumber}?text=${text}`;
}
