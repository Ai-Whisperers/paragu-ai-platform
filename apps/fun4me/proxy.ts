import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fun4me is currently in maintenance — / redirects to ParaguAI main site.
// Uncomment below to restore shop redirect when needed:
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   if (pathname === '/') {
//     return NextResponse.redirect(new URL('/tienda', request.url));
//   }
//   return NextResponse.next();
// }
// export const config = { matcher: '/' };

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}
export const config = { matcher: '/' };
