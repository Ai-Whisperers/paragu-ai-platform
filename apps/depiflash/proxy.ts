// API routes moved to /api/ — middleware not needed for static deployment
export function proxy() {}
export const config = { matcher: ['/((?!api/).*)'] }
