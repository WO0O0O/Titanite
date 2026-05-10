import { redirect } from 'next/navigation';

/**
 * Root route redirects immediately to /dashboard.
 * This is a Server Component redirect — no client JS needed.
 */
export default function RootPage() {
  redirect('/dashboard');
}
