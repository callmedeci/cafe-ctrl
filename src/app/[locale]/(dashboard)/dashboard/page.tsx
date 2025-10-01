import LayoutHeader from '@/components/shared/LayoutHeader';
import {
  PeriodSelector,
  RecentOrdersCard,
  SalesChartCard,
  TopSalesPieChartCard,
  TotalMenuItemsQuickStatsCards,
  TotalOrdersCard,
  TotalOrdersQuickStatsCard,
} from '@/features/analytics';
import { searchParamsCache } from '@/lib/utils';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('analytics');
  return {
    title: t('page.title'),
    description: t('page.description'),
  };
}

async function AnalyticsPage({
  searchParams,
}: PageProps<'/[locale]/dashboard'>) {
  const t = await getTranslations('analytics');
  const params = await searchParams;
  searchParamsCache.parse(params);

  return (
    <>
      <LayoutHeader title={t('page.title')} description={t('page.description')}>
        <PeriodSelector />
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <TotalOrdersQuickStatsCard />
          <TotalMenuItemsQuickStatsCards />
          {/* <QuickStatsCards data={mockData.stats} period={periodLabel} /> */}
        </div>

        <div className='grid grid-cols-1 gap-4 2xl:grid-cols-3'>
          <SalesChartCard />
          <TopSalesPieChartCard />
        </div>

        <div className='grid max-h-[calc(100vh-27rem)] grid-cols-1 gap-4 xl:grid-cols-3'>
          <TotalOrdersCard />
          <RecentOrdersCard />
        </div>
      </div>
    </>
  );
}

export default AnalyticsPage;
