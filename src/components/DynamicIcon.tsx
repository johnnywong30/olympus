'use client';

import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons];
  if (!Icon) {
    return null;
  }
  return <Icon {...props} />;
}
