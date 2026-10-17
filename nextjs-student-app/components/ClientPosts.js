'use client';
import { useEffect, useState } from 'react';

// ตัวอย่าง Client-side fetching ด้วย useEffect (มี loading / error state)
export default function ClientPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((r) => {
        if (!r.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
        return r.json();
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">กำลังโหลด...</p>;
  if (error) return <p className="error">{error}</p>;
  return (
    <ul className="list">
      {posts.map((p) => (
        <li key={p.id}><b>{p.title}</b></li>
      ))}
    </ul>
  );
}
