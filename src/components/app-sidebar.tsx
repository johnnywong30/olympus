import { ZapIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { ModeToggle } from '@/components/ui/mode-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { NavLinks } from '@/lib/navigation';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = await useAuth();

  if (!auth) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <Link
            href="/dashboard/"
            className="text-sidebar-primary hover:border-0 hover:text-sidebar-primary/80"
          >
            <SidebarMenuItem className="flex flex-row gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <ZapIcon />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-lg font-semibold">Olympus</span>
                <span className="truncate text-sm">Manage your personal toolkit</span>
              </div>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth?.navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
