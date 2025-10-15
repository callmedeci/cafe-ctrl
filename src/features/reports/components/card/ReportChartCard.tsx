import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ReportChartContent from '../content/ReportChartContent';
import { Skeleton } from '@/components/ui/skeleton';

async function ReportChartCard() {
  const t = await getTranslations('reports');

  return (
    <Card className='col-span-1 md:col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BarChart3 className='h-5 w-5' />
          {t('cards.chart.title')}
        </CardTitle>
        <CardDescription>{t('cards.chart.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className='h-64 w-full' />}>
          <ReportChartContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default ReportChartCard;
