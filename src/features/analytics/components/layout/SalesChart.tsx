'use client';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatNumber } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type SalesChartProps = {
  data: {
    date: string;
    sales: number;
  }[];
};

function SalesChart({ data }: SalesChartProps) {
  const locale = useLocale();
  const isMobile = useIsMobile();
  const t = useTranslations('analytics.charts.monthlySales');

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
    <ChartContainer config={chartConfig}>
      <LineChart
        style={{ direction: 'ltr' }}
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: isMobile ? (isFa ? -50 : 10) : 30,
          left: isMobile ? (isFa ? 10 : -50) : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />

        <XAxis
          tickLine
          dataKey='date'
          tickMargin={8}
          axisLine={false}
          reversed={isFa}
          tickFormatter={(value) => value.slice(0, 6)}
          interval={
            data.length > 20
              ? Math.ceil(data.length / (isMobile ? 4 : 34))
              : 'preserveStartEnd'
          }
          angle={data.length > 15 ? -45 : 0}
          height={40}
        />

        <YAxis
          tickLine
          axisLine={false}
          tickMargin={10}
          tick={!isMobile}
          tickFormatter={(value) => formatCurrency(value)}
          orientation={isFa ? 'right' : 'left'}
        />

        <ChartTooltip
          content={<ChartTooltipContent cursor={false} indicator='line' />}
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
