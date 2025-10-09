import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Percent } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import AverageOrderValueQuickStatsContent from '../content/AverageOrderValueQuickStatsContent';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';
import { searchParamsCache } from '@/lib/utils';

async function AverageOrderValueQuickStatsCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();
  const periodText = t(`periods.${period}`);

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

      <CardFooter>
        <CardDescription className='flex items-center gap-1'>
          {t('stats.averageOrder.description', { period: periodText })}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default AverageOrderValueQuickStatsCard;
