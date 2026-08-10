import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { ZodType } from 'zod';

type ParseResult<T> = { success: true; data: T } | { success: false; response: NextResponse };

export function parseQuery<T extends ZodType>(
  schema: T,
  request: NextRequest,
): ParseResult<z.infer<T>> {
  const raw = Object.fromEntries(request.nextUrl.searchParams.entries());
  const result = schema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Invalid query parameters', issues: z.treeifyError(result.error) },
        { status: 400 },
      ),
    };
  }

  return { success: true, data: result.data };
}

export async function parseBody<T extends ZodType>(
  schema: T,
  request: NextRequest,
): Promise<ParseResult<z.infer<T>>> {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return {
      success: false,
      response: NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }),
    };
  }

  const result = schema.safeParse(json);

  if (!result.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Invalid request body', issues: z.treeifyError(result.error) },
        { status: 400 },
      ),
    };
  }

  return { success: true, data: result.data };
}
