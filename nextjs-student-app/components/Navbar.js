import Link from 'next/link';
import { getSession } from '@/lib/session';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const user = await getSession();
  return (
    <nav className="nav">
      <Link href="/" className="brand">🎓 Student App</Link>
      <div className="links">
        {user ? (
          <>
            <Link href="/students">นักศึกษา (CRUD)</Link>
            <Link href="/fetch-demo">Fetching Data</Link>
            <span className="muted">สวัสดี, {user.name}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">เข้าสู่ระบบ</Link>
            <Link href="/register">สมัครสมาชิก</Link>
          </>
        )}
      </div>
    </nav>
  );
}
