"use client";
import { useState, useCallback } from "react";
export function useAuthAddresses(supabase, user) {
    const [addresses, setAddresses] = useState([]);
    const loadAddresses = useCallback(async () => {
        if (!user)
            return;
        const { data } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", { ascending: false });
        if (data)
            setAddresses(data.map((a) => ({ id: a.id, label: a.label || "", name: a.name || "", street: a.street, city: a.city, state: a.state || "", zip: a.zip || "", phone: a.phone || "", isDefault: a.is_default })));
    }, [user, supabase]);
    const addAddress = useCallback(async (a) => {
        if (!user)
            return { ok: false, error: "No hay sesión" };
        if (a.isDefault)
            await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
        const { data, error } = await supabase.from("addresses").insert({ user_id: user.id, label: a.label, name: a.name, street: a.street, city: a.city, state: a.state, zip: a.zip, phone: a.phone, is_default: a.isDefault }).select().single();
        if (error)
            return { ok: false, error: error.message };
        if (data)
            setAddresses(prev => [...prev, { id: data.id, label: data.label || "", name: data.name || "", street: data.street, city: data.city, state: data.state || "", zip: data.zip || "", phone: data.phone || "", isDefault: data.is_default }]);
        return { ok: true };
    }, [user, supabase]);
    const updateAddress = useCallback(async (id, a) => {
        if (!user)
            return { ok: false, error: "No hay sesión" };
        const updates = {};
        if (a.label !== undefined)
            updates.label = a.label;
        if (a.name !== undefined)
            updates.name = a.name;
        if (a.street !== undefined)
            updates.street = a.street;
        if (a.city !== undefined)
            updates.city = a.city;
        if (a.state !== undefined)
            updates.state = a.state;
        if (a.zip !== undefined)
            updates.zip = a.zip;
        if (a.phone !== undefined)
            updates.phone = a.phone;
        if (a.isDefault !== undefined) {
            updates.is_default = a.isDefault;
            await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
        }
        const { error } = await supabase.from("addresses").update(updates).eq("id", id).eq("user_id", user.id);
        if (error)
            return { ok: false, error: error.message };
        setAddresses(prev => prev.map(ad => ad.id === id ? { ...ad, ...a } : ad));
        return { ok: true };
    }, [user, supabase]);
    const removeAddress = useCallback(async (id) => {
        if (!user)
            return;
        await supabase.from("addresses").delete().eq("id", id).eq("user_id", user.id);
        setAddresses(prev => prev.filter(a => a.id !== id));
    }, [user, supabase]);
    return { addresses, setAddresses, loadAddresses, addAddress, updateAddress, removeAddress };
}
//# sourceMappingURL=address-hooks.js.map