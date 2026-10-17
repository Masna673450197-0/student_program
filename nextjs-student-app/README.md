# 🎓 Next.js Student App

โปรเจกต์ Next.js (App Router) ที่ประกอบด้วย 3 ระบบหลัก

| ระบบ | รายละเอียด |
|------|-----------|
| 🔐 **Authentication** | สมัครสมาชิก / เข้าสู่ระบบ / ออกจากระบบ ด้วย JWT เก็บใน HttpOnly Cookie, เข้ารหัสรหัสผ่านด้วย bcrypt, ป้องกันหน้าด้วย Middleware |
| 🌐 **Fetching Data** | ตัวอย่างการดึงข้อมูลแบบ Server Component (`async/await`) และ Client Component (`useEffect`) พร้อม loading / error state |
| 📋 **CRUD นักศึกษา** | เพิ่ม ดู แก้ไข ลบ ข้อมูลนักศึกษา พร้อมค้นหา และ REST API (`/api/students`) |

**เทคโนโลยี:** Next.js 14 (App Router) · React 18 · jose (JWT) · bcryptjs · เก็บข้อมูลเป็นไฟล์ JSON (ไม่ต้องติดตั้งฐานข้อมูล)

---

## 📦 วิธีการติดตั้ง

### สิ่งที่ต้องมี
- [Node.js](https://nodejs.org) เวอร์ชัน **18.17 ขึ้นไป** (ตรวจสอบด้วย `node -v`)
- npm (มาพร้อม Node.js)
- Git และ VS Code

### ขั้นตอน

```bash
# 1. โคลนโปรเจกต์ (เปลี่ยน URL เป็นของคุณ)
git clone https://github.com/<your-username>/nextjs-student-app.git
cd nextjs-student-app

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างไฟล์ environment
cp .env.example .env.local        # Windows (CMD): copy .env.example .env.local
```

เปิด `.env.local` แล้วแก้ค่า `JWT_SECRET` เป็นข้อความสุ่มยาว ๆ (อย่างน้อย 32 ตัวอักษร)

```env
JWT_SECRET=ใส่ข้อความสุ่มของคุณที่นี่
```

```bash
# 4. รันโหมดพัฒนา
npm run dev
```

เปิดเบราว์เซอร์ไปที่ **http://localhost:3000**

### คำสั่งอื่น ๆ

| คำสั่ง | ความหมาย |
|--------|----------|
| `npm run dev` | รันโหมดพัฒนา (hot reload) |
| `npm run build` | build สำหรับ production |
| `npm start` | รันเวอร์ชันที่ build แล้ว |

---

## 🚀 วิธีการใช้งาน

### 1) Authentication
1. ไปที่ **สมัครสมาชิก** (`/register`) กรอกชื่อ, username, รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
2. เมื่อสมัครสำเร็จ ระบบจะล็อกอินให้อัตโนมัติและพาไปหน้านักศึกษา
3. ครั้งต่อไปใช้ **เข้าสู่ระบบ** (`/login`)
4. กดปุ่ม **ออกจากระบบ** มุมขวาบนเพื่อ logout
5. หน้า `/students` และ `/fetch-demo` ต้องล็อกอินก่อน ถ้ายังไม่ล็อกอินจะถูกส่งไปหน้า login

### 2) Fetching Data (`/fetch-demo`)
- **Server-side:** ดึงรายชื่อผู้ใช้จาก `jsonplaceholder.typicode.com/users` ใน Server Component
- **Client-side:** ดึงโพสต์จาก `jsonplaceholder.typicode.com/posts` ด้วย `useEffect`
- *(ต้องต่ออินเทอร์เน็ตเพื่อดึง API ภายนอก)*

### 3) CRUD ข้อมูลนักศึกษา (`/students`)
| การทำงาน | วิธีใช้ |
|----------|--------|
| **Create** | กรอกฟอร์มด้านบน (รหัสนักศึกษา, ชื่อ, นามสกุล จำเป็น) แล้วกด "เพิ่มนักศึกษา" |
| **Read** | ดูรายชื่อในตาราง และใช้ช่องค้นหาด้านขวา |
| **Update** | กด "แก้ไข" ที่แถวนักศึกษา แก้ข้อมูลในฟอร์ม แล้วกด "บันทึกการแก้ไข" |
| **Delete** | กด "ลบ" แล้วยืนยัน |

---

## 🔌 API Endpoints

| Method | Endpoint | คำอธิบาย | ต้องล็อกอิน |
|--------|----------|----------|:-----------:|
| POST | `/api/auth/register` | สมัครสมาชิก `{name, username, password}` | ❌ |
| POST | `/api/auth/login` | เข้าสู่ระบบ `{username, password}` | ❌ |
| POST | `/api/auth/logout` | ออกจากระบบ | ❌ |
| GET | `/api/students` | ดึงนักศึกษาทั้งหมด | ✅ |
| POST | `/api/students` | เพิ่มนักศึกษา | ✅ |
| GET | `/api/students/:id` | ดึงนักศึกษา 1 คน | ✅ |
| PUT | `/api/students/:id` | แก้ไขข้อมูล | ✅ |
| DELETE | `/api/students/:id` | ลบนักศึกษา | ✅ |

ตัวอย่างข้อมูลนักศึกษา:
```json
{
  "studentId": "6501003",
  "firstName": "สมศรี",
  "lastName": "มีสุข",
  "major": "วิศวกรรมซอฟต์แวร์",
  "year": 1,
  "gpa": 3.5,
  "email": "somsri@example.com"
}
```

---

## 🗂 โครงสร้างโปรเจกต์

```
nextjs-student-app/
├── app/
│   ├── api/
│   │   ├── auth/{register,login,logout}/route.js   # Auth API
│   │   └── students/route.js, [id]/route.js         # CRUD API
│   ├── login/ register/                             # หน้า Auth
│   ├── students/page.js                             # หน้า CRUD
│   ├── fetch-demo/page.js                           # หน้า Fetching Data
│   ├── layout.js  page.js  globals.css
├── components/   # Navbar, AuthForm, LogoutButton, ClientPosts
├── lib/          # jwt.js, session.js, db.js
├── data/         # students.json, users.json (ฐานข้อมูลแบบไฟล์)
├── middleware.js # ป้องกันหน้า/API ที่ต้องล็อกอิน
├── .env.example
└── package.json
```

---

## 📝 หมายเหตุ

- ข้อมูลเก็บในโฟลเดอร์ `data/` เหมาะสำหรับการเรียน/พัฒนาในเครื่อง
  หากนำขึ้น Vercel ซึ่งเขียนไฟล์ไม่ได้ ควรเปลี่ยน `lib/db.js` ไปใช้ฐานข้อมูลจริง (เช่น MongoDB, PostgreSQL)
- ไฟล์ `.env.local` และ `data/users.json` ถูกใส่ใน `.gitignore` เพื่อไม่ให้ความลับและข้อมูลผู้ใช้ขึ้น GitHub
- ถ้า port 3000 ถูกใช้งาน รันด้วย `npm run dev -- -p 3001`

## 📤 อัปโหลดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js student app"
git branch -M main
git remote add origin https://github.com/<your-username>/nextjs-student-app.git
git push -u origin main
```
