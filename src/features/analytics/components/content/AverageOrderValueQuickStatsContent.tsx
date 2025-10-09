import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import ErrorState from '@/components/shared/ErrorState';
import { CardContent } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import {
  getOrdersCountByRange,
  getPaidOrdersByRange,
} from '../../service/analytics-service';

async function AverageOrderValueQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = Number.parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);
  const totalOrders = await getOrdersCountByRange(startDate, endDate);

  const t = await getTranslations('analytics');

  if (error || !data)
    return (
      <CardContent>
        <ErrorState message={t('errors.failedToLoad')} />
      </CardContent>
    );

  const totalSales = data.reduce((acc, order) => acc + order.total_price, 0);
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <CardContent>
      <div className='text-2xl font-bold'>
        <CurrencyDisplay amount={avgOrderValue} />
      </div>
    </CardContent>
  );
}

export default AverageOrderValueQuickStatsContent;
