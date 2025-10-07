import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import ErrorState from '@/components/shared/ErrorState';
import { searchParamsCache } from '@/lib/utils';
import { getOrderTotalPrice } from '@/supabase/data/orders-service';
import { getTranslations } from 'next-intl/server';

async function TotalPriceContent() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const t = await getTranslations('orders');
  const { data: totalPrice, error } = await getOrderTotalPrice(orderId);

  if (error || totalPrice === null || totalPrice === undefined) {
    return (
      <div className='flex items-center justify-center py-4'>
        <ErrorState
          message={t('messages.error.failedToLoad', {
            item: t('cards.items.total'),
          })}
          iconClassName='h-6 w-6'
        />
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between'>
      <span className='text-base font-semibold'>{t('cards.items.total')}</span>
      <span className='text-lg font-bold'>
        <CurrencyDisplay amount={totalPrice} />
      </span>
    </div>
  );
}

export default TotalPriceContent;
