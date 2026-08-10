'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { NavLinks } from '@/lib/navigation'; // adjust path
import { cn } from '@/lib/utils';
import { getBreadcrumbTrail } from '@/utils/Breadcrumbs';

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(NavLinks, pathname);

  if (trail.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <Fragment key={crumb.url}>
              <BreadcrumbItem className={cn('text-base', isLast ? undefined : 'hidden md:block')}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={crumb.url}
                    className="text-base text-primary hover:text-primary/80"
                  >
                    {crumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
