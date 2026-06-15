"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/lib/content";

interface CartItem {
  id: string;
  vendor: string;
  name: string;
  variant?: string;
  unitPrice: number;
  quantity: number;
  image?: string;
  source: "monai" | "future";
}

const STORAGE_KEY = "maskarada_cart_v1";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function Carrito() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(loadCart());
  }, []);

  function update(next: CartItem[]) {
    setItems(next);
    saveCart(next);
  }

  function setQty(id: string, qty: number) {
    update(items.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, qty) } : it)));
  }

  function remove(id: string) {
    update(items.filter((it) => it.id !== id));
  }

  const total = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
  const count = items.reduce((s, it) => s + it.quantity, 0);

  if (!mounted) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-500">Cargando carrito…</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-white mb-3">Tu carrito está vacío</h1>
          <p className="text-gray-400 mb-6">Cuando agregues productos desde la tienda, aparecerán acá.</p>
          <Link
            href="/tienda"
            className="inline-block bg-gold-400/90 hover:bg-gold-400 text-black px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const byVendor: Record<string, CartItem[]> = {};
  for (const it of items) {
    (byVendor[it.vendor] = byVendor[it.vendor] || []).push(it);
  }

  const whatsappCheckout = () => {
    const lines: string[] = [`Hola! Quiero comprar:`];
    for (const [vendor, vendorItems] of Object.entries(byVendor)) {
      lines.push("", `*${vendor}*`);
      for (const it of vendorItems) {
        lines.push(`- ${it.quantity}x ${it.name}${it.variant ? ` (${it.variant})` : ""} — Gs ${(it.unitPrice * it.quantity).toLocaleString("es-PY")}`);
      }
    }
    lines.push("", `*Total: Gs ${total.toLocaleString("es-PY")}*`, "", "Mi nombre:", "Ciudad de envío:", "Método de pago preferido: (transferencia / efectivo en pickup)");
    return `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Tu carrito</h1>
        <p className="text-sm text-gray-400 mb-8">
          {count} {count === 1 ? "item" : "items"} en {Object.keys(byVendor).length} {Object.keys(byVendor).length === 1 ? "tienda" : "tiendas"}.
        </p>

        <div className="space-y-6 mb-8">
          {Object.entries(byVendor).map(([vendor, vendorItems]) => {
            const vendorTotal = vendorItems.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
            return (
              <div key={vendor} className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-white">{vendor}</h2>
                  <span className="text-sm text-gold-400">Gs {vendorTotal.toLocaleString("es-PY")}</span>
                </div>
                <ul className="space-y-2">
                  {vendorItems.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setQty(it.id, it.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-white">{it.quantity}</span>
                        <button
                          onClick={() => setQty(it.id, it.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{it.name}</p>
                        {it.variant && <p className="text-xs text-gray-500">{it.variant}</p>}
                      </div>
                      <p className="text-sm text-gray-300 shrink-0">
                        Gs {(it.unitPrice * it.quantity).toLocaleString("es-PY")}
                      </p>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-gray-500 hover:text-red-400 text-sm shrink-0"
                        aria-label="Quitar"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">Gs {total.toLocaleString("es-PY")}</span>
          </div>
          <div className="flex items-center justify-between mb-1 text-sm">
            <span className="text-gray-500">Envío</span>
            <span className="text-gray-500">Se coordina por WhatsApp con cada tienda</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-gold-400">Gs {total.toLocaleString("es-PY")}</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={whatsappCheckout()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            💬 Finalizar por WhatsApp
          </a>
          <Link
            href="/tienda"
            className="block w-full text-center border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Seguir comprando
          </Link>
        </div>

        <div className="mt-6 p-4 border border-white/5 rounded-lg text-xs text-gray-500">
          <p>
            <strong className="text-gray-400">Cómo funciona el checkout:</strong> Al hacer click en
            Finalizar, abrís WhatsApp con un mensaje pre-armado. Cada tienda te responde con
            datos de pago (transferencia bancaria o PIX). El envío se coordina directo con la
            tienda. La plataforma no procesa pagos en esta fase — eso llega en la versión
            siguiente con Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
