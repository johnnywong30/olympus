import { pgTable, uuid, varchar, unique } from 'drizzle-orm/pg-core';
import { budget } from './Budget';

export const budgetShared = pgTable(
  'budget_shared',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    budgetId: uuid('budget_id')
      .notNull()
      .references(() => budget.id, { onDelete: 'cascade' }),
    sharedWith: varchar('shared_with', { length: 255 }).notNull(), // Clerk user id
  },
  (table) => [
    unique('budget_shared_budget_id_shared_with_unique').on(table.budgetId, table.sharedWith),
  ],
);

export type BudgetShared = typeof budgetShared.$inferSelect;
export type NewBudgetShared = typeof budgetShared.$inferInsert;
