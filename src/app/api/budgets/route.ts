import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withApiAuth } from '@/libs/ApiAuth';
import { parseQuery, parseBody } from '@/libs/ApiValidation';
import { createBudget, getBudgetsForUser } from '@/services/BudgetService';
import { listBudgetsQuerySchema, insertBudgetSchema } from '@/validations/BudgetValidation';

export const GET = withApiAuth(async (request: NextRequest, { userId }) => {
  const parsed = parseQuery(listBudgetsQuerySchema, request);

  if (!parsed.success) {
    return parsed.response;
  }

  const { budgets, totalCount } = await getBudgetsForUser(userId, parsed.data);

  return NextResponse.json(budgets, {
    status: 200,
    headers: {
      'x-total-count': String(totalCount),
    },
  });
});

export const POST = withApiAuth(async (request: NextRequest, { userId }) => {
  const parsed = await parseBody(insertBudgetSchema, request);

  if (!parsed.success) {
    return parsed.response;
  }

  const body = parsed.data;

  const insertedBudget = await createBudget(userId, body);

  return NextResponse.json(insertedBudget, {
    status: 201,
  });
});
