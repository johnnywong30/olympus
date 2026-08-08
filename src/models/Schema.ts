import { budget } from './Budget';
import { budgetShared } from './BudgetShared';
import { expense } from './Expense';
import { budgetRelations, expenseRelations, budgetSharedRelations } from './Relations';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// It automatically run the command `db-server:file`, which apply the migration before Next.js starts in development mode,
// Alternatively, if your database is running, you can run `npm run db:migrate` and there is no need to restart the server.

// Need a database for production? Check out https://get.neon.com/BMFYNtx
// Tested and compatible with Next.js Boilerplate

export const Schema = {
  budget,
  budgetShared,
  expense,
  budgetRelations,
  expenseRelations,
  budgetSharedRelations,
};
