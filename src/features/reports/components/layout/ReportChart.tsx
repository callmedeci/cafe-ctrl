'use client';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatNumber, getDateLibPromise } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import {
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend,
} from 'recharts';
import type { ReportChartData, ReportType } from '../../lib/types';

type ReportChartProps = {
  data: ReportChartData[];
  reportType: ReportType;
};

function ReportChart({ data, reportType }: ReportChartProps) {
  const t = useTranslations('reports');
  const locale = useLocale();
  const isMobile = useIsMobile();
  const dateFormat = use(getDateLibPromise(locale));

  const isFa = locale === 'fa';

  const formatCurrency = (value: number) =>
    formatNumber({
      locale: 'en-US',
      number: value,
    });

  const chartConfig: ChartConfig = {
    current: {
      label: t('chart.current'),
      color: 'var(--color-chart-2)',
    },
    previous: {
      label: t('chart.previous'),
      color: 'var(--color-chart-4)',
    },
  };

  return (
    <ChartContainer config={chartConfig} className='h-80 w-full'>
      <AreaChart
        style={{ direction: 'ltr' }}
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          ...(isFa && { left: 10 }),
          ...(!isFa && { right: 10 }),
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray='3 3' />

        <XAxis
          tickLine
          dataKey='date'
          tickMargin={10}
          axisLine={false}
          reversed={isFa}
          tickFormatter={(value) =>
            dateFormat.format(new Date(value), 'dd MMM')
          }
          interval={
            data.length > 20
              ? Math.ceil(data.length / (isMobile ? 4 : 10))
              : 'preserveStartEnd'
          }
          angle={data.length > 15 ? -45 : 0}
          height={data.length > 15 ? 60 : 40}
        />

        <YAxis
          tickLine
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) =>
            reportType === 'sales' ? formatCurrency(value) : value.toString()
          }
          orientation={isFa ? 'right' : 'left'}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              cursor={false}
              indicator='dot'
              labelFormatter={(value: string) => (
                <p>{dateFormat.format(new Date(value), 'dd MMMM yyyy')}</p>
              )}
            />
          }
        />

        <Legend
          verticalAlign='top'
          height={36}
          iconType='line'
          formatter={(value) => t(`chart.${value}`)}
        />

        <Area
          type='monotone'
          dataKey='previous'
          stroke='var(--color-previous)'
          fill='var(--color-previous)'
          fillOpacity={0.2}
          strokeWidth={1.5}
          strokeDasharray='5 5'
        />

        <Line
          type='monotone'
          dataKey='current'
          stroke='var(--color-current)'
          strokeWidth={2.5}
          dot={{ fill: 'var(--color-current)', r: 3 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default ReportChart;
