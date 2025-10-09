import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TotalOrdersContent from '../content/TotalOrdersContent';
import TotalOrdersChartSkeleton from '../skeletons/TotalOrdersChartSkeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

async function TotalOrdersCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();
  const periodText = t(`periods.${period}`);

  return (
    <Card className='2xl:col-span-3'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              {t('charts.totalOrders.title')}
            </CardTitle>
            <CardDescription>
              {t('charts.totalOrders.description', { period: periodText })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex w-full'>
        <Suspense fallback={<TotalOrdersChartSkeleton />}>
          <ScrollArea className='w-1 flex-1'>
            <TotalOrdersContent />
            <ScrollBar orientation='horizontal' className='w-full' />
          </ScrollArea>
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default TotalOrdersCard;
