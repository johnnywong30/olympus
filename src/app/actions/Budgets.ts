'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { addBudget } from '@/services/BudgetService';
import { budgetFormSchema } from '@/validations/BudgetValidation';
import type { BudgetFormInput } from '@/validations/BudgetValidation';

export async function createBudget(data: BudgetFormInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const validated = budgetFormSchema.parse(data);

  const spendPlan =
    validated.spendPlan && validated.spendPlan.length > 0
      ? Object.fromEntries(
          validated.spendPlan
            .filter((row) => row.category !== undefined)
            .map((row) => [row.category, row.amount]),
        )
      : {};

  const newBudget = await addBudget({
    user: userId,
    name: validated.name,
    notes: validated.notes,
    spendPlan,
  });

  revalidatePath('/dashboard/plutus');

  return newBudget;
}
