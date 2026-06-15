"use client";

import { useEffect, useState } from "react";

// Lightweight client-side cart store. Not real "state management" — just a tiny
// useState-shaped helper that talks to localStorage. Replaces the inline
// saveCart/loadCart that the cart page used.

export interface CartItem {
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

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("maskarada-cart-update", { detail: { items } }));
}

export function addToCart(item: CartItem) {
  const current = getCart();
  const existing = current.find((it) => it.id === item.id);
  if (existing) {
    setCart(
      current.map((it) => (it.id === item.id ? { ...it, quantity: it.quantity + item.quantity } : it)),
    );
  } else {
    setCart([...current, item]);
  }
}

export function removeFromCart(id: string) {
  setCart(getCart().filter((it) => it.id !== id));
}

export function clearCart() {
  setCart([]);
}

export function cartCount(): number {
  return getCart().reduce((s, it) => s + it.quantity, 0);
}

export function useCartCount(): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(cartCount());
    const handler = () => setCount(cartCount());
    window.addEventListener("maskarada-cart-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("maskarada-cart-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return count;
}
