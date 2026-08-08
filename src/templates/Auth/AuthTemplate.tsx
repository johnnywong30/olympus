import { useTranslations } from 'next-intl';
import { AppSidebar } from '@/components/app-sidebar';
import { DynamicBreadcrumbs } from '@/components/DynamicBreadcrumbs';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppConfig } from '@/utils/AppConfig';

export const AuthTemplate = (props: { children: React.ReactNode }) => {
  const t = useTranslations('AuthTemplate');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <DynamicBreadcrumbs />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{props.children}</main>
        <footer className="border-t border-gray-300 py-3 text-center text-sm">
          {t.rich('footer_text', {
            year: new Date().getFullYear(),
            name: AppConfig.name,
            author: () => (
              <a
                href="https://nextjs-boilerplate.com"
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                Next.js Boilerplate
              </a>
            ),
          })}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
};
