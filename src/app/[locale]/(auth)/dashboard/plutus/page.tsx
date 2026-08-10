import { auth } from '@clerk/nextjs/server';
import { setRequestLocale } from 'next-intl/server';
import { BudgetFilters } from '@/components/plutus/budgets/BudgetFilters';
import { BudgetsTable } from '@/components/plutus/budgets/BudgetsTable';
import { CreateBudgetSheet } from '@/components/plutus/budgets/CreateBudget/CreateBudgetSheet';
import { getSignInPath } from '@/libs/I18nNavigation';
import { getBudgetsForUser } from '@/services/BudgetService';
import { listBudgetsQuerySchema } from '@/validations/BudgetValidation';

const DEFAULT_LIMIT = 25;
const DEFAULT_OFFSET = 0;

export default async function PlutusPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ name?: string; offset?: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const parsedQuery = listBudgetsQuerySchema.safeParse(await props.searchParams);
  const filters = parsedQuery.success
    ? parsedQuery.data
    : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET };

  const { userId } = await auth.protect({ unauthenticatedUrl: getSignInPath(locale) });

  const { budgets, totalCount } = await getBudgetsForUser(userId, filters);

  console.log({ budgets });

  return (
    <div className="py-4 [&_p]:my-6">
      <BudgetFilters
        currentName={filters.name}
        currentOffset={filters.offset}
        limit={filters.limit}
      />

      <p>{totalCount} budget(s)</p>
      <BudgetsTable budgets={budgets} />
      <CreateBudgetSheet />
    </div>
  );
}
