import { getDateLibPromise, searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getLocale } from 'next-intl/server';
import SalesChart from '../layout/SalesChart';
import { getPaidOrdersByRange } from '../../service/analytics-service';

async function SalesChartContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);

  // ---> MUST CHANGE <---
  if (error || !data) return null;

  const locale = await getLocale();
  const dateForamt = await getDateLibPromise(locale);

  const chartData = data
    .reduce(
      (newOrder, order) => {
        const formatedDate = order.created_at.split('T')[0];
        const index = newOrder.findIndex((od) => od.date === formatedDate);

        if (index === -1)
          newOrder.push({ date: formatedDate, sales: order.total_price });
        else newOrder[index]['sales'] += order.total_price;

        return newOrder;
      },
      [] as {
        date: string;
        sales: number;
      }[],
    )
    .map((order) => ({
      ...order,
      date: dateForamt.format(order.date, 'MMM dd'),
    }));

  return <SalesChart data={chartData} />;
}

export default SalesChartContent;
