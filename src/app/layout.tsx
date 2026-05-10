import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Market Sentinel',
  description:
    'High-beta tech risk dashboard. Track macro triggers, build composite signals, and monitor US Congressional trades.',
};

/**
 * RootLayout is a Server Component (no 'use client' directive).
 * It wraps the entire app with:
 *   - Font variables (applied to <html>)
 *   - Client-side providers (TanStack Query) via Providers wrapper
 *   - The fixed Header and Sidebar chrome
 *
 * The fixed header + sidebar layout is achieved with CSS positioning:
 *   Header: fixed top, full width
 *   Sidebar: fixed left, below header
 *   Main: margin-left = sidebar width, margin-top = header height
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full">
        <Providers>
          {/* Fixed top chrome */}
          <Header />

          {/* Fixed left navigation */}
          <Sidebar />

          {/* Page content — offset by header height and sidebar width */}
          <main
            className="min-h-full p-4"
            style={{
              marginTop: 'var(--spacing-header)',
              marginLeft: 'var(--spacing-sidebar)',
              backgroundColor: 'var(--color-terminal-black)',
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
