'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface CartItem {
  product: {
    sku: string;
    name: string;
    price: number;
    images: string[];
  };
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: CartItem['product'], size: string, qty?: number) => void;
  removeItem: (sku: string, size: string) => void;
  updateQty: (sku: string, size: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'reina-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: CartItem['product'], size: string, qty: number = 1) => {
      setItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.product.sku === product.sku && item.size === size
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            qty: updated[existingIdx].qty + qty,
          };
          return updated;
        }
        return [...prev, { product, size, qty }];
      });
    },
    []
  );

  const removeItem = useCallback((sku: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.sku === sku && item.size === size)
      )
    );
  }, []);

  const updateQty = useCallback(
    (sku: string, size: string, qty: number) => {
      if (qty <= 0) {
        removeItem(sku, size);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.sku === sku && item.size === size
            ? { ...item, qty }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
