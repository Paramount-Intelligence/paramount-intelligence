import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    // Allow login & logout routes without token
    if (pathname === '/admin/login' || pathname === '/admin/logout') {
      return NextResponse.next();
    }

    // If token missing, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};