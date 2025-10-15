'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, getDateLibPromise } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { startTransition, use, useState } from 'react';
import { subDays, formatISO } from 'date-fns';
import type { DateRange } from 'react-day-picker';

function DateRangeSelector() {
  const t = useTranslations('reports');
  const locale = useLocale();
  const dateLib = use(getDateLibPromise(locale));

  const defaultFrom = formatISO(subDays(new Date(), 30)).split('T')[0];
  const defaultTo = formatISO(new Date()).split('T')[0];

  const [fromDate, setFromDate] = useQueryState(
    'from',
    parseAsString.withDefault(defaultFrom).withOptions({
      shallow: false,
    }),
  );

  const [toDate, setToDate] = useQueryState(
    'to',
    parseAsString.withDefault(defaultTo).withOptions({
      shallow: false,
    }),
  );

  const [isOpen, setIsOpen] = useState(false);

  const selectedRange: DateRange | undefined = {
    from: fromDate ? new Date(fromDate) : undefined,
    to: toDate ? new Date(toDate) : undefined,
  };

  function handleSelectRange(range: DateRange | undefined) {
    if (range?.from) {
      startTransition(() => {
        setFromDate(formatISO(range.from!).split('T')[0]);
      });
    }
    if (range?.to) {
      startTransition(() => {
        setToDate(formatISO(range.to!).split('T')[0]);
      });
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium'>{t('filters.dateRange')}</label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'justify-start text-left font-normal',
              !selectedRange?.from && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {selectedRange?.from ? (
              selectedRange.to ? (
                <>
                  {dateLib.format(selectedRange.from, 'dd MMM yyyy')} -{' '}
                  {dateLib.format(selectedRange.to, 'dd MMM yyyy')}
                </>
              ) : (
                dateLib.format(selectedRange.from, 'dd MMM yyyy')
              )
            ) : (
              <span>{t('filters.selectDateRange')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            selected={selectedRange}
            onSelect={handleSelectRange}
            numberOfMonths={2}
            disabled={(date) => date > new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangeSelector;
