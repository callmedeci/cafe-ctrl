import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TotalMenuItemsQuickStatsContent from '../content/TotalMenuItemsQuickStatsContent';
import QuickStatsCardSkeleton from '../skeletons/QuickStatsCardSkeleton';

async function TotalMenuItemsQuickStatsCards() {
  const t = await getTranslations('analytics');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          {t('stats.menuItems.title')}
        </CardTitle>
        <Package className='text-muted-foreground h-4 w-4' />
      </CardHeader>

      <Suspense fallback={<QuickStatsCardSkeleton />}>
        <TotalMenuItemsQuickStatsContent />
      </Suspense>
    </Card>
  );
}

export default TotalMenuItemsQuickStatsCards;
