"use client";
import { useEffect } from "react";
// validatePromo provided by consumer
const validatePromo = async (code, subtotal) => ({ ok: false, discount: 0 });
export function AutoPromo({ onValidPromo }) {
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const params = new URLSearchParams(window.location.search);
        const code = params.get("promo");
        if (!code)
            return;
        validatePromo(code, 0).then(result => {
            if (result.ok) {
                const input = document.querySelector("[placeholder*=\"Código\"]");
                if (input) {
                    input.value = code;
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                }
                onValidPromo(code);
            }
        });
    }, [onValidPromo]);
    return null;
}
//# sourceMappingURL=auto-promo.js.map