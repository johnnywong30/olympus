ALTER TABLE "expense" RENAME COLUMN "user_id" TO "user";--> statement-breakpoint
CREATE INDEX "budget_user_idx" ON "budget" USING btree ("user");--> statement-breakpoint
CREATE INDEX "budget_shared_budget_id_idx" ON "budget_shared" USING btree ("budget_id");--> statement-breakpoint
CREATE INDEX "budget_shared_shared_with_idx" ON "budget_shared" USING btree ("shared_with");--> statement-breakpoint
CREATE INDEX "expense_user_idx" ON "expense" USING btree ("user");--> statement-breakpoint
CREATE INDEX "expense_budget_id_idx" ON "expense" USING btree ("budget_id");