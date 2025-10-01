import ReactQueryProvider from '@/components/providers/ReactQueryClientProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/features/dashboard';

function Dashboardlayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <section className='flex h-dvh w-full flex-col'>
        <main className='bg-background h-dvh flex-1'>
          <ScrollArea className='h-full flex-1'>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ScrollArea>
        </main>
      </section>
    </SidebarProvider>
  );
}

export default Dashboardlayout;
