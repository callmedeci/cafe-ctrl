import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import TotalSalesContent from '../content/TotalMenuItemSalesQuickStatsContent';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';

async function TotalMenuItemSalesQuickStatsCard() {
  const t = await getTranslations('analytics.stats.totalSales');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{t('title')}</CardTitle>
        <DollarSign className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <Suspense fallback={<QuickStatsCardSkeleton />}>
        <TotalSalesContent />
      </Suspense>
    </Card>
  );
}

export default TotalMenuItemSalesQuickStatsCard;
