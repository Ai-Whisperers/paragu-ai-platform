import type { User } from "./types";
import type { Order } from "./types";
import type { SupabaseClient } from "@supabase/supabase-js";
export declare function useAuthOrders(supabase: SupabaseClient, user: User | null): {
    orders: Order[];
    setOrders: import("react").Dispatch<import("react").SetStateAction<Order[]>>;
    refreshOrders: () => Promise<void>;
    addOrder: (o: Omit<Order, "id" | "date" | "status">) => Promise<string>;
};
//# sourceMappingURL=orders-hooks.d.ts.map