import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { CardContent, CardDescription } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import {
  getOrdersCountByRange,
  getPaidOrdersByRange,
} from '../../service/analytics-service';

async function AverageOrderValueQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);
  const totalOrders = await getOrdersCountByRange(startDate, endDate);

  // ---> MUST CHANGE <---
  if (error || !data) return <p>{error}!!!</p>;

  // const t = await getTranslations('analytics');

  const totalSales = data.reduce((acc, order) => acc + order.total_price, 0);
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <CardContent>
      <div className='text-2xl font-bold'>
        <CurrencyDisplay amount={avgOrderValue} />
      </div>
      <CardDescription className='flex items-center gap-1'>
        your average income on each order
      </CardDescription>
    </CardContent>
  );
}

export default AverageOrderValueQuickStatsContent;
