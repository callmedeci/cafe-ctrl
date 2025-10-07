import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { getOrderById } from '@/supabase/data/orders-service';
import { getTranslations } from 'next-intl/server';
import OrderQuickActionsCard from '../card/OrderQuickActionsCard';

async function OrderQuickActionsContent() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const t = await getTranslations('orders');
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order) {
    return (
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed p-8'>
        <ErrorState
          message={t('messages.error.failedToLoad', {
            item: t('cards.quickActions.title'),
          })}
          iconClassName='h-8 w-8'
        />
      </div>
    );
  }

  return <OrderQuickActionsCard order={order} />;
}

export default OrderQuickActionsContent;
