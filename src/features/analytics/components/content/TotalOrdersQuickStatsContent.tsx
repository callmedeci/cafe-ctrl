import { CardContent, CardDescription } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import { getOrdersCountByRange } from '../../service/analytics-service';

async function TotalOrdersQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const totalOrders = await getOrdersCountByRange(startDate, endDate);
  const t = await getTranslations('analytics');

  return (
    <CardContent>
      <div className='text-2xl font-bold'>{totalOrders}</div>
      <CardDescription className='flex items-center gap-1'>
        {t('stats.totalOrders.description', { period })}
      </CardDescription>
    </CardContent>
  );
}

export default TotalOrdersQuickStatsContent;
