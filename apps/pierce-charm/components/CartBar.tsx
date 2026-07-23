"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site-config";
import { CrossInverted } from "./ornaments";

export interface CartItem {
  id: string;          // ej. "helix", "nostril", "ombligo"
  name: string;        // ej. "Helix"
  region: string;      // "oreja" | "rostro" | "cuerpo"
  price: string;       // ej. "Gs 100.000"
  jewelryType?: string; // "stud" | "hoop" | etc
  addedAt: number;      // timestamp
}

const STORAGE_KEY = "pierce_charm_cart_v1";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // notify other listeners
    window.dispatchEvent(new CustomEvent("pierce-cart:updated", { detail: { items } }));
  } catch {
    // ignore
  }
}

export function addToCart(item: Omit<CartItem, "addedAt">) {
  const items = readCart();
  // Allow up to 2 of same id (e.g. both ears) — generic placeholder
  const existing = items.filter((i) => i.id === item.id);
  if (existing.length >= 2) return items;
  const next: CartItem = { ...item, addedAt: Date.now() };
  const updated = [...items, next];
  writeCart(updated);
  return updated;
}

export function removeFromCart(id: string, addedAt?: number) {
  const items = readCart();
  const updated = addedAt
    ? items.filter((i) => !(i.id === id && i.addedAt === addedAt))
    : items.filter((i) => i.id !== id);
  writeCart(updated);
  return updated;
}

export function clearCart() {
  writeCart([]);
}

export function getCart(): CartItem[] {
  return readCart();
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(readCart());
      setHydrated(true);
    }, 0);
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items: CartItem[] } | undefined;
      if (detail) setItems(detail.items);
      else setItems(readCart());
    };
    const onStorage = () => setItems(readCart());
    window.addEventListener("pierce-cart:updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pierce-cart:updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const add = useCallback((item: Omit<CartItem, "addedAt">) => {
    return addToCart(item);
  }, []);

  const remove = useCallback((id: string, addedAt?: number) => {
    return removeFromCart(id, addedAt);
  }, []);

  const clear = useCallback(() => {
    clearCart();
  }, []);

  return { items, hydrated, add, remove, clear };
}

/**
 * Componente global: barra flotante inferior que muestra el resumen del carrito
 * + botón WhatsApp con mensaje pre-armado. Aparece solo si hay items.
 */
export function CartBar({ phone = "595981324569" }: { phone?: string }) {
  const { items, hydrated, remove, clear } = useCart();
  const pathname = usePathname();

  // No render en /contacto, /terminos, /privacidad — no suman
  if (!hydrated) return null;
  if (items.length === 0) return null;
  if (pathname === "/contacto" || pathname === "/terminos" || pathname === "/privacidad") return null;

  // Build summary message
  const grouped = items.reduce<Record<string, CartItem[]>>((acc, it) => {
    acc[it.id] = acc[it.id] || [];
    acc[it.id].push(it);
    return acc;
  }, {});
  const listText = Object.values(grouped)
    .map((arr) => {
      const first = arr[0];
      const qty = arr.length;
      return `${qty > 1 ? `${qty}× ` : ""}${first.name} (${first.region})${first.price ? ` — ${first.price}` : ""}`;
    })
    .join("\n• ");

  const message = `Hola! Quiero reservar en Pierce Charm. Mi selección:

• ${listText}

Total: ${items.length} ${items.length === 1 ? "pieza" : "piezas"}.

¿Pueden ayudarme con disponibilidad y precios finales?`;

  const waHref = whatsappUrl(phone, message);

  return (
    <div
      className="fixed left-3 right-3 md:left-auto md:right-6 md:bottom-24 z-30 pointer-events-auto"
      style={{ bottom: "max(5rem, env(safe-area-inset-bottom, 0px))" }}
      role="region"
      aria-label="Tu selección de piercings"
    >
      <div className="bg-[var(--color-surface)] border border-[var(--color-gold)] shadow-2xl backdrop-blur-md p-3 md:p-4 max-w-2xl mx-auto md:ml-auto">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
            Tu selección · {items.length} {items.length === 1 ? "pieza" : "piezas"}
          </p>
          <button
            onClick={clear}
            className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] underline"
            aria-label="Vaciar selección"
          >
            Vaciar
          </button>
        </div>

        <ul className="text-[0.85rem] text-[var(--color-foreground)]/85 max-h-32 overflow-y-auto mb-3 pr-1 space-y-0.5">
          {items.slice(-5).map((it) => (
            <li key={`${it.id}-${it.addedAt}`} className="flex items-center justify-between gap-2">
              <span className="truncate">
                <span className="text-[var(--color-gold)]">•</span> {it.name}{" "}
                <span className="text-[var(--color-muted-foreground)]">({it.region})</span>
              </span>
              <button
                onClick={() => remove(it.id, it.addedAt)}
                className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary-light)] text-xs shrink-0"
                aria-label={`Quitar ${it.name}`}
              >
                ✕
              </button>
            </li>
          ))}
          {items.length > 5 && (
            <li className="text-[var(--color-muted-foreground)] text-[0.75rem]">
              +{items.length - 5} más...
            </li>
          )}
        </ul>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gothic tap w-full justify-center text-[0.78rem]"
        >
          <CrossInverted size={12} className="text-[var(--color-gold)]" />
          Reservar por WhatsApp
        </a>
      </div>
    </div>
  );
}
