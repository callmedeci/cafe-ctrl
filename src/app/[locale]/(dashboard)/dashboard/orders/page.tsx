import FiltersList from '@/components/shared/FiltersList';
import LayoutHeader from '@/components/shared/LayoutHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrdersActions, OrdersTable } from '@/features/orders';
import { searchParamsCache } from '@/lib/utils';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('orders.metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'orders management',
      'cafe orders',
      'order tracking',
      'order history',
      'order status',
      'customer orders',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

async function OrdersPage({
  searchParams,
}: PageProps<'/[locale]/dashboard/orders'>) {
  const t = await getTranslations('orders');
  const params = await searchParams;
  searchParamsCache.parse(params);

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='flex gap-4 p-4'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>{t('table.title')}</CardTitle>
            <CardDescription>{t('table.description')}</CardDescription>

            <OrdersActions />
            <FiltersList />
          </CardHeader>

          <CardContent>
            <OrdersTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrdersPage;
