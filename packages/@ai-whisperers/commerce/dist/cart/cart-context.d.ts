import { ReactNode } from "react";
import type { CartItem } from "../types";
interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (name: string) => void;
    updateQuantity: (name: string, qty: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
    savedItems: CartItem[];
    saveItem: (name: string) => void;
    restoreItem: (name: string) => void;
    shareCart: () => string;
}
export interface CartConfig {
    storagePrefix: string;
    storeName: string;
    currency: string;
    currencySymbol: string;
    usdRate?: number;
    gtagEnabled?: boolean;
    waPhone?: string;
    onAddToCart?: (item: {
        name: string;
        price: number;
        quantity: number;
    }) => void;
}
export declare function createCart(config: CartConfig): {
    CartProvider: ({ children }: {
        children: ReactNode;
    }) => React.ReactElement;
    useCart: () => CartContextType;
    CART_TOAST: string;
};
export {};
//# sourceMappingURL=cart-context.d.ts.map