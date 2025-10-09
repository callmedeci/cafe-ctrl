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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type SalesChartProps = {
  data: {
    date: string;
    sales: number;
  }[];
};

function SalesChart({ data }: SalesChartProps) {
  const t = useTranslations('analytics.charts.monthlySales');
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
    sales: {
      label: t('label'),
      color: 'var(--color-chart-2)',
    },
  };

  return (
    <ChartContainer config={chartConfig} className='h-[300px] w-full'>
      <LineChart
        style={{ direction: 'ltr' }}
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          tickLine
          dataKey='date'
          tickMargin={10}
          axisLine={false}
          reversed={isFa}
          tickFormatter={(value) =>
            dateFormat.format(new Date(value), 'dd MMM').slice(0, 6)
          }
          interval={
            data.length > 20
              ? Math.ceil(data.length / (isMobile ? 4 : 36))
              : 'preserveStartEnd'
          }
          angle={data.length > 15 ? -45 : 0}
          height={40}
        />

        <YAxis
          tickLine
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => formatCurrency(value)}
          orientation={isFa ? 'right' : 'left'}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              cursor={false}
              indicator='line'
              labelFormatter={(value: string) => (
                <p>{dateFormat.format(new Date(value), 'dd MMMM')}</p>
              )}
            />
          }
        />

        <Line
          dataKey='sales'
          stroke='var(--color-sales)'
          strokeWidth={2}
          dot={{ fill: 'var(--color-sales)' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export default SalesChart;
