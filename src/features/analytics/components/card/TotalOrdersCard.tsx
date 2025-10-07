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

async function TotalOrdersCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

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
              {t('charts.totalOrders.description', { period })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<TotalOrdersChartSkeleton />}>
          <TotalOrdersContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default TotalOrdersCard;
