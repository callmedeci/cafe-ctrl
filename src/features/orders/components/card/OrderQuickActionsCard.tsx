'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { OrderRow } from '@/types/tables';
import { Copy, Printer, Settings, SquarePen, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { handleCopyOrderId } from '../../lib/utils';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';

type OrderQuickActionsCardProps = {
  order: OrderRow;
};

function OrderQuickActionsCard({ order }: OrderQuickActionsCardProps) {
  const t = useTranslations('orders');
  const lcoale = useLocale();

  const pathname = usePathname().replace(`${lcoale}/`, '');
  if (!order) return null;

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Settings />
          {t('cards.quickActions.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <EditOrderDialog order={order}>
          <Button
            variant='ghost'
            size='sm'
            className='text-info hover:text-info hover:bg-info/5 w-full justify-start'
          >
            <SquarePen className='text-info' />
            {t('cards.quickActions.editOrder')}
          </Button>
        </EditOrderDialog>

        <Link href={`${pathname}/preview`}>
          <Button
            variant='ghost'
            size='sm'
            className='text-warning hover:text-warning hover:bg-warning/5 w-full justify-start'
          >
            <Printer className='text-warning' />
            {t('cards.quickActions.printOrder')}
          </Button>
        </Link>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          onClick={(e) => handleCopyOrderId(e, order)}
        >
          <Copy />
          {t('cards.quickActions.copyOrderId')}
        </Button>

        <DeleteOrderDialog
          orderId={order.id}
          orderName={`#${order.order_name || order.id}`}
        >
          <Button
            variant='destructive'
            size='sm'
            className='w-full justify-start'
          >
            <Trash2 />
            {t('cards.quickActions.deleteOrder')}
          </Button>
        </DeleteOrderDialog>
      </CardContent>
    </Card>
  );
}

export default OrderQuickActionsCard;
