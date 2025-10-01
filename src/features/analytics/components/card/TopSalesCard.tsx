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

async function TopSalesCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PieChartIcon className='h-5 w-5' />
          {t('charts.topSales.title')}
        </CardTitle>
        <CardDescription>
          {t('charts.topSales.description', { period })}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Suspense fallback={null}>
          <TopSalesContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default TopSalesCard;
