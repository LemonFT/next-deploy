import createMiddleware from 'next-intl/middleware';

const PUBLIC_ROUTE_URL = ['/login', '/register', '/home', '/about'];
const PRIVATE_ROUTE_URL = ['/classes', '/'];

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/', request.url))
// }

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
};