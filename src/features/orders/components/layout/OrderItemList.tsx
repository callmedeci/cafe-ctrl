'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import DynamicIcon from '@/components/shared/DynamicIcon';
import { Small } from '@/components/typography/Small';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MenuRow } from '@/types/tables';
import { Minus, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { ControllerRenderProps } from 'react-hook-form';
import { useGetMenu } from '../../hooks/useGetMenu';
import { useMenuItemSearch } from '../../hooks/useMenuItemSearch';
import { OrderItem } from '../../lib/types';
import MenuItemsSelectorError from '../error/MenuItemsSelectorError';
import MenuItemsSelectorSkeleton from '../skeletons/MenuItemsSelectorSkeleton';

type OrderItemListProps = { field: ControllerRenderProps };

function OrderItemList({ field }: OrderItemListProps) {
  const t = useTranslations('orders');
  const locale = useLocale();
  const { menu, isPending, error } = useGetMenu();

  const { query, filterBy } = useMenuItemSearch();

  if (error) return <MenuItemsSelectorError />;
  if (isPending || !menu) return <MenuItemsSelectorSkeleton />;

  const filteredItems = menu.filter((item) => {
    if (filterBy.length === 0) return true;

    return filterBy.some(
      (filter) => item.category?.toLowerCase() === filter.toLowerCase(),
    );
  });

  const searchFilteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  function addItem(menuItem: MenuRow) {
    const newItem: OrderItem = {
      name: menuItem.name,
      quantity: 1,
      price: menuItem.price,
      id: menuItem.id,
    };
    field.onChange([...field.value, newItem]);
  }

  function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      const updatedItems = field.value.filter(
        (item: OrderItem) => item.id !== id,
      );
      field.onChange(updatedItems);
    } else {
      const updatedItems = field.value.map((item: OrderItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      );
      field.onChange(updatedItems);
    }
  }

  return (
    <div className='h-max max-h-52 overflow-y-auto'>
      <div className='grid grid-cols-1 gap-1'>
        {searchFilteredItems.map((item) => {
          const selectedItem = field.value.find(
            (value: OrderItem) => value.id === item.id,
          );

          return (
            <div
              key={item.id}
              className={cn(
                'bg-card hover:bg-accent/50 flex items-center rounded-lg border px-2 py-2 transition-colors md:px-3',
                selectedItem && 'bg-primary/5 border-primary/20',
              )}
            >
              {/* Icon */}
              <div
                className={`${locale === 'fa' ? 'ml-1 md:ml-2' : 'mr-1 md:mr-2'} `}
              >
                <Avatar className='hidden h-6 w-6 md:block md:h-10 md:w-10'>
                  <AvatarFallback>
                    <DynamicIcon
                      iconName={item.menu_categories?.icon_name || ''}
                      className='text-muted-foreground size-4 md:size-5'
                    />
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Item details */}
              <div className='h-full flex-1'>
                <div className='flex h-full items-center justify-between'>
                  <div className='flex flex-col gap-1 text-start'>
                    <Small>{item.name}</Small>
                    <CurrencyDisplay
                      className='size-4 md:size-6'
                      amount={item.price}
                    />
                  </div>

                  {/* Actions */}
                  <div className='flex h-full items-center justify-center'>
                    {selectedItem ? (
                      <div className='flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2'>
                        {/* Quantity controls */}
                        <div className='flex items-center rounded-lg border'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 rounded-r-none border-r md:h-8 md:w-8'
                            onClick={() => {
                              if (selectedItem.quantity >= 0)
                                updateQuantity(
                                  item.id,
                                  selectedItem.quantity - 1,
                                );
                            }}
                          >
                            <Minus />
                          </Button>

                          <Input
                            step={1}
                            min={1}
                            max={100}
                            maxLength={3}
                            inputMode='numeric'
                            type='text'
                            value={selectedItem.quantity}
                            onChange={(e) => {
                              const value = e.currentTarget.value;
                              const numValue = +value;

                              if (value.length <= 3 && numValue <= 100)
                                updateQuantity(item.id, numValue);
                            }}
                            className='!bg-background m-0 h-6 !w-8 !px-0 text-center text-xs font-medium md:h-8 md:!w-14 md:text-sm'
                          />

                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6 rounded-l-none border-l md:h-8 md:w-8'
                            onClick={() => {
                              if (selectedItem.quantity < 100)
                                updateQuantity(
                                  item.id,
                                  selectedItem.quantity + 1,
                                );
                            }}
                          >
                            <Plus />
                          </Button>
                        </div>

                        <div className='text-right text-xs font-bold md:text-sm'>
                          <CurrencyDisplay
                            className='size-4 md:size-6'
                            amount={item.price * selectedItem.quantity}
                          />
                        </div>
                      </div>
                    ) : (
                      <Button
                        size={'sm'}
                        type='button'
                        onClick={() => addItem(item)}
                        className='h-6 px-2 text-xs md:h-8 md:px-3 md:text-sm [&_span]:hidden'
                      >
                        <Plus />
                        <span>{t('menuSelector.addToOrder')}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderItemList;
