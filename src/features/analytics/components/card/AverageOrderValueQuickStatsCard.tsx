import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent } from 'lucide-react';
import { Suspense } from 'react';
import AverageOrderValueQuickStatsContent from '../content/AverageOrderValueQuickStatsContent';
import { getTranslations } from 'next-intl/server';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';

async function AverageOrderValueQuickStatsCard() {
  const t = await getTranslations('analytics');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          {t('stats.averageOrder.title')}
        </CardTitle>
        <Percent className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <Suspense fallback={<QuickStatsCardSkeleton />}>
        <AverageOrderValueQuickStatsContent />
      </Suspense>
    </Card>
  );
}

export default AverageOrderValueQuickStatsCard;
