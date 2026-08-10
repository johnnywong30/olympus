import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { budget } from '@/models/Budget';
import { Category } from '@/types/category';

/**
 * spendPlan is a jsonb column typed as Record<string, number> at the
 * Drizzle level, but that gives no runtime guarantees about the keys
 * or values. This schema enforces that keys are valid Category values
 * and amounts are non-negative numbers.
 */
const spendPlanSchema = z
  .partialRecord(z.enum(Category), z.number().nonnegative('Planned amount cannot be negative'))
  .optional()
  .nullable();

const spendPlanRowSchema = z.object({
  category: z.enum(Category).optional(),
  amount: z.number().nonnegative('Amount cannot be negative'),
});

export const insertBudgetSchema = createInsertSchema(budget, {
  name: z.string().trim().min(1, 'Name is required').max(255),
  notes: z.string().max(1000).optional(),
  spendPlan: spendPlanSchema,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for reading rows back out
export const selectBudgetSchema = createSelectSchema(budget);

/**
 * Schema for client-side forms, before `user` is attached
 * server-side (e.g. from Clerk auth in an API route).
 */
export const budgetFormSchema = insertBudgetSchema
  .omit({
    user: true,
    spendPlan: true,
  })
  .extend({
    spendPlan: z
      .array(spendPlanRowSchema)
      .superRefine((rows, ctx) => {
        const seen = new Set<Category>();

        for (const [index, row] of rows.entries()) {
          if (row.category === undefined) {
            continue;
          }

          if (seen.has(row.category)) {
            ctx.addIssue({
              code: 'custom',
              path: [index],
              message: 'This category has already been added.',
            });
            continue;
          }

          seen.add(row.category);
        }
      })
      .default([])
      .optional(),
  });

// Partial schema for PATCH/update endpoints
export const updateBudgetSchema = budgetFormSchema.partial();

export type InsertBudgetInput = z.infer<typeof insertBudgetSchema>;
export type BudgetFormInput = z.infer<typeof budgetFormSchema>;
export type BudgetFormOutput = z.output<typeof budgetFormSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;

export const listBudgetsQuerySchema = z.object({
  name: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  offset: z.coerce.number().int().nonnegative().optional().default(0),
});

export type ListBudgetsQuery = z.infer<typeof listBudgetsQuerySchema>;
