'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { P } from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ControllerRenderProps } from 'react-hook-form';
import { useGetActiveCharges } from '../../hooks/useGetActiveCharges';
import { OrderItem } from '../../lib/types';

type OrderSummaryProps = {
  field: ControllerRenderProps;
};

function OrderSummary({ field }: OrderSummaryProps) {
  const { activeCharges } = useGetActiveCharges();
  const t = useTranslations('orders');

  if (field.value.length === 0) return null;
  if (!activeCharges) return null;

  function removeItem(id: number) {
    field.onChange(field.value.filter((item: OrderItem) => item.id !== id));
  }

  const totalCharges = activeCharges.reduce(
    (total, charge) => total + charge.amount,
    0,
  );

  const totalAmount = field.value.reduce(
    (total: number, item: OrderItem) => total + item.price * item.quantity,
    0,
  );

  return (
    <Card className='border-none !bg-transparent !shadow-none'>
      <CardHeader className='p-0'>
        <CardTitle className='text-start'>
          <CurrencyDisplay amount={totalAmount} />
          {totalCharges > 0 && (
            <P className='mt-1 flex gap-1'>
              {t('cards.items.additionalCharges')}:{' '}
              <CurrencyDisplay amount={totalCharges} />
            </P>
          )}
        </CardTitle>
        <CardAction>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => field.onChange([])}
            className='text-destructive hover:text-destructive h-6 px-2 text-xs md:h-8 md:px-3 md:text-sm'
          >
            {t('menuSelector.clearAll')}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='h-max max-h-36 overflow-y-auto'>
          <div className='grid grid-cols-1 items-center gap-1 md:gap-2'>
            {field.value.map((item: OrderItem, i: number) => (
              <div
                key={i}
                className='bg-muted/50 flex items-center justify-between rounded-xl border p-1 md:p-2'
              >
                <div className='flex items-center gap-1 md:gap-2'>
                  <Badge
                    variant='outline'
                    className='px-1 py-0 text-xs md:px-2 md:py-1'
                  >
                    {item.quantity}x
                  </Badge>
                  <span className='text-xs font-medium md:text-sm'>
                    {item.name}
                  </span>
                  <span className='text-muted-foreground hidden items-center gap-1 text-xs md:flex'>
                    <CurrencyDisplay amount={item.price} />
                    <span>{t('cards.items.each')}</span>
                  </span>
                </div>

                <div className='flex items-center gap-1 md:gap-2'>
                  <span className='text-xs font-semibold md:text-sm'>
                    <CurrencyDisplay
                      amount={item.price * item.quantity}
                      className='size-4 md:size-6'
                    />
                  </span>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='text-destructive hover:text-destructive h-4 w-4 md:h-6 md:w-6'
                    onClick={() => removeItem(item.id)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
