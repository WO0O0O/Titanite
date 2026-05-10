'use client';

/**
 * Providers wraps the entire app with client-side context providers.
 * Must be 'use client' because React context (TanStack Query) requires
 * client-side rendering. Keeping this as a thin wrapper so the root
 * layout.tsx can remain a Server Component.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient per-component instance to prevent shared state
  // between requests in server environments (Next.js best practice).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Prototype phase: fetch once on mount, no background refetching.
            // In Phase 5 this becomes a configurable polling interval.
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
