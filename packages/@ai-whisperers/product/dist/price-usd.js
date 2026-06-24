"use client";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PriceUSD({ pygStr }) {
    const n = parseInt(pygStr.replace(/[^\d]/g, ""), 10) || 0;
    const usd = n / 7400;
    return (_jsxs("span", { className: "text-xs text-muted-foreground/60 ml-1", children: ["\u2248 USD ", usd.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 1 })] }));
}
//# sourceMappingURL=price-usd.js.map