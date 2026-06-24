import { NextResponse } from "next/server";
export declare function errorResponse(message: string, status?: number, details?: unknown): NextResponse<{
    details?: {} | undefined;
    error: string;
}>;
export declare function apiErrorHandler(err: unknown): NextResponse<{
    error: string;
}>;
//# sourceMappingURL=error-handler.d.ts.map