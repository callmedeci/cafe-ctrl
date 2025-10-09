import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import TotalSalesContent from '../content/TotalMenuItemSalesQuickStatsContent';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';
import { searchParamsCache } from '@/lib/utils';

async function TotalMenuItemSalesQuickStatsCard() {
  const t = await getTranslations('analytics.stats');
  const { period } = searchParamsCache.all();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          {t('totalSales.title')}
        </CardTitle>
        <DollarSign className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <Suspense fallback={<QuickStatsCardSkeleton />}>
        <TotalSalesContent />
      </Suspense>

      <CardFooter>
        <CardDescription className='flex items-center gap-1'>
          {t('totalRevenue.description', { period })}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default TotalMenuItemSalesQuickStatsCard;
