import { NextResponse } from "next/server";
import { getSupabaseClient } from "./supabase-client";
export async function getUserFromSession(request) {
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!authHeader)
        return null;
    const { data: { user }, error } = await supabase.auth.getUser(authHeader);
    if (error || !user)
        return null;
    return {
        id: user.id,
        email: user.email,
        role: user.role || "user",
    };
}
export function withAuth(handler) {
    return async (request) => {
        const user = await getUserFromSession(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(request, user);
    };
}
export function withAdmin(handler) {
    return withAuth(async (request, user) => {
        if (user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        return handler(request, user);
    });
}
//# sourceMappingURL=with-auth.js.map