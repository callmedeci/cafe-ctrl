import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ComparativeMetricsContent from '../content/ComparativeMetricsContent';

async function ComparativeMetricsCard() {
  const t = await getTranslations('reports');
  // const { type } = searchParamsCache.all();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          {t('cards.metrics.title')}
        </CardTitle>
        <CardDescription>{t('cards.metrics.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className='h-32 w-full' />}>
          <ComparativeMetricsContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default ComparativeMetricsCard;
