'use client';
import { useEffect, useState } from 'react';

const empty = { studentId: '', firstName: '', lastName: '', major: '', year: '1', gpa: '', email: '' };

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/students');
    if (res.status === 401) return (window.location.href = '/login');
    setStudents(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function reset() { setForm(empty); setEditingId(null); setError(''); }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch(editingId ? `/api/students/${editingId}` : '/api/students', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'เกิดข้อผิดพลาด');
    reset();
    load();
  }

  function onEdit(s) {
    setEditingId(s.id);
    setForm({ ...s, year: String(s.year), gpa: s.gpa ?? '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function onDelete(s) {
    if (!confirm(`ลบ ${s.firstName} ${s.lastName} ?`)) return;
    await fetch(`/api/students/${s.id}`, { method: 'DELETE' });
    load();
  }

  const filtered = students.filter((s) =>
    `${s.studentId} ${s.firstName} ${s.lastName} ${s.major}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="stack">
      <form className="card form grid" onSubmit={onSubmit}>
        <h2 className="full">{editingId ? 'แก้ไขข้อมูลนักศึกษา' : 'เพิ่มนักศึกษาใหม่'}</h2>
        <input name="studentId" placeholder="รหัสนักศึกษา *" value={form.studentId} onChange={set} required />
        <input name="email" type="email" placeholder="อีเมล" value={form.email} onChange={set} />
        <input name="firstName" placeholder="ชื่อ *" value={form.firstName} onChange={set} required />
        <input name="lastName" placeholder="นามสกุล *" value={form.lastName} onChange={set} required />
        <input name="major" placeholder="สาขาวิชา" value={form.major} onChange={set} />
        <div className="row">
          <select name="year" value={form.year} onChange={set}>
            {[1, 2, 3, 4, 5, 6].map((y) => <option key={y} value={y}>ชั้นปี {y}</option>)}
          </select>
          <input name="gpa" type="number" step="0.01" min="0" max="4" placeholder="GPA" value={form.gpa} onChange={set} />
        </div>
        {error && <p className="error full">{error}</p>}
        <div className="full row">
          <button className="btn">{editingId ? 'บันทึกการแก้ไข' : 'เพิ่มนักศึกษา'}</button>
          {editingId && <button type="button" className="btn ghost" onClick={reset}>ยกเลิก</button>}
        </div>
      </form>

      <div className="card">
        <div className="row between">
          <h2>รายชื่อนักศึกษา ({filtered.length})</h2>
          <input placeholder="ค้นหา..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {loading ? <p className="muted">กำลังโหลด...</p> : (
          <div className="scroll">
            <table>
              <thead>
                <tr><th>รหัส</th><th>ชื่อ-นามสกุล</th><th>สาขา</th><th>ปี</th><th>GPA</th><th>อีเมล</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>{s.studentId}</td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>{s.major}</td>
                    <td>{s.year}</td>
                    <td>{s.gpa ?? '-'}</td>
                    <td>{s.email}</td>
                    <td className="actions">
                      <button className="btn small" onClick={() => onEdit(s)}>แก้ไข</button>
                      <button className="btn small danger" onClick={() => onDelete(s)}>ลบ</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="7" className="muted">ไม่พบข้อมูล</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
