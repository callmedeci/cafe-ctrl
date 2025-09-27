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
  // const t = await getTranslations();s
  return {
    title: 'Orders',
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

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('table.title')}</CardTitle>
            <CardDescription>{t('table.description')}</CardDescription>

            <OrdersActions />
            <FiltersList filterName='menu_item_filter' />
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
