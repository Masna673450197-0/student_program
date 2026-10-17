'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const router = useRouter();
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || 'เกิดข้อผิดพลาด');
    router.push('/students');
    router.refresh();
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <form className="card form" onSubmit={onSubmit}>
      <h2>{isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</h2>
      {isRegister && (
        <input placeholder="ชื่อ-นามสกุล" value={form.name} onChange={set('name')} required />
      )}
      <input placeholder="ชื่อผู้ใช้ (username)" value={form.username} onChange={set('username')} required />
      <input type="password" placeholder="รหัสผ่าน" value={form.password} onChange={set('password')} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>
        {loading ? 'กำลังดำเนินการ...' : isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  );
}
