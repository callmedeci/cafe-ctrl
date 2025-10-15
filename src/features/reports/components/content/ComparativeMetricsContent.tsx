import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { subDays, formatISO } from 'date-fns';
import { getComparativeMetrics } from '../../service/reports-service';
import ComparativeMetricsList from '../layout/ComparativeMetricsList';
import type { ReportType } from '../../lib/types';

async function ComparativeMetricsContent() {
  const params = searchParamsCache.all();
  const reportType = (params.type || 'sales') as ReportType;

  const fromDate =
    params.from || formatISO(subDays(new Date(), 30)).split('T')[0];
  const toDate = params.to || formatISO(new Date()).split('T')[0];

  const { data, error } = await getComparativeMetrics(
    reportType,
    fromDate,
    toDate,
  );

  const t = await getTranslations('reports');

  if (error || !data) {
    return <ErrorState message={t('errors.failedToLoad')} />;
  }

  return <ComparativeMetricsList metrics={data} />;
}

export default ComparativeMetricsContent;
