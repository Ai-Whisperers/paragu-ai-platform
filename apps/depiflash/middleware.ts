// API routes moved to /api/ — middleware not needed for static deployment
export function middleware() {}
export const config = { matcher: ['/((?!api/).*)'] }
