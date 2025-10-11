import { ReactQueryProvider } from '@/components/providers/ReactQueryClientProvider';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/features/dashboard';

function Dashboardlayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <section className='flex h-dvh w-full flex-col'>
        <main className='bg-background h-dvh w-full flex-1'>
          <ScrollArea type='always' className='h-full'>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <ScrollBar orientation='vertical' className='h-full' />
          </ScrollArea>
        </main>
      </section>
    </SidebarProvider>
  );
}

export default Dashboardlayout;
