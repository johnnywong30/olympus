'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Category } from '@/types/category';
import { capitalizeFirstLetter } from '@/utils/Strings';

type CategoryComboboxProps = {
  value?: Category;
  onChange: (value: Category) => void;
  disabled?: boolean;
};

export function CategoryCombobox({ value, onChange, disabled = false }: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);

  const categories = Object.values(Category);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between"
          >
            {value ? capitalizeFirstLetter(value) : 'Select category'}

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-62.5 p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => {
                    onChange(category);
                    setOpen(false);
                  }}
                >
                  {capitalizeFirstLetter(category)}

                  <Check
                    className={cn(
                      'ml-auto size-4',
                      value === category ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
