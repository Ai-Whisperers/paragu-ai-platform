import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export interface AuthUser {
    id: string;
    email?: string;
    role: string;
}
export declare function getUserFromSession(request: NextRequest): Promise<AuthUser | null>;
export declare function withAuth(handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>): (request: NextRequest) => Promise<NextResponse<unknown>>;
export declare function withAdmin(handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>): (request: NextRequest) => Promise<NextResponse<unknown>>;
//# sourceMappingURL=with-auth.d.ts.map