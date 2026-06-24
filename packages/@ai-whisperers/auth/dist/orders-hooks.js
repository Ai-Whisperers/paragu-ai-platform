"use client";
import { useState, useCallback } from "react";
export function useAuthOrders(supabase, user) {
    const [orders, setOrders] = useState([]);
    const refreshOrders = useCallback(async () => {
        if (!user)
            return;
        const { data } = await supabase.from("ej_orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        if (data)
            setOrders(data.map((o) => ({ ...o, id: o.id || "", date: o.created_at || o.date, items: o.items || [], total: o.total || "0", status: o.status || "pendiente", addressId: o.address_id || "", paymentMethod: o.payment_method || "" })));
    }, [user, supabase]);
    const addOrder = useCallback(async (o) => {
        if (!user)
            return "";
        const id = "ORD-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
        const { error } = await supabase.from("ej_orders").insert({ id, user_id: user.id, items: o.items, total: o.total || "0", status: "pendiente", address_id: o.addressId || "", payment_method: o.paymentMethod || "" });
        if (error)
            return "";
        setOrders(prev => [{ id, date: new Date().toISOString(), items: o.items, total: o.total, status: "pendiente", addressId: o.addressId || "", paymentMethod: o.paymentMethod || "" }, ...prev]);
        return id;
    }, [user, supabase]);
    return { orders, setOrders, refreshOrders, addOrder };
}
//# sourceMappingURL=orders-hooks.js.map