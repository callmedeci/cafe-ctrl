import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { subDays, formatISO } from 'date-fns';
import { getReportChartData } from '../../service/reports-service';
import ReportChart from '../layout/ReportChart';
import type { ReportType } from '../../lib/types';

async function ReportChartContent() {
  const params = searchParamsCache.all();
  const reportType = (params.type || 'sales') as ReportType;

  const fromDate =
    params.from || formatISO(subDays(new Date(), 30)).split('T')[0];
  const toDate = params.to || formatISO(new Date()).split('T')[0];

  const { data, error } = await getReportChartData(
    reportType,
    fromDate,
    toDate,
  );

  const t = await getTranslations('reports');

  if (error || !data) {
    return <ErrorState message={t('errors.failedToLoad')} />;
  }

  if (data.length === 0) {
    return (
      <div className='text-muted-foreground flex h-64 items-center justify-center text-sm'>
        {t('cards.chart.noData')}
      </div>
    );
  }

  return <ReportChart data={data} reportType={reportType} />;
}

export default ReportChartContent;
