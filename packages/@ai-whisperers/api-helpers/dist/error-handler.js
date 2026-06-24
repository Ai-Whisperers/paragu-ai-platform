import { NextResponse } from "next/server";
export function errorResponse(message, status = 400, details) {
    return NextResponse.json({ error: message, ...(details ? { details } : {}) }, { status });
}
export function apiErrorHandler(err) {
    console.error("[API Error]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
}
//# sourceMappingURL=error-handler.js.map