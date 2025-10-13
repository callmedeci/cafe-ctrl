'use client';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { updateOrderIsToGo } from '@/supabase/data/orders-service';
import { OrderRow } from '@/types/tables';
import { MapPin, ShoppingBag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { MouseEvent, startTransition, useOptimistic } from 'react';

type OrderIsToGoSelectorProps = { order: OrderRow };

function OrderIsToGoSelector({ order }: OrderIsToGoSelectorProps) {
  const [optimisticOrder, setOptimisticOrder] = useOptimistic(
    order,
    (curOrder, isTogo: boolean) => ({
      ...curOrder,
      is_togo: isTogo,
    }),
  );

  const t = useTranslations('orders');
  const locale = useLocale();
  const isFa = locale === 'fa';

  async function handleUpdateIsTogo(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    selectedTogo: boolean,
  ) {
    e.stopPropagation();

    if (selectedTogo === order.is_togo) return;

    startTransition(async () => {
      updateOrderIsToGo(order.id, !order.is_togo);
    });
    setOptimisticOrder(!order.is_togo);
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Badge
              onClick={(e) => e.stopPropagation()}
              variant={optimisticOrder.is_togo ? 'default' : 'secondary'}
            >
              {optimisticOrder.is_togo ? <ShoppingBag /> : <MapPin />}
              {optimisticOrder.is_togo ? t('type.togo') : t('type.dinein')}
            </Badge>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>{t('selectors.rightClickToUpdate')}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent className='min-w-12 !px-0 !py-0'>
        <DropdownMenuGroup className='!gap-1'>
          <DropdownMenuItem
            onClick={(e) => handleUpdateIsTogo(e, true)}
            className={optimisticOrder.is_togo ? 'bg-accent/50' : ''}
          >
            <Badge
              className={cn(
                'flex w-full items-center justify-start',
                isFa ? 'direct-rtl' : 'direct-ltr',
              )}
            >
              <ShoppingBag className='text-card' />
              {t('type.togo')}
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => handleUpdateIsTogo(e, false)}
            className={!optimisticOrder.is_togo ? 'bg-accent/50' : ''}
          >
            <Badge
              variant={'outline'}
              className={cn(
                'flex w-full items-center justify-start',
                isFa ? 'direct-rtl' : 'direct-ltr',
              )}
            >
              <MapPin />
              {t('type.dinein')}
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderIsToGoSelector;
