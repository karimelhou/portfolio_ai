import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['fr', 'en'] as const;
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  if (pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const locale = cookieLocale && locales.includes(cookieLocale as (typeof locales)[number]) ? cookieLocale : defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return;
}

export const config = {
  matcher: ['/((?!_next|icon|apple-icon|manifest.json|robots.txt|sitemap.xml|sw.js|.*\\.\w+$).*)']
};
