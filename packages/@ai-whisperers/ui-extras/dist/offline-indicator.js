"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export function OfflineIndicator() {
    const [offline, setOffline] = useState(false);
    useEffect(() => {
        setOffline(!navigator.onLine);
        const off = () => setOffline(true);
        const on = () => setOffline(false);
        window.addEventListener("offline", off);
        window.addEventListener("online", on);
        return () => { window.removeEventListener("offline", off); window.removeEventListener("online", on); };
    }, []);
    if (!offline)
        return null;
    return (_jsxs("div", { className: "fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-lg", children: [_jsx("span", { children: "\u26A0\\uFE0F" }), " Sin conexi\\u00f3n"] }));
}
//# sourceMappingURL=offline-indicator.js.map