import { searchParamsCache } from '@/lib/utils';
import { getPaidOrdersByRange } from '../../service/analytics-service';
import { subDays } from 'date-fns';
import { CardContent, CardDescription } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';

async function TotalMenuItemSalesQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);

  // ---> MUST CHANGE <---
  if (error || !data) return <p>{error} !!!!</p>;

  const t = await getTranslations('analytics');
  const totalSale = data.reduce((acc, order) => (acc += order.total_price), 0);

  return (
    <CardContent>
      <div className='text-2xl font-bold'>
        <CurrencyDisplay amount={totalSale} />
      </div>
      <CardDescription className='flex items-center gap-1'>
        {t('stats.menuItems.description')}
      </CardDescription>
    </CardContent>
  );
}

export default TotalMenuItemSalesQuickStatsContent;
