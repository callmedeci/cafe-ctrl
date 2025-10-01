'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

type QuickStatsData = {
  totalRevenue: number;
  totalOrders: number;
  totalMenuItems: number;
  averageOrderValue: number;
  revenueChange: number;
  ordersChange: number;
  menuItemsChange: number;
  avgOrderChange: number;
};

type QuickStatsCardsProps = {
  data: QuickStatsData;
  period: string;
};

function QuickStatsCards({ data, period }: QuickStatsCardsProps) {
  const t = useTranslations('analytics');

  const stats = [
    {
      title: t('stats.totalRevenue.title'),
      value: <CurrencyDisplay amount={data.totalRevenue} />,
      description: t('stats.totalRevenue.description', { period }),
      icon: DollarSign,
      change: data.revenueChange,
    },
    // {
    //   title: t('stats.totalOrders.title'),
    //   value: data.totalOrders.toLocaleString(),
    //   description: t('stats.totalOrders.description', { period }),
    //   icon: ShoppingCart,
    //   change: data.ordersChange,
    // },
    // {
    //   title: t('stats.menuItems.title'),
    //   value: data.totalMenuItems.toLocaleString(),
    //   description: t('stats.menuItems.description'),
    //   icon: Package,
    //   change: data.menuItemsChange,
    // },
    {
      title: t('stats.averageOrder.title'),
      value: <CurrencyDisplay amount={data.averageOrderValue} />,
      description: t('stats.averageOrder.description', { period }),
      icon: TrendingUp,
      change: data.avgOrderChange,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <CardDescription className='flex items-center gap-1'>
              <span
                className={`text-xs ${
                  stat.change >= 0 ? 'text-success' : 'text-destructive'
                }`}
              >
                {stat.change >= 0 ? '+' : ''}
                {stat.change.toFixed(1)}%
              </span>
              <span>{stat.description}</span>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default QuickStatsCards;
