import LayoutHeader from '@/components/shared/LayoutHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  OrderDetailsCard,
  OrderDetailsCardSkeleton,
  OrderItemsCard,
  OrderItemsCardSkeleton,
  OrderNotesCard,
  OrderNotesCardSkeleton,
  OrderQuickActionsContent,
  QuickActionsSkeleton,
  UpdateOrderAction,
  UpdateOrderActionSkeleton,
} from '@/features/orders';

import { Link } from '@/i18n/navigation';
import { searchParamsCache } from '@/lib/utils';
import { getActiveCharges } from '@/supabase/data/charges-service';
import {
  getAllOrdersId,
  getOrderById,
  getOrderName,
} from '@/supabase/data/orders-service';
import { QueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/dashboard/orders/view/[orderId]'>): Promise<Metadata> {
  const { orderId } = await params;
  const { data: order, error } = await getOrderById(orderId);
  if (!order || error) notFound();

  const t = await getTranslations('orders.view.metadata');

  const orderDisplayName = `#${order.id}`;

  return {
    title: t('title', { orderName: orderDisplayName }),
    description: t('description', { orderName: orderDisplayName }),
    keywords: [
      'order details',
      'order view',
      'order information',
      'order status',
      'order items',
      'customer order',
    ],
    openGraph: {
      title: t('title', { orderName: orderDisplayName }),
      description: t('description', { orderName: orderDisplayName }),
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export async function generateStaticParams() {
  const ordersId = await getAllOrdersId();
  return ordersId.map((id) => ({ orderId: id.toString() }));
}

async function OrderViewPage({
  params,
}: PageProps<'/[locale]/dashboard/orders/view/[orderId]'>) {
  const { orderId } = await params;

  const { data: name, error } = await getOrderName(orderId);
  if (!name || error) notFound();

  const t = await getTranslations('orders');
  searchParamsCache.parse(params);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['active_charges'],
    queryFn: getActiveCharges,
  });

  const orderDisplayName = `#${name.replaceAll('-', ' ')}`;

  return (
    <>
      <LayoutHeader
        title={t('view.title', { orderName: orderDisplayName })}
        description={t('view.description')}
      >
        <Button variant='link' size='sm' asChild>
          <Link href='/dashboard/orders' className={'flex items-center'}>
            <ArrowLeft />
            <span className='hidden sm:block'>{t('view.goBack')}</span>
          </Link>
        </Button>
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>{t('view.overview.title')}</span>
              <Suspense fallback={<UpdateOrderActionSkeleton />}>
                <UpdateOrderAction className='[&_span]:hidden sm:[&_span]:inline-block' />
              </Suspense>
            </CardTitle>
            <CardDescription>{t('view.overview.description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='w-full'>
                <Suspense fallback={<OrderItemsCardSkeleton />}>
                  <OrderItemsCard />
                </Suspense>
              </div>

              <div className='flex w-full flex-col space-y-4'>
                <Suspense fallback={<OrderDetailsCardSkeleton />}>
                  <OrderDetailsCard />
                </Suspense>

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  <Suspense fallback={<QuickActionsSkeleton />}>
                    <OrderQuickActionsContent />
                  </Suspense>

                  <Suspense fallback={<OrderNotesCardSkeleton />}>
                    <OrderNotesCard />
                  </Suspense>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrderViewPage;
