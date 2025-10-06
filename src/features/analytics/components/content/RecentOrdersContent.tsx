import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import RecentOrdersList from '../layout/RecentOrdersList';
import { subDays } from 'date-fns';
import { getRecentOrdersByDateRange } from '../../service/analytics-service';
import { getTranslations } from 'next-intl/server';

async function RecentOrdersContent() {
  const { period } = searchParamsCache.all();
  const selectedPeriod = Number.parseInt(period.replace('d', ''), 10);

  const startDate = subDays(new Date(), selectedPeriod).toISOString();
  const endDate = new Date().toISOString();

  const { data, error } = await getRecentOrdersByDateRange(startDate, endDate);

  const t = await getTranslations('analytics');

  if (error || !data)
    return (
      <div className='flex h-full items-center justify-center p-4'>
        <ErrorState message={t('errors.failedToLoad')} />
      </div>
    );

  return <RecentOrdersList orders={data} />;
}

export default RecentOrdersContent;
