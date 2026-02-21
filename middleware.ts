import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['uk', 'ru', 'en'],
  defaultLocale: 'uk',
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/uk', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclude API routes, Next.js internals, and static files (including .json in /public)
  matcher: ['/((?!api|_next|_vercel|favicon\\.ico|.*\\..+).*)'],
};
