import { CardContent } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getOrdersCountByRange } from '../../service/analytics-service';

async function TotalOrdersQuickStatsContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const totalOrders = await getOrdersCountByRange(startDate, endDate);

  return (
    <CardContent>
      <div className='text-2xl font-bold'>{totalOrders}</div>
    </CardContent>
  );
}

export default TotalOrdersQuickStatsContent;
