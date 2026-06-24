"use client";
import { useEffect } from "react";
// useToast provided by consumer
const useToast = () => ({ toast: (p) => console.log("toast:", p) });
export function CartToastListener() {
    const { toast } = useToast();
    useEffect(() => {
        const handler = (e) => {
            const detail = e.detail;
            toast({ message: detail.message, type: detail.type });
        };
        window.addEventListener("cart-toast", handler);
        return () => window.removeEventListener("cart-toast", handler);
    }, [toast]);
    return null;
}
//# sourceMappingURL=cart-toast-listener.js.map