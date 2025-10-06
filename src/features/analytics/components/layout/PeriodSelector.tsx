'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';

const PERIOD_OPTIONS = ['7d', '30d', '90d', '360d'] as const;

function PeriodSelector() {
  const t = useTranslations('analytics');

  const [period, setPeriod] = useQueryState(
    'period',
    parseAsString.withDefault('30d').withOptions({
      shallow: false,
    }),
  );

  function handlePeriodChange(newPeriod: string) {
    setPeriod(newPeriod);
  }

  return (
    <>
      <Tabs
        value={period}
        onValueChange={handlePeriodChange}
        className='hidden lg:block'
      >
        <TabsList>
          {PERIOD_OPTIONS.map((option) => (
            <TabsTrigger
              key={option}
              value={option}
              className='text-xs lg:text-sm'
            >
              {t(`periods.${option}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Select onValueChange={handlePeriodChange} value={period}>
        <SelectTrigger className='flex !h-6 text-xs md:!h-8 md:text-sm lg:hidden'>
          {`Last ${t(`periods.${period}`)}`}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem value={option} key={option}>
                {`Last ${t(`periods.${option}`)}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default PeriodSelector;
