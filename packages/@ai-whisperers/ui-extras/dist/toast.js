"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from "react";
const ToastContext = createContext({ toast: () => { } });
export function useToast() {
    return useContext(ToastContext);
}
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((message, type = "success") => {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);
    const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));
    return (_jsxs(ToastContext.Provider, { value: { toast: addToast }, children: [children, _jsx("div", { className: "fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 md:bottom-6 md:right-6 md:left-auto md:translate-x-0", children: toasts.map(t => (_jsxs("div", { onClick: () => remove(t.id), className: `animate-slide-up flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm ${t.type === "success" ? "bg-success/90 text-white" :
                        t.type === "error" ? "bg-destructive/90 text-white" :
                            "bg-foreground/90 text-background"}`, children: [_jsx("span", { children: t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ" }), t.message] }, t.id))) })] }));
}
//# sourceMappingURL=toast.js.map