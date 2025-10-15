'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseAsString, useQueryState } from 'nuqs';
import { useTranslations } from 'next-intl';

const REPORT_TYPES = ['sales', 'orders', 'menu-performance'] as const;

function ReportTypeSelector() {
  const t = useTranslations('reports');

  const [reportType, setReportType] = useQueryState(
    'type',
    parseAsString.withDefault('sales').withOptions({
      shallow: false,
    }),
  );

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium'>{t('filters.reportType')}</label>
      <Select onValueChange={setReportType} value={reportType}>
        <SelectTrigger>
          <SelectValue placeholder={t('filters.selectReportType')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {REPORT_TYPES.map((type) => (
              <SelectItem value={type} key={type}>
                {t(`reportTypes.${type}`)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ReportTypeSelector;
