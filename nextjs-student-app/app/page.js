import Link from 'next/link';
import { getSession } from '@/lib/session';

export default async function Home() {
  const user = await getSession();
  return (
    <div className="card">
      <h1>ระบบจัดการข้อมูลนักศึกษา</h1>
      <p>โปรเจกต์ Next.js (App Router) ที่ประกอบด้วย 3 ระบบ:</p>
      <ol>
        <li><b>Authentication</b> – สมัครสมาชิก / เข้าสู่ระบบ / ออกจากระบบ (JWT + Cookie)</li>
        <li><b>Fetching Data</b> – ดึงข้อมูลแบบ Server และ Client</li>
        <li><b>CRUD</b> – เพิ่ม ดู แก้ไข ลบ ข้อมูลนักศึกษา</li>
      </ol>
      {user ? (
        <Link className="btn" href="/students">ไปที่หน้าจัดการนักศึกษา</Link>
      ) : (
        <Link className="btn" href="/login">เริ่มต้นใช้งาน</Link>
      )}
    </div>
  );
}
