import { NextResponse } from 'next/server';
import { COOKIE_NAME, verifyToken } from '@/lib/jwt';

// ป้องกันหน้าและ API ที่ต้องล็อกอินก่อนใช้งาน
export async function middleware(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? await verifyToken(token) : null;
  if (user) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/students/:path*', '/fetch-demo/:path*', '/api/students/:path*'],
};
