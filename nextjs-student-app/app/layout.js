import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = { title: 'Student App', description: 'Next.js Auth + Fetch + CRUD' };

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
