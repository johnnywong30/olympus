import { pgTable, uuid, varchar, timestamp, jsonb, text } from 'drizzle-orm/pg-core';

export const budget = pgTable('budget', {
  id: uuid('id').defaultRandom().primaryKey(),
  user: varchar('user', { length: 255 }).notNull(), // Clerk user id
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: false })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  name: varchar('name', { length: 255 }).notNull(),
  text: text('notes'),
  // JSON map of category -> planned amount, e.g. { "food": 400, "rent": 1500 }
  spendPlan: jsonb('spend_plan').$type<Record<string, number>>(),
});

export type Budget = typeof budget.$inferSelect;
export type NewBudget = typeof budget.$inferInsert;
