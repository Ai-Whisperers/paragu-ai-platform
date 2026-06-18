"use client";

/**
 * Client-side JSON-LD emitter.
 * For use in client components (where the server `JsonLd` component isn't ideal).
 * Injects the script tag into the document head on mount.
 */
import { useEffect } from "react";

export function ClientJsonLd({ data }: { data: object | object[] }) {
  useEffect(() => {
    const json = JSON.stringify(data);
    const existing = document.head.querySelector(
      `script[data-jsonld="true"][data-payload="${json.length}"]`,
    );
    if (existing) return; // dedupe
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.jsonld = "true";
    script.dataset.payload = String(json.length);
    script.textContent = json;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
  return null;
}
