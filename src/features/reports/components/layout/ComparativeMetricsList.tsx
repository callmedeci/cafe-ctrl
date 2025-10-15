'use client';

import { formatNumber } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { useLocale } from 'next-intl';
import type { ComparativeMetric } from '../../lib/types';

type ComparativeMetricsListProps = {
  metrics: ComparativeMetric[];
};

function ComparativeMetricsList({ metrics }: ComparativeMetricsListProps) {
  const locale = useLocale();

  const formatCurrency = (value: number) =>
    formatNumber({
      locale: 'en-US',
      number: value,
    });

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {metrics.map((metric, index) => {
        const isPositive = metric.change > 0;
        const isNegative = metric.change < 0;
        const isNeutral = metric.change === 0;

        return (
          <div
            key={index}
            className='flex flex-col gap-2 rounded-lg border p-4'
          >
            <div className='text-muted-foreground text-sm'>{metric.label}</div>
            <div className='text-2xl font-bold'>
              {metric.label.includes('Revenue') ||
              metric.label.includes('Value')
                ? formatCurrency(metric.current)
                : Math.round(metric.current)}
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-muted-foreground'>
                vs{' '}
                {metric.label.includes('Revenue') ||
                metric.label.includes('Value')
                  ? formatCurrency(metric.previous)
                  : Math.round(metric.previous)}
              </span>
              <span
                className={`flex items-center gap-1 ${
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
                {Math.abs(metric.changePercent).toFixed(1)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ComparativeMetricsList;
