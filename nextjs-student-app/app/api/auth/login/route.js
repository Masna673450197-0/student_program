import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { readData } from '@/lib/db';
import { signToken, COOKIE_NAME, cookieOptions } from '@/lib/jwt';

export async function POST(req) {
  const { username, password } = await req.json().catch(() => ({}));
  const users = await readData('users');
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password || '', user.passwordHash)))
    return NextResponse.json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });

  const token = await signToken({ id: user.id, name: user.name, username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, cookieOptions);
  return res;
}
