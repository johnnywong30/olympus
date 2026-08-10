import { detectBot } from '@arcjet/next';
import { auth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';

// Stricter than the page middleware's bot rule: API routes have no reason
// to be crawled or previewed, so we don't allow search engine / preview bots here.
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: ['CATEGORY:MONITOR'], // allow uptime monitoring, block everything else
  }),
);

type RouteContext = { params?: Promise<Record<string, string>> };

type AuthedHandler = (
  request: NextRequest,
  ctx: RouteContext & { userId: string },
) => Promise<Response> | Response;

export function withApiAuth(handler: AuthedHandler) {
  return async (request: NextRequest, ctx: RouteContext = {}) => {
    if (process.env.ARCJET_KEY) {
      const decision = await aj.protect(request);

      if (decision.isDenied()) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return await handler(request, { ...ctx, userId });
  };
}
