'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { Link } from '@/i18n/navigation';
import { OrderRow } from '@/types/tables';
import { Ellipsis, Eye, Printer, SquarePen, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { handleCopyOrderId } from '../../lib/utils';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';
import OrderPreviewDialog from '../dialog/OrderPreviewDialog';
import OrderIsPaidSelector from '../selects/OrderIsPaidSelector';
import OrderIsToGoSelector from '../selects/OrderIsToGoSelector';
import { use } from 'react';
import { getDateLibPromise } from '@/lib/utils';

type OrdersTableRowProps = {
  order: OrderRow;
};

function OrdersTableRow({ order }: OrdersTableRowProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  const locale = useLocale();
  const t = useTranslations('orders');

  const dateLib = use(getDateLibPromise(locale));

  return (
    <OrderPreviewDialog order={order}>
      <TableRow className='cursor-pointer'>
        {/* ORDER ID */}
        <TableCell className='px-2 font-semibold md:px-4'>
          <Button
            variant={'outline'}
            onClick={(e) =>
              handleCopyOrderId(e, order, t('messages.success.copied'))
            }
          >
            <span>#</span>
            {order.order_name
              ? order.order_name.replaceAll('-', ' ')
              : order.id}
          </Button>
        </TableCell>

        {/* CUSTOMER NAME */}
        <TableCell className='px-2 text-sm font-medium md:px-4'>
          {order.customer_name || t('cards.details.walkInCustomer')}
        </TableCell>

        {/* CUSTOMER CONTACT */}
        {!excludedColumns.includes('customer_contact') && (
          <TableCell className='text-muted-foreground px-2 text-xs md:px-4'>
            {order.customer_contact || '—'}
          </TableCell>
        )}

        {/* ORDER TYPE */}
        {!excludedColumns.includes('order_type') && (
          <TableCell className='px-2 md:px-4'>
            <OrderIsToGoSelector order={order} />
          </TableCell>
        )}

        {/* ITEMS COUNT */}
        {!excludedColumns.includes('items_count') && (
          <TableCell className='px-2 md:px-4'>
            <span className='text-muted-foreground text-xs'>
              {order.items?.length || 0}{' '}
              {t('table.headers.items').toLowerCase()}
            </span>
          </TableCell>
        )}

        {/* STATUS */}
        {!excludedColumns.includes('status') && (
          <TableCell className='px-2 md:px-4'>
            <OrderIsPaidSelector order={order} />
          </TableCell>
        )}

        {/* TOTAL PRICE */}
        <TableCell className='px-2 text-sm font-semibold md:px-4'>
          <CurrencyDisplay amount={order.total_price} />
        </TableCell>

        {/* CREATED AT */}
        <TableCell className='text-muted-foreground px-2 text-xs md:px-4'>
          {dateLib.format(new Date(order.created_at), 'MMM d, HH:mm')}
        </TableCell>

        {/* ACTIONS */}
        <TableCell className='px-2 text-end md:px-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant='ghost' className='h-0 w-0'>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side='bottom'
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteOrderDialog orderId={order.id} orderName={`#${order.id}`}>
                <DropdownMenuItem
                  variant='destructive'
                  className='hover:!bg-destructive/5 cursor-pointer'
                >
                  <Trash2 />
                  {t('actions.delete')}
                </DropdownMenuItem>
              </DeleteOrderDialog>

              <EditOrderDialog order={order}>
                <DropdownMenuItem className='!text-info [&_svg]:!text-info hover:!bg-info/5 cursor-pointer'>
                  <SquarePen />
                  {t('actions.edit')}
                </DropdownMenuItem>
              </EditOrderDialog>

              <DropdownMenuItem
                asChild
                variant='default'
                className='!text-warning [&_svg]:!text-warning hover:!bg-warning/5 cursor-pointer'
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/dashboard/orders/view/${order.id}/preview`}
                  className='flex items-center gap-2'
                >
                  <Printer />
                  {t('cards.quickActions.printOrder')}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                variant='default'
                className='hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer'
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/dashboard/orders/view/${order.id}`}
                  className='flex items-center gap-2'
                >
                  <Eye />
                  {t('actions.viewDetails')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </OrderPreviewDialog>
  );
}

export default OrdersTableRow;
