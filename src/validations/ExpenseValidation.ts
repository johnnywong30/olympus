import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { expense } from '@/models/Expense';
import { Category } from '@/types/category';

export const insertExpenseSchema = createInsertSchema(expense, {
  amount: z.coerce
    .number({ error: 'Amount must be a number' })
    .positive('Amount must be greater than 0'),
  category: z.enum(Category),
  notes: z.string().max(1000).optional().nullable(),
  source: z.string().max(255).optional().nullable(),
  expenseDate: z.coerce.date(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for reading rows back out (e.g. API responses)
export const selectExpenseSchema = createSelectSchema(expense);

/**
 * Schema for client-side forms, before userId is attached
 * server-side (e.g. from Clerk auth in an API route).
 */
export const expenseFormSchema = insertExpenseSchema.omit({ userId: true });

// Partial schema for PATCH/update endpoints
export const updateExpenseSchema = expenseFormSchema.partial();

export type InsertExpenseInput = z.infer<typeof insertExpenseSchema>;
export type ExpenseFormInput = z.infer<typeof expenseFormSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
