'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocale } from 'next-intl';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type TotalOrdersChartProps = {
  data: {
    date: string;
    orders: number;
  }[];
};

function TotalOrdersChart({ data }: TotalOrdersChartProps) {
  const locale = useLocale();
  const isMobile = useIsMobile();

  const isFa = locale === 'fa';

  // ---> MUST CHANGE <---
  const chartConfig: ChartConfig = {
    orders: {
      label: 'Orders',
      color: 'var(--color-chart-1)',
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
          right: isMobile ? 0 : 30,
          left: isMobile ? -60 : -30,
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
        />
        <YAxis
          tickLine
          axisLine={false}
          tickMargin={10}
          tick={!isMobile}
          orientation={isFa ? 'right' : 'left'}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent cursor={false} indicator='dot' nameKey='' />
          }
        />

        <Line
          dataKey='orders'
          stroke='var(--color-orders)'
          strokeWidth={2}
          dot={{ fill: 'var(--color-orders)' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export default TotalOrdersChart;
