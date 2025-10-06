import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TotalOrdersQuickStatsContent from '../content/TotalOrdersQuickStatsContent';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';

async function TotalOrdersQuickStatsCard() {
  const t = await getTranslations('analytics');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          {t('stats.totalOrders.title')}
        </CardTitle>
        <ShoppingCart className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <Suspense fallback={<QuickStatsCardSkeleton />}>
        <TotalOrdersQuickStatsContent />
      </Suspense>
    </Card>
  );
}

export default TotalOrdersQuickStatsCard;
