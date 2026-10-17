import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

// READ (all)
export async function GET() {
  return NextResponse.json(await readData('students'));
}

// CREATE
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  if (!b.studentId || !b.firstName || !b.lastName)
    return NextResponse.json({ error: 'กรอกรหัสนักศึกษา ชื่อ และนามสกุล' }, { status: 400 });

  const students = await readData('students');
  if (students.some((s) => s.studentId === String(b.studentId).trim()))
    return NextResponse.json({ error: 'รหัสนักศึกษานี้มีอยู่แล้ว' }, { status: 409 });

  const student = {
    id: crypto.randomUUID(),
    studentId: String(b.studentId).trim(),
    firstName: String(b.firstName).trim(),
    lastName: String(b.lastName).trim(),
    major: b.major || '',
    year: Number(b.year) || 1,
    gpa: b.gpa === '' || b.gpa == null ? null : Number(b.gpa),
    email: b.email || '',
  };
  students.push(student);
  await writeData('students', students);
  return NextResponse.json(student, { status: 201 });
}
