import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  console.log('Sending Request...');
  // if (request.method === 'POST') {
  //   const ip = request.ip ?? '127.0.0.1';
  //   const { success, pending, limit, reset, remaining } =
  //     await rateLimit.limit(ip);

  //   if (!success) {
  //     const now = Date.now();
  //     const retryAfter = Math.floor((reset - now) / 1000);
  //     return new NextResponse('Too Many Requests', {
  //       status: 429,
  //       headers: {
  //         ['retry-after']: `${retryAfter}`,
  //       },
  //     });
  //   }
  // }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|login|auth/callback|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
