'use client';

import ErrorState from '@/components/shared/ErrorState';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, getDateLibPromise } from '@/lib/utils';
import { formatISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { startTransition, use, useState } from 'react';
import { useGetOrdersDate } from '../../hooks/useGetOrdersDate';
import DateRangePickerSkeleton from '../skeletons/DateRangePickerSkeleton';

function DateRangePicker() {
  const t = useTranslations('orders');
  const { ordersDate, isPending, error } = useGetOrdersDate();
  const [selectedDate, setSelectedDate] = useQueryState(
    'selected_date',
    parseAsString
      .withDefault(formatISO(new Date()).split('T')[0])
      .withOptions({ shallow: false }),
  );
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const dateFormat = use(getDateLibPromise(locale));

  if (isPending) return <DateRangePickerSkeleton />;
  if (error || !ordersDate) return <ErrorState message='Error' />;

  function handleSelectDate(newDate: Date | undefined) {
    if (newDate) {
      startTransition(() => {
        setSelectedDate(formatISO(newDate).split('T')[0]);
      });

      startTransition(() => {
        setTimeout(() => setIsOpen(false), 10);
      });
    }
  }

  return (
    <div className='flex items-center gap-1 md:gap-2'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-28 justify-start px-2 text-left text-xs font-normal md:w-32 md:px-3 md:text-sm',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='h-3 w-3 md:h-4 md:w-4' />
            {selectedDate ? (
              dateFormat.isToday(selectedDate) ? (
                t('datePicker.today')
              ) : (
                dateFormat.format(selectedDate, 'PP')
              )
            ) : (
              <span>{t('datePicker.pickDate')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          <Calendar
            className='[&_tr]:gap-1'
            modifiers={{
              highlighted: ordersDate.map((orderDate) => {
                const curDate = orderDate.split('T')[0];
                const [year, month, day] = curDate.split('-').map(Number);

                return new Date(year, month - 1, day);
              }),
            }}
            modifiersClassNames={{
              highlighted: 'bg-accent rounded-lg',
            }}
            mode='single'
            selected={new Date(selectedDate)}
            onSelect={handleSelectDate}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
