'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReportTableRow } from '../../lib/types';

type ReportDataTableProps = {
  data: ReportTableRow[];
};

function ReportDataTable({ data }: ReportDataTableProps) {
  const t = useTranslations('reports');

  const formatCurrency = (value: number) =>
    formatNumber({
      locale: 'en-US',
      number: value,
    });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.headers.item')}</TableHead>
            <TableHead className='text-right'>
              {t('table.headers.current')}
            </TableHead>
            <TableHead className='text-right'>
              {t('table.headers.previous')}
            </TableHead>
            <TableHead className='text-right'>
              {t('table.headers.change')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            const isPositive = row.change > 0;
            const isNegative = row.change < 0;
            const isNeutral = row.change === 0;

            return (
              <TableRow key={row.id}>
                <TableCell className='font-medium'>{row.name}</TableCell>
                <TableCell className='text-right'>
                  {formatCurrency(row.current)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatCurrency(row.previous)}
                </TableCell>
                <TableCell className='text-right'>
                  <span
                    className={`flex items-center justify-end gap-1 ${
                      isPositive
                        ? 'text-green-600'
                        : isNegative
                          ? 'text-red-600'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {isPositive && <ArrowUp className='h-3 w-3' />}
                    {isNegative && <ArrowDown className='h-3 w-3' />}
                    {isNeutral && <Minus className='h-3 w-3' />}
                    {Math.abs(row.changePercent).toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReportDataTable;
