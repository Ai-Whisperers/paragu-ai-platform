"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
export function FeedbackButton() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [sent, setSent] = useState(false);
    const submit = () => {
        if (!text.trim())
            return;
        const feedbacks = JSON.parse(localStorage.getItem("viajero_feedback") || "[]");
        feedbacks.push({ id: Date.now().toString(36), text: text.trim(), date: new Date().toISOString(), url: window.location.href });
        localStorage.setItem("viajero_feedback", JSON.stringify(feedbacks));
        setSent(true);
        setTimeout(() => { setOpen(false); setSent(false); setText(""); }, 2000);
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen(true), className: "fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl text-white shadow-lg hover:bg-primary/90 transition-all md:bottom-6", "aria-label": "Enviar feedback", children: "\uD83D\uDCAD" }), open && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4", onClick: () => setOpen(false), children: _jsx("div", { className: "w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl", onClick: e => e.stopPropagation(), children: sent ? (_jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: "text-4xl mb-2", children: "\u2705" }), _jsx("p", { className: "font-medium text-foreground", children: "\u00A1Gracias por tu feedback!" })] })) : (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "Decinos qu\u00E9 mejorar" }), _jsx("textarea", { value: text, onChange: e => setText(e.target.value), rows: 3, placeholder: "Tu opini\u00F3n nos ayuda a mejorar...", className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring resize-none mb-4" }), _jsx("button", { onClick: submit, disabled: !text.trim(), className: "w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: "Enviar" })] })) }) }))] }));
}
//# sourceMappingURL=feedback-button.js.map