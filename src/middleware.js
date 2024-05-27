import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const isPublicPath = pathname === '/account/login' || pathname === '/account/signup' || pathname === '/account/verifyEmail' || pathname === '/account';

  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/account/login', '/account/signup', '/account/verifyEmail'],
};
