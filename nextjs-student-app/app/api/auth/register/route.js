import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { readData, writeData } from '@/lib/db';
import { signToken, COOKIE_NAME, cookieOptions } from '@/lib/jwt';

export async function POST(req) {
  const { name, username, password } = await req.json().catch(() => ({}));
  if (!name || !username || !password)
    return NextResponse.json({ error: 'กรอกข้อมูลให้ครบ' }, { status: 400 });
  if (password.length < 6)
    return NextResponse.json({ error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }, { status: 400 });

  const users = await readData('users');
  if (users.some((u) => u.username === username))
    return NextResponse.json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' }, { status: 409 });

  const user = {
    id: crypto.randomUUID(),
    name,
    username,
    passwordHash: await bcrypt.hash(password, 10),
  };
  users.push(user);
  await writeData('users', users);

  const token = await signToken({ id: user.id, name, username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, cookieOptions);
  return res;
}
