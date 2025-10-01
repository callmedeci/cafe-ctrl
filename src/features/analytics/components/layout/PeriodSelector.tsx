'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, getDateLibPromise } from '@/lib/utils';
import { formatISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { use, useState } from 'react';

const PERIOD_OPTIONS = ['7d', '30d', '90d', '360d'] as const;

function PeriodSelector() {
  const t = useTranslations('analytics');
  const locale = useLocale();
  const dateFormat = use(getDateLibPromise(locale));

  const [period, setPeriod] = useQueryState(
    'period',
    parseAsString.withDefault('30d').withOptions({
      shallow: false,
    }),
  );

  const [customDate, setCustomDate] = useQueryState(
    'custom_date',
    parseAsString,
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function handlePeriodChange(newPeriod: string) {
    setPeriod(newPeriod);
    if (newPeriod !== 'custom') {
      setCustomDate(null);
    }
  }

  function handleCustomDateSelect(date: Date | undefined) {
    if (date) {
      setCustomDate(formatISO(date).split('T')[0]);
      setPeriod('custom');
      setIsCalendarOpen(false);
    }
  }

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
      <Tabs value={period} onValueChange={handlePeriodChange}>
        <TabsList className='grid w-full grid-cols-4 sm:w-auto'>
          {PERIOD_OPTIONS.map((option) => (
            <TabsTrigger
              key={option}
              value={option}
              className='text-xs sm:text-sm'
            >
              {t(`periods.${option}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={period === 'custom' ? 'default' : 'outline'}
            className={cn(
              !customDate && period !== 'custom' && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='lg:mr-2' />
            <span className='hidden lg:inline-block'>
              {period === 'custom' && customDate
                ? dateFormat.format(new Date(customDate), 'PPP')
                : t('periods.custom')}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={customDate ? new Date(customDate) : undefined}
            onSelect={handleCustomDateSelect}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PeriodSelector;
