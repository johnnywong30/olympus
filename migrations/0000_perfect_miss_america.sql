CREATE TYPE "public"."category" AS ENUM('RENT', 'MORTGAGE', 'LOAN', 'ENTERTAINMENT', 'DATE', 'TRAVEL', 'GROCERIES', 'UTILITIES', 'ELECTRIC', 'GAS', 'WATER', 'TRASH', 'SEWAGE', 'INTERNET', 'CAR_GAS', 'DINING', 'PERSONAL', 'SUBSCRIPTION', 'INSURANCE', 'AUTO_INSURANCE', 'PARKING', 'DONATION', 'SAVINGS', 'INVESTMENTS', 'HEALTHCARE', 'TECHNOLOGY', 'TAXES', 'MAINTENANCE', 'PET', 'REIMBURSEMENT', 'EDUCATION', 'CHILDCARE', 'MISCELLANEOUS');--> statement-breakpoint
CREATE TABLE "budget" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"notes" text,
	"spend_plan" jsonb
);
--> statement-breakpoint
CREATE TABLE "budget_shared" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"budget_id" uuid NOT NULL,
	"shared_with" varchar(255) NOT NULL,
	CONSTRAINT "budget_shared_budget_id_shared_with_unique" UNIQUE("budget_id","shared_with")
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"notes" text,
	"category" "category" NOT NULL,
	"budget_id" uuid,
	"source" varchar(255),
	"is_income" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget_shared" ADD CONSTRAINT "budget_shared_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE cascade ON UPDATE no action;