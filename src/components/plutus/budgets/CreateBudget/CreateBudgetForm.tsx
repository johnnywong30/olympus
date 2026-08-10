'use client';

import { Button } from '@base-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { createBudget } from '@/app/actions/Budgets';
import { CategoryCombobox } from '@/components/plutus/budgets/CategoryCombobox';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { budgetFormSchema } from '@/validations/BudgetValidation';
import type { BudgetFormInput, BudgetFormOutput } from '@/validations/BudgetValidation';

type CreateBudgetFormProps = {
  onSuccess: () => void;
};

export function CreateBudgetForm({ onSuccess }: CreateBudgetFormProps) {
  const form = useForm<BudgetFormInput, unknown, BudgetFormOutput>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      name: '',
      notes: '',
      spendPlan: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'spendPlan',
  });

  async function onSubmit(data: BudgetFormInput) {
    try {
      await createBudget(data);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error(error);

      form.setError('root', {
        type: 'server',
        message: 'Failed to create budget.',
      });
    }
  }

  const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <form id="create-budget-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="new-budget-name">Budget Name</FieldLabel>
              <Input
                {...field}
                id="new-budget-name"
                aria-invalid={fieldState.invalid}
                placeholder={`${currentDate} Budget`}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="new-budget-notes">Notes</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="new-budget-notes"
                  placeholder="Add any notes about this budget."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value?.length ?? 0}/1000 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Add any relevant details about this budget.</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Spending Plan</h3>

            <p className="text-sm text-muted-foreground">
              Add the categories and amounts you plan to spend.
            </p>
          </div>

          <div className="space-y-3">
            {fields.map((f, idx) => (
              <div key={f.id} className="flex flex-col space-y-2">
                <div className="flex flex-row items-end gap-2">
                  <Controller
                    control={form.control}
                    name={`spendPlan.${idx}.category`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-1">
                        <FieldLabel>Category</FieldLabel>

                        <CategoryCombobox value={field.value} onChange={field.onChange} />

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name={`spendPlan.${idx}.amount`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-32">
                        <FieldLabel>Amount</FieldLabel>

                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={() => {
                      remove(idx);
                    }}
                    aria-label="Remove spending plan row"
                  >
                    <Trash2 className="hover:opacity-80" />
                  </Button>
                </div>
                {form.formState.errors.spendPlan?.[idx]?.message && (
                  <FieldError errors={[form.formState.errors.spendPlan[idx]]} />
                )}
              </div>
            ))}
          </div>

          <div className="my-4 flex flex-row items-center justify-between gap-2">
            <span className="text-muted-foreground">Add spending category</span>
            <Button
              type="button"
              onClick={() => {
                append({
                  category: undefined,
                  amount: 0,
                });
              }}
            >
              <Plus className="hover:opacity-80" />
            </Button>
          </div>
        </div>
      </FieldGroup>
    </form>
  );
}
