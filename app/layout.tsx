import './globals.css'
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Mr. Beatz Store',
  description: 'Buy beats instantly with license delivery.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
