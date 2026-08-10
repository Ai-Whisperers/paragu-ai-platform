"use client";

import { MessageCircle } from "lucide-react";
import content from "@/content/es.json";

export default function MessagingFloat() {
  const site = (content.site as any) || {};
  const messaging = site.messaging || "595974161698";

  return (
    <a
      href={`tel:+${messaging}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Messaging"
    >
      <MessageCircle size={28} />
    </a>
  );
}
