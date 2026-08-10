'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type BudgetFiltersProps = {
  currentName?: string;
  currentOffset: number;
  limit: number;
};

export function BudgetFilters({ currentName, currentOffset, limit }: BudgetFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(currentName ?? '');
  // useTransition marks the URL update as non-blocking, so typing/clicking
  // stays responsive while the server re-renders with new data.
  const [isPending, startTransition] = useTransition();

  function pushParams(next: { name?: string; offset?: number }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.name) {
      params.set('name', next.name);
    } else {
      params.delete('name');
    }

    params.set('offset', String(next.offset ?? 0));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className={isPending ? 'opacity-60' : undefined}>
      <input
        value={name}
        onChange={(e) => {
          const { value } = e.target;
          setName(value);
          // Resets to offset 0 on a new search — otherwise you could land
          // on page 3 of a filter that only has 1 page of results.
          pushParams({ name: value, offset: 0 });
        }}
        placeholder="Search budgets..."
      />

      <div>
        <button
          type="button"
          disabled={currentOffset === 0}
          onClick={() => {
            pushParams({ name, offset: Math.max(0, currentOffset - limit) });
          }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            pushParams({ name, offset: currentOffset + limit });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
