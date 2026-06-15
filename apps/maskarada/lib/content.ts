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
  hero: { title: string; subtitle: string; tagline: string };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{ icon: string; title: string; description: string }>;
  };
  experience: {
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{ rating: string; author: string; text: string }>;
  };
  eventDetails: {
    title: string;
    items: Array<{ icon: string; title: string; description: string; link?: string }>;
  };
  nav: Array<{ href: string; label: string; cta?: boolean }>;
  footer: { tagline: string; copyright: string; disclaimer: string };
};

export function whatsappLink(message = "Hola! Quiero info sobre maškaráda"): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${content.site.whatsappNumber}?text=${text}`;
}
