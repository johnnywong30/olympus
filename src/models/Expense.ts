import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  text,
  numeric,
  index,
} from 'drizzle-orm/pg-core';
import { Category } from '@/types/category';
import { budget } from './Budget';

export const categoryEnum = pgEnum('category', Category);

export const expense = pgTable(
  'expense',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user: varchar('user', { length: 255 }).notNull(), // Clerk user id
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    notes: text('notes'),
    category: categoryEnum('category').notNull(),
    budgetId: uuid('budget_id').references(() => budget.id, {
      onDelete: 'cascade',
    }),
    source: varchar('source', { length: 255 }),
    isIncome: boolean('is_income').default(false).notNull(),
    expenseDate: timestamp('expense_date', { withTimezone: true }).notNull(),
  },
  (table) => [
    index('expense_user_idx').on(table.user),
    index('expense_budget_id_idx').on(table.budgetId),
  ],
);

export type Expense = typeof expense.$inferSelect;
export type NewExpense = typeof expense.$inferInsert;
