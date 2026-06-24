"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@ai-whisperers/auth/supabase/client";
import { AdminSidebar } from "./sidebar";
import { Package, LogOut, ExternalLink, Menu, User } from "lucide-react";
export function useAdminAuth() {
    const [authed, setAuthed] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        let cancelled = false;
        async function checkAuth() {
            try {
                // 1) Try localStorage session (set by login page)
                const stored = localStorage.getItem("elviajero_admin_session");
                if (stored) {
                    const session = JSON.parse(stored);
                    const accessToken = session.access_token || session;
                    const res = await fetch("/api/auth", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
                        body: JSON.stringify({ action: "me" }),
                    });
                    const data = await res.json();
                    if (res.ok && data.ok && data.user?.role === "admin") {
                        if (!cancelled) {
                            setAuthed(true);
                            setAdmin(data.user);
                            setLoading(false);
                        }
                        return;
                    }
                }
                // 2) Fallback: try Supabase SSR cookie
                const supabase = createClient();
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
                    if (profile && profile.role === "admin") {
                        if (!cancelled) {
                            setAuthed(true);
                            setAdmin({ id: profile.id, name: profile.name, email: session.user.email || "", role: profile.role });
                            setLoading(false);
                        }
                        return;
                    }
                }
                // 3) Fallback: our custom cookie
                const cookies = document.cookie.split("; ").reduce((acc, c) => {
                    const [k, v] = c.split("=", 2);
                    acc[k.trim()] = v;
                    return acc;
                }, {});
                const token = cookies["elviajero_admin_token"];
                if (token) {
                    const res = await fetch("/api/auth", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({ action: "me" }),
                    });
                    const data = await res.json();
                    if (res.ok && data.ok && data.user?.role === "admin") {
                        if (!cancelled) {
                            setAuthed(true);
                            setAdmin(data.user);
                            setLoading(false);
                        }
                        return;
                    }
                }
            }
            catch { }
            if (!cancelled)
                setLoading(false);
        }
        checkAuth();
        return () => { cancelled = true; };
    }, [router]);
    return { authed, admin, loading };
}
export function AdminShell({ children }) {
    const { authed, loading } = useAdminAuth();
    const router = useRouter();
    const supabaseRef = useRef(createClient());
    const [mobileMenu, setMobileMenu] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
        if (loading)
            return;
        if (!authed) {
            router.push("/login?redirect=/admin");
            return;
        }
        supabaseRef.current.auth.getSession().then(({ data: { session } }) => {
            if (session?.user)
                setName(session.user.email?.split("@")[0] || "Admin");
        });
    }, [authed, loading, router]);
    if (loading)
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-[#0a0a0b]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsxs("div", { className: "relative w-10 h-10", children: [_jsx("div", { className: "absolute inset-0 rounded-full border-2 border-emerald-500/30" }), _jsx("div", { className: "absolute inset-1 rounded-full border-t-2 border-emerald-400 animate-spin" })] }), _jsx("p", { className: "text-sm text-zinc-500 font-medium", children: "Cargando panel..." })] }) }));
    if (!authed)
        return null;
    return (_jsxs("div", { className: "flex min-h-screen bg-[#0a0a0b]", children: [mobileMenu && (_jsx("div", { className: "fixed inset-0 z-40 bg-black/60 lg:hidden", onClick: () => setMobileMenu(false) })), _jsx("div", { className: `fixed inset-y-0 left-0 z-50 w-64 bg-[#0f0f10] border-r border-zinc-800/60 transform transition-transform duration-200 lg:relative lg:translate-x-0 ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}`, children: _jsx(AdminSidebar, { onNavigate: () => setMobileMenu(false) }) }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsx("header", { className: "sticky top-0 z-30 bg-[#0f0f10]/80 backdrop-blur-xl border-b border-zinc-800/60", children: _jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 h-14", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setMobileMenu(!mobileMenu), className: "lg:hidden p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors", children: _jsx(Menu, { className: "w-5 h-5" }) }), _jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [_jsx(Package, { className: "w-5 h-5 text-emerald-400" }), _jsx("span", { className: "text-sm font-semibold text-white", children: "El Viajero" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Link, { href: "/", className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all", children: [_jsx(ExternalLink, { className: "w-3.5 h-3.5" }), _jsx("span", { className: "hidden sm:inline", children: "Ver sitio" })] }), _jsx("div", { className: "w-px h-5 bg-zinc-800 mx-1" }), _jsxs("div", { className: "flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-800/40", children: [_jsx(User, { className: "w-3.5 h-3.5 text-zinc-500" }), _jsx("span", { className: "text-xs text-zinc-400 font-medium", children: name })] }), _jsx("button", { onClick: async () => { await supabaseRef.current.auth.signOut(); window.location.href = "/login"; }, className: "p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/60 transition-all", title: "Cerrar sesi\u00F3n", children: _jsx(LogOut, { className: "w-4 h-4" }) })] })] }) }), _jsx("main", { className: "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto", children: children })] })] }));
}
//# sourceMappingURL=admin-layout.js.map