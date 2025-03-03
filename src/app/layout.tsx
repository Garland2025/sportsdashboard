import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Sports Dashboard',
  description: 'Real-time sports scores from around the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 