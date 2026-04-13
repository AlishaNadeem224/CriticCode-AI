import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CriticCode AI - AI Code Reviewer',
  description: 'AI-Powered Code Review Assistant | Built with Next.js + FastAPI + Groq',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
