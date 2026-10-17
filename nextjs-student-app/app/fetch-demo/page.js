import ClientPosts from '@/components/ClientPosts';

// Server Component: ดึงข้อมูลบนเซิร์ฟเวอร์ด้วย async/await
export default async function FetchDemo() {
  let users = [];
  let error = '';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
    users = await res.json();
  } catch (e) {
    error = e.message;
  }

  return (
    <div className="stack">
      <div className="card">
        <h2>1) Server-side Fetching</h2>
        <p className="muted">ดึงใน Server Component (async/await) จาก jsonplaceholder.typicode.com/users</p>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <table>
            <thead><tr><th>ชื่อ</th><th>อีเมล</th><th>เมือง</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address.city}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="card">
        <h2>2) Client-side Fetching</h2>
        <p className="muted">ดึงใน Client Component (useEffect) จาก jsonplaceholder.typicode.com/posts</p>
        <ClientPosts />
      </div>
    </div>
  );
}
