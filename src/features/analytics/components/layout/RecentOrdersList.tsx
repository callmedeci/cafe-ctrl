'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getDateLibPromise } from '@/lib/utils';
import { Clock, CreditCard, Eye } from 'lucide-react';
import { useLocale } from 'next-intl';
import { use } from 'react';
import { useTranslations } from 'use-intl';
import OrderQuickPreviewDialog from '../dialog/OrderQuickPreviewDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RecentOrdersList({ orders }: { orders: any[] }) {
  const t = useTranslations('analytics');
  const locale = useLocale();

  const dateLib = use(getDateLibPromise(locale));

  if (orders.length === 0)
    return (
      <div className='text-muted-foreground flex items-center justify-center py-8 text-sm'>
        {t('cards.recentOrders.noOrders')}
      </div>
    );

  return (
    <div className='space-y-2'>
      {orders.map((order) => (
        <OrderQuickPreviewDialog order={order} key={order.id}>
          <div
            className='hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors'
            style={{ direction: locale === 'fa' ? 'rtl' : 'ltr' }}
          >
            <div className='flex items-center space-x-2'>
              <div className='flex flex-col'>
                <span className='max-w-48 text-sm font-medium'>
                  #{order.order_name || order.id}
                </span>

                <div className='flex items-center gap-2'>
                  <span className='text-muted-foreground text-xs'>
                    {order.customer_name || t('walkInCustomer')}
                  </span>
                  <span className='text-muted-foreground text-xs'>
                    {dateLib.format(new Date(order.created_at), 'd MMM, HH:mm')}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Badge
                variant={order.status === 'paid' ? 'default' : 'outline'}
                className={`text-xs ${
                  order.status !== 'paid' ? 'border-warning text-warning' : ''
                }`}
              >
                {order.status === 'paid' && <CreditCard />}
                {order.status === 'unpaid' && <Clock />}
                {t(`status.${order.status}`)}
              </Badge>

              <Link
                className='h-6'
                href={`/dashboard/orders/view/${order.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button variant='secondary' size='icon' className='!h-full'>
                  <Eye />
                </Button>
              </Link>
            </div>
          </div>
        </OrderQuickPreviewDialog>
      ))}
    </div>
  );
}

export default RecentOrdersList;
