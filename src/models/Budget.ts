import { pgTable, uuid, varchar, timestamp, jsonb, text, index } from 'drizzle-orm/pg-core';
import type { Category } from '@/types/category';

export const budget = pgTable(
  'budget',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user: varchar('user', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: false })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: false })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    name: varchar('name', { length: 255 }).notNull(),
    notes: text('notes'),
    spendPlan: jsonb('spend_plan').$type<Partial<Record<Category, number>>>(),
  },
  (table) => [index('budget_user_idx').on(table.user)],
);

export type Budget = typeof budget.$inferSelect;
export type NewBudget = typeof budget.$inferInsert;
