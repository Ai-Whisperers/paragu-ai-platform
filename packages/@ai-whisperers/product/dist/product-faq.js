"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAuth } from "@ai-whisperers/auth/auth-context";
const STORAGE = "viajero_questions";
export function ProductFAQ({ productName }) {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [question, setQuestion] = useState("");
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        const all = JSON.parse(localStorage.getItem(STORAGE) || "[]");
        setItems(all.filter(q => q.productName === productName));
    }, [productName]);
    const submit = (e) => {
        e.preventDefault();
        if (!question.trim())
            return;
        const all = JSON.parse(localStorage.getItem(STORAGE) || "[]");
        const q = { id: Date.now().toString(36), productName, userName: user?.name || "Anónimo", question: question.trim(), date: new Date().toISOString() };
        all.push(q);
        localStorage.setItem(STORAGE, JSON.stringify(all));
        setItems([...items, q]);
        setQuestion("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };
    return (_jsxs("div", { className: "mt-12", children: [_jsx("h2", { className: "mb-6 text-xl font-bold text-foreground", children: "Preguntas y respuestas" }), _jsxs("div", { className: "space-y-4 mb-8", children: [items.length === 0 && _jsx("p", { className: "text-sm text-muted-foreground", children: "No hay preguntas todav\u00EDa." }), items.map((q) => (_jsxs("div", { className: "rounded-xl border border-border bg-surface p-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm text-primary", children: "Q" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: q.question }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [q.userName, " \u00B7 ", new Date(q.date).toLocaleDateString("es")] })] })] }), q.answer && (_jsxs("div", { className: "mt-3 flex items-start gap-3 border-t border-border pt-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground", children: "A" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm text-foreground", children: q.answer }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["El Viajero \u00B7 ", q.answerDate ? new Date(q.answerDate).toLocaleDateString("es") : ""] })] })] }))] }, q.id)))] }), _jsxs("form", { onSubmit: submit, className: "rounded-xl border border-border bg-surface p-5", children: [_jsx("h3", { className: "mb-3 text-sm font-semibold text-foreground", children: "Hac\u00E9 tu pregunta" }), _jsx("textarea", { value: question, onChange: e => setQuestion(e.target.value), rows: 2, placeholder: "Escrib\u00ED tu pregunta sobre este producto...", className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring resize-none mb-3" }), _jsx("button", { type: "submit", disabled: !question.trim(), className: "rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: "Enviar pregunta" }), submitted && _jsx("span", { className: "ml-3 text-sm text-success", children: "Pregunta enviada" })] })] }));
}
//# sourceMappingURL=product-faq.js.map