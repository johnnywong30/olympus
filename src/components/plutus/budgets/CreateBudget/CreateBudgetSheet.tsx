'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CreateBudgetForm } from './CreateBudgetForm';

export function CreateBudgetSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline">New Budget</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Budget</SheetTitle>
          <SheetDescription className="text-pretty">
            Create a new budget to add expenses and plan your spending.
          </SheetDescription>
        </SheetHeader>
        <div className="mx-6 my-2">
          <CreateBudgetForm
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </div>
        <SheetFooter>
          <Button type="submit" form="create-budget-form">
            Save budget
          </Button>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
