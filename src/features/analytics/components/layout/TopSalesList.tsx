'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Badge } from '@/components/ui/badge';
import { TopOrders } from '../../lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Small } from '@/components/typography/Small';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Muted } from '@/components/typography/Muted';

type TopSalesListProps = {
  sales: TopOrders;
};

function TopSalesList({ sales }: TopSalesListProps) {
  return (
    <div className='space-y-2'>
      {sales.map((sale, index) => {
        return (
          <div
            key={sale.name}
            className='hover:bg-accent/50 flex items-center justify-between rounded-xl border p-3 transition-colors'
          >
            <div className='flex items-center space-x-2'>
              <Avatar className='h-8 w-8 md:h-10 md:w-10'>
                <AvatarFallback>
                  <DynamicIcon
                    iconName={sale.category?.icon_name || 'Package'}
                    className='text-muted-foreground size-4 md:size-5'
                  />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-medium'>{sale.name}</span>
                <Badge variant={'secondary'}>
                  {sale.category?.name || 'Uncategorized'}
                </Badge>
              </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <div className='flex items-center gap-2'>
                <Small>{sale.quantity} sold</Small>
                <Badge variant='outline'>#{index + 1}</Badge>
              </div>

              <Muted>
                <CurrencyDisplay amount={sale.price * sale.quantity} />
              </Muted>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopSalesList;
