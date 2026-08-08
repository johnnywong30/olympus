// utils/breadcrumbs.ts
import type { NavLink } from '@/lib/navigation'; // adjust path

export type BreadcrumbEntry = {
  title: string;
  url: string;
};

export function getBreadcrumbTrail(links: NavLink[], pathname: string): BreadcrumbEntry[] {
  for (const link of links) {
    if (link.url === pathname) {
      return [{ title: link.title, url: link.url }];
    }

    if (link.items?.length) {
      const childTrail = getBreadcrumbTrail(link.items, pathname);
      if (childTrail.length > 0) {
        return [{ title: link.title, url: link.url }, ...childTrail];
      }
    }
  }

  return [];
}
