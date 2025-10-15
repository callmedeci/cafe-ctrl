import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { subDays, formatISO } from 'date-fns';
import { getReportTableData } from '../../service/reports-service';
import ReportDataTable from '../layout/ReportDataTable';
import type { ReportType } from '../../lib/types';

async function ReportDataTableContent() {
  const params = searchParamsCache.all();
  const reportType = (params.type || 'sales') as ReportType;

  const fromDate =
    params.from || formatISO(subDays(new Date(), 30)).split('T')[0];
  const toDate = params.to || formatISO(new Date()).split('T')[0];

  const { data, error } = await getReportTableData(
    reportType,
    fromDate,
    toDate,
  );

  const t = await getTranslations('reports');

  if (error || !data) {
    return <ErrorState message={t('errors.failedToLoad')} />;
  }

  if (data.length === 0 || reportType !== 'menu-performance') {
    return (
      <div className='text-muted-foreground flex h-32 items-center justify-center text-sm'>
        {t('cards.table.noData')}
      </div>
    );
  }

  return <ReportDataTable data={data} />;
}

export default ReportDataTableContent;
