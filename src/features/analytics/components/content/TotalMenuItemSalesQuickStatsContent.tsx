import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import ErrorState from '@/components/shared/ErrorState';
import { CardContent, CardDescription } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import { getPaidOrdersByRange } from '../../service/analytics-service';

async function TotalMenuItemSalesQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = Number.parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);

  const t = await getTranslations('analytics');

  if (error || !data)
    return (
      <CardContent>
        <ErrorState message={t('errors.failedToLoad')} />
      </CardContent>
    );

  const totalSale = data.reduce((acc, order) => (acc += order.total_price), 0);

  return (
    <CardContent>
      <div className='text-2xl font-bold'>
        <CurrencyDisplay amount={totalSale} />
      </div>
      <CardDescription className='flex items-center gap-1'>
        {t('stats.totalRevenue.description', { period })}
      </CardDescription>
    </CardContent>
  );
}

export default TotalMenuItemSalesQuickStatsContent;
