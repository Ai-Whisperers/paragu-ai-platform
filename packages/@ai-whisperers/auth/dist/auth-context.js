"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
export function createAuthContext(config) {
    const { supabaseUrl, supabaseAnonKey, storagePrefix } = config;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const STORAGE_KEY_USER = `${storagePrefix}_user`;
    const STORAGE_KEY_ADDRESSES = `${storagePrefix}_addresses`;
    const AuthContext = createContext({});
    function AuthProvider({ children }) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [addresses, setAddresses] = useState([]);
        // Restore from localStorage on mount
        useEffect(() => {
            try {
                const cached = localStorage.getItem(STORAGE_KEY_USER);
                if (cached)
                    setUser(JSON.parse(cached));
                const addr = localStorage.getItem(STORAGE_KEY_ADDRESSES);
                if (addr)
                    setAddresses(JSON.parse(addr));
            }
            catch { }
            setLoading(false);
        }, []);
        // Listen for auth state changes
        useEffect(() => {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                if (session?.user) {
                    const profile = {
                        id: session.user.id,
                        email: session.user.email || "",
                        name: session.user.user_metadata?.name,
                        role: session.user.user_metadata?.role,
                        avatar_url: session.user.user_metadata?.avatar_url,
                    };
                    setUser(profile);
                    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
                }
                else {
                    setUser(null);
                    localStorage.removeItem(STORAGE_KEY_USER);
                }
            });
            return () => subscription.unsubscribe();
        }, []);
        const signIn = useCallback(async (email, password) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error: error?.message };
        }, []);
        const signUp = useCallback(async (email, password, name) => {
            const { data, error } = await supabase.auth.signUp({
                email, password,
                options: { data: { name } }
            });
            if (data.user) {
                // Create profile record
                await supabase.from("profiles").upsert({
                    id: data.user.id,
                    email,
                    name,
                    created_at: new Date().toISOString(),
                });
            }
            return { error: error?.message };
        }, []);
        const signOut = useCallback(async () => {
            await supabase.auth.signOut();
            setUser(null);
            localStorage.removeItem(STORAGE_KEY_USER);
            localStorage.removeItem(STORAGE_KEY_ADDRESSES);
        }, []);
        const resetPassword = useCallback(async (email) => {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback`,
            });
            return { error: error?.message };
        }, []);
        const updateProfile = useCallback(async (data) => {
            const { error } = await supabase.from("profiles").upsert({
                id: user?.id,
                ...data,
                updated_at: new Date().toISOString(),
            });
            if (!error && user) {
                const updated = { ...user, ...data };
                setUser(updated);
                localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
            }
            return { error: error?.message };
        }, [user]);
        const addAddress = useCallback(async (address) => {
            const newAddr = { ...address, id: crypto.randomUUID?.() || `${Date.now()}` };
            const updated = [...addresses, newAddr];
            setAddresses(updated);
            localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
        }, [addresses]);
        return (_jsx(AuthContext.Provider, { value: {
                user, loading,
                signIn, signUp, signOut, resetPassword, updateProfile,
                addresses, addAddress,
            }, children: children }));
    }
    function useAuth() {
        const ctx = useContext(AuthContext);
        if (!ctx)
            throw new Error(`useAuth(${storagePrefix}) must be used within AuthProvider`);
        return ctx;
    }
    return { AuthProvider, useAuth, supabase };
}
//# sourceMappingURL=auth-context.js.map