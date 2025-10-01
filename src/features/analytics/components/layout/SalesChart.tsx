'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatNumber } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type SalesChartProps = {
  data: {
    date: string;
    sales: number;
  }[];
};

function SalesChart({ data }: SalesChartProps) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  const formatCurrency = (value: number) =>
    formatNumber({
      locale: 'en-US',
      number: value,
    });

  // ---> MUST CHANGE <---
  const chartConfig: ChartConfig = {
    sales: {
      label: 'Sales',
      color: 'var(--color-chart-2)',
    },
  };

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        style={{ direction: 'ltr' }}
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid />

        <XAxis
          tickLine
          dataKey='date'
          tickMargin={8}
          axisLine={false}
          reversed={isFa}
        />
        <YAxis
          tickLine
          axisLine={false}
          tickMargin={10}
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
