import { searchParamsCache } from '@/lib/utils';
import RecentOrdersList from '../layout/RecentOrdersList';
import { subDays } from 'date-fns';
import { getRecentOrdersByDateRange } from '../../service/analytics-service';

async function RecentOrdersContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = period.split('d')[0];

  const startDate = subDays(new Date(), +selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getRecentOrdersByDateRange(startDate, endDate);

  // ---> MUST CHANGE <---
  if (error || !data) return null;

  return <RecentOrdersList orders={data} />;
}

export default RecentOrdersContent;
