import { relations } from 'drizzle-orm';
import { budget } from './Budget';
import { budgetShared } from './BudgetShared';
import { expense } from './Expense';

export const budgetRelations = relations(budget, ({ many }) => ({
  expenses: many(expense),
  sharedWith: many(budgetShared),
}));

export const expenseRelations = relations(expense, ({ one }) => ({
  budget: one(budget, {
    fields: [expense.budgetId],
    references: [budget.id],
  }),
}));

export const budgetSharedRelations = relations(budgetShared, ({ one }) => ({
  budget: one(budget, {
    fields: [budgetShared.budgetId],
    references: [budget.id],
  }),
}));
