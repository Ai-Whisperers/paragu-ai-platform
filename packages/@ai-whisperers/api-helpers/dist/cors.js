import { NextResponse } from "next/server";
export function corsHeaders(origin) {
    return {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
    };
}
export function handleCors(request) {
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: corsHeaders(request.headers.get("origin") || undefined),
        });
    }
    return null;
}
//# sourceMappingURL=cors.js.map