import ErrorState from '@/components/shared/ErrorState';
import LayoutHeader from '@/components/shared/LayoutHeader';
import { OrderItemDocument } from '@/features/orders';
import { getOrderById } from '@/supabase/data/orders-service';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('orders.view.preview.metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

async function OrderPreviewPage({
  params,
}: PageProps<'/[locale]/dashboard/orders/view/[orderId]/preview'>) {
  const t = await getTranslations('orders.view.preview');
  const { orderId } = await params;
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return (
      <div className='flex h-[calc(100vh-4rem)] items-center justify-center'>
        <ErrorState
          message={t('error.description')}
          containerClassName='flex-col text-center'
        >
          {t('error.tryAgain')}
        </ErrorState>
      </div>
    );

  return (
    <>
      <LayoutHeader title={t('title')} description={t('description')} />

      <OrderItemDocument order={order} />
    </>
  );
}

export default OrderPreviewPage;
