import LayoutHeader from '@/components/shared/LayoutHeader';
import {
  AverageOrderValueQuickStatsCard,
  PeriodSelector,
  RecentOrdersCard,
  SalesChartCard,
  TopSalesPieChartCard,
  TotalMenuItemSalesQuickStatsCard,
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
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
        className='gap-2'
      >
        <PeriodSelector />
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <TotalMenuItemSalesQuickStatsCard />
          <TotalMenuItemsQuickStatsCards />
          <TotalOrdersQuickStatsCard />
          <AverageOrderValueQuickStatsCard />
        </div>

        <div className='grid grid-cols-1 gap-4 xl:h-[600px] xl:grid-cols-3 xl:items-stretch'>
          <SalesChartCard />
          <TopSalesPieChartCard />

          <TotalOrdersCard />
          <RecentOrdersCard />

          <div className='hidden xl:block xl:h-1' />
        </div>
      </div>
    </>
  );
}

export default AnalyticsPage;
