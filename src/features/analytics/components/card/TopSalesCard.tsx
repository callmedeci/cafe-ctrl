import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { ChartPie as PieChartIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TopSalesContent from '../content/TopSalesContent';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

async function TopSalesCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

  return (
    <Card className='flex h-64 flex-col overflow-hidden 2xl:h-full'>
      <CardHeader className='flex-shrink-0'>
        <CardTitle className='flex items-center gap-2'>
          <PieChartIcon className='h-5 w-5' />
          {t('charts.topSales.title')}
        </CardTitle>
        <CardDescription>
          {t('charts.topSales.description', { period })}
        </CardDescription>
      </CardHeader>
      <CardContent className='min-h-0 flex-1 overflow-hidden'>
        <Suspense fallback={null}>
          <ScrollArea className='h-full'>
            <TopSalesContent />
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default TopSalesCard;
