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

async function SalesChartCard() {
  const t = await getTranslations('analytics');
  const { period } = searchParamsCache.all();

  return (
    <Card className='lg:col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          {t('charts.monthlySales.title')}
        </CardTitle>
        <CardDescription>
          {t('charts.monthlySales.description', { period })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* ---> MUST CHANGE <--- */}
        <Suspense fallback={null}>
          <SalesChartContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default SalesChartCard;
