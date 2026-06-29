import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limiting bucket map.
// Mapped client IP -> Array of timestamps (ms) of recent requests.
// Kept in edge memory per-container. Stops aggressive scrape-loops.
const rateLimitMap = new Map<string, number[]>();

const LIMIT = 60; // Max 60 requests
const WINDOW_MS = 60 * 1000; // per 1 minute

const ALLOWED_ORIGINS = [
  'https://titanite.wo0.dev',
  'titanite-delta.vercel.app',
  'http://localhost:3001',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply security controls to /api/ endpoints
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 1. CORS Guard
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ error: 'CORS forbidden. Origin not allowed.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. IP-based Rate Limiter
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const now = Date.now();
  const requestTimestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps to only keep those within the current sliding window
  const recentTimestamps = requestTimestamps.filter((time) => now - time < WINDOW_MS);

  if (recentTimestamps.length >= LIMIT) {
    console.warn(`Rate limit exceeded for IP: ${ip} on path: ${pathname}`);
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Record this request and clean up old entries
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // Safe housekeeping: remove expired IPs from the map if it grows too large
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.filter((time) => now - time < WINDOW_MS).length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }

  // Add CORS headers to responses
  const response = NextResponse.next();
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
