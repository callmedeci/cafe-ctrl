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
import SalesChartContent from '../content/SalesChartContent';
import SalesChartSkeleton from '../skeletons/SalesChartSkeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

async function SalesChartCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

  return (
    <Card className='w-full 2xl:col-span-3'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          {t('charts.monthlySales.title')}
        </CardTitle>
        <CardDescription>
          {t('charts.monthlySales.description', { period })}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex w-full'>
        <Suspense fallback={<SalesChartSkeleton />}>
          <ScrollArea className='w-1 flex-1'>
            <SalesChartContent />
            <ScrollBar orientation='horizontal' className='w-full' />
          </ScrollArea>
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default SalesChartCard;
