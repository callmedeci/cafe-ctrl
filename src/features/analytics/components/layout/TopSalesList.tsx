'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Muted } from '@/components/typography/Muted';
import { Small } from '@/components/typography/Small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coffee } from 'lucide-react';
import { useLocale } from 'next-intl';
import { TopSales } from '../../lib/types';

type TopSalesListProps = {
  sales: TopSales[];
};

function TopSalesList({ sales }: TopSalesListProps) {
  const locale = useLocale();

  return (
    <div className='space-y-2'>
      {sales.map((sale, index) => {
        return (
          <div
            key={sale.name}
            className='hover:bg-accent/50 flex items-center justify-between rounded-xl border p-3 transition-colors'
            style={{ direction: locale === 'fa' ? 'rtl' : 'ltr' }}
          >
            <div className='flex items-center space-x-2'>
              <Avatar className='h-8 w-8 md:h-10 md:w-10'>
                <AvatarFallback>
                  <Coffee className='text-muted-foreground size-4 md:size-5' />
                </AvatarFallback>
                <AvatarImage
                  className='object-cover'
                  src={sale.image_url || undefined}
                  alt={`${sale.name} picture`}
                />
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
                <CurrencyDisplay
                  amount={sale.price * sale.quantity}
                  className='text-muted-foreground !size-3 md:!size-4'
                />
              </Muted>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopSalesList;
