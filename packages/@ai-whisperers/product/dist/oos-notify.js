"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export function OOSNotifyButton({ productName }) {
    const handleClick = () => {
        const email = prompt("Ingresa tu email para que te avisemos:");
        if (!email || !email.includes("@"))
            return;
        const requests = JSON.parse(localStorage.getItem("viajero_backinstock") || "[]");
        if (!requests.some((r) => r.productName === productName && r.email === email)) {
            requests.push({ productName, email, createdAt: Date.now() });
            localStorage.setItem("viajero_backinstock", JSON.stringify(requests));
            alert("Te avisaremos cuando este disponible");
        }
        else
            alert("Ya estas en la lista de espera");
    };
    return _jsx("button", { onClick: handleClick, className: "w-full rounded-lg border border-dashed border-muted-foreground/30 px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all", children: "Avisame cuando vuelva" });
}
//# sourceMappingURL=oos-notify.js.map