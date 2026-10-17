import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

const notFound = () => NextResponse.json({ error: 'ไม่พบข้อมูลนักศึกษา' }, { status: 404 });

// READ (one)
export async function GET(_req, { params }) {
  const s = (await readData('students')).find((x) => x.id === params.id);
  return s ? NextResponse.json(s) : notFound();
}

// UPDATE
export async function PUT(req, { params }) {
  const b = await req.json().catch(() => ({}));
  const students = await readData('students');
  const i = students.findIndex((x) => x.id === params.id);
  if (i === -1) return notFound();

  if (!b.studentId || !b.firstName || !b.lastName)
    return NextResponse.json({ error: 'กรอกรหัสนักศึกษา ชื่อ และนามสกุล' }, { status: 400 });
  const sid = String(b.studentId).trim();
  if (students.some((s) => s.studentId === sid && s.id !== params.id))
    return NextResponse.json({ error: 'รหัสนักศึกษานี้มีอยู่แล้ว' }, { status: 409 });

  students[i] = {
    ...students[i],
    studentId: sid,
    firstName: String(b.firstName).trim(),
    lastName: String(b.lastName).trim(),
    major: b.major || '',
    year: Number(b.year) || 1,
    gpa: b.gpa === '' || b.gpa == null ? null : Number(b.gpa),
    email: b.email || '',
  };
  await writeData('students', students);
  return NextResponse.json(students[i]);
}

// DELETE
export async function DELETE(_req, { params }) {
  const students = await readData('students');
  const next = students.filter((x) => x.id !== params.id);
  if (next.length === students.length) return notFound();
  await writeData('students', next);
  return NextResponse.json({ ok: true });
}
