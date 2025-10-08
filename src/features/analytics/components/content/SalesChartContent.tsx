import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import { getPaidOrdersByRange } from '../../service/analytics-service';
import SalesChart from '../layout/SalesChart';

async function SalesChartContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = Number.parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getPaidOrdersByRange(startDate, endDate);

  const t = await getTranslations('analytics');

  if (error || !data)
    return (
      <div className='flex h-[300px] items-center justify-center'>
        <ErrorState message={t('errors.failedToLoad')} />
      </div>
    );

  const chartData = data.reduce(
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
  );

  return <SalesChart data={chartData} />;
}

export default SalesChartContent;
