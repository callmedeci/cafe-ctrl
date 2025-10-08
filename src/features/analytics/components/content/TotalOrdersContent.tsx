import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import { getOrdersDateByRange } from '../../service/analytics-service';
import TotalOrdersChart from '../layout/TotalOrdersChart';

async function TotalOrdersContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = Number.parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getOrdersDateByRange(startDate, endDate);

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

      if (index === -1) newOrder.push({ date: formatedDate, orders: 1 });
      else newOrder[index]['orders']++;

      return newOrder;
    },
    [] as {
      date: string;
      orders: number;
    }[],
  );

  return <TotalOrdersChart data={chartData} />;
}

export default TotalOrdersContent;
