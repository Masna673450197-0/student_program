import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyToken } from './jwt';

// ใช้ใน Server Component / Route Handler เพื่ออ่านผู้ใช้ที่ล็อกอินอยู่
export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
