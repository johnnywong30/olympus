import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  text,
  numeric,
} from 'drizzle-orm/pg-core';
import { Category } from '@/types/category';
import { budget } from './Budget';

export const categoryEnum = pgEnum('category', Category);

export const expense = pgTable('expense', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(), // Clerk user id
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
});

export type Expense = typeof expense.$inferSelect;
export type NewExpense = typeof expense.$inferInsert;
