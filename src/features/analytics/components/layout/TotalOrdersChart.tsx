'use client';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { getDateLibPromise } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

type TotalOrdersChartProps = {
  data: {
    date: string;
    orders: number;
  }[];
};

function TotalOrdersChart({ data }: TotalOrdersChartProps) {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const t = useTranslations('analytics.charts.totalOrders');
  const dateFormat = use(getDateLibPromise(locale));

  const isFa = locale === 'fa';

  const chartConfig: ChartConfig = {
    orders: {
      label: t('label'),
      color: 'var(--color-chart-1)',
    },
  };
  return (
    <ChartContainer config={chartConfig} className='h-[300px] w-full'>
      <BarChart style={{ direction: 'ltr' }} accessibilityLayer data={data}>
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
              ? Math.ceil(data.length / (isMobile ? 8 : 36))
              : 'preserveStartEnd'
          }
          angle={data.length > 15 ? -45 : 0}
          height={40}
          tickSize={5}
        />

        <YAxis
          tickLine={!isMobile}
          axisLine={false}
          tickMargin={10}
          orientation={isFa ? 'right' : 'left'}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              cursor={false}
              indicator='dot'
              color='var(--color-orders)'
              labelFormatter={(value: string) => (
                <p>{dateFormat.format(new Date(value), 'dd MMMM')}</p>
              )}
            />
          }
        />

        <Bar dataKey='orders' fill='var(--color-orders)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default TotalOrdersChart;
