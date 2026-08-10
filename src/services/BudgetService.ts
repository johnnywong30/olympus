import { and, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { budget } from '@/models/Budget';
import { budgetShared } from '@/models/BudgetShared';
import type { ListBudgetsQuery, InsertBudgetInput } from '@/validations/BudgetValidation';

export async function getBudgetsForUser(userId: string, filters: ListBudgetsQuery) {
  const { name, limit, offset } = filters;

  const sharedBudgetIds = db
    .select({ budgetId: budgetShared.budgetId })
    .from(budgetShared)
    .where(eq(budgetShared.sharedWith, userId));

  const accessFilter = or(eq(budget.user, userId), inArray(budget.id, sharedBudgetIds));
  const whereClause = name ? and(accessFilter, ilike(budget.name, `%${name}%`)) : accessFilter;

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(budget)
      .where(whereClause)
      .orderBy(budget.createdAt)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(budget)
      .where(whereClause),
  ]);

  return {
    budgets: rows,
    totalCount: totalResult[0]?.count ?? 0,
  };
}

export async function addBudget(data: InsertBudgetInput) {
  const [insertedBudget] = await db.insert(budget).values(data).returning();

  return insertedBudget;
}
