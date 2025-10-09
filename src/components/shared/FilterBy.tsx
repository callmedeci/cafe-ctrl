'use client';

import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { CommandEmpty } from 'cmdk';
import { Check, ListFilter as Filter, Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useState } from 'react';
import { Button } from '../ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import DynamicIcon from './DynamicIcon';

type FilterByProps = {
  options: {
    value: string;
    label: string;
    iconName?: string;
  }[];
  filterName?: string;
  value?: string[];
  onChange?: (updatedFilters: string[]) => void;
};

function FilterBy({ options, filterName, value, onChange }: FilterByProps) {
  const t = useTranslations('components');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { filters: urlFilters, setFilter } = useFiltersQuery(filterName);

  const filters = value ?? urlFilters;
  const isControlled = value !== undefined;

  function handleUpdateFilter(filterValue: string) {
    const normalizedValue = filterValue.toLowerCase();
    const updatedFilters = filters.includes(normalizedValue)
      ? filters.filter((filter) => filter !== normalizedValue)
      : [...new Set([...filters, normalizedValue])];

    if (isControlled && onChange) onChange(updatedFilters);
    else setFilter(updatedFilters);

    startTransition(() => setIsOpen(false));
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button role='combobox' variant={'secondary'}>
          <Filter className='h-3 w-3 md:h-4 md:w-4' />
          <span className='hidden sm:inline'>{t('filterBy.applyFilter')}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent side='bottom' className='h-20 w-full p-0 sm:h-full'>
        <Command>
          <CommandInput
            placeholder={t('filterBy.searchPlaceholder')}
            className='h-6 text-xs md:h-8 md:text-sm'
          />
          <CommandEmpty className='flex justify-center'>
            <span className='text-muted-foreground flex items-center gap-1 px-1 py-1 text-xs font-medium md:gap-2 md:px-2 md:py-1.5 md:text-sm'>
              <Inbox className='size-3 md:size-4' />
              {t('filterBy.noOptions')}
            </span>
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option, i, array) => {
                const selectedFilter = filters.find(
                  (f) =>
                    f?.toLocaleLowerCase() === option.value.toLocaleLowerCase(),
                );

                return (
                  <CommandItem
                    key={i}
                    className={`justify-between py-1 text-xs md:py-2 md:text-sm ${i < array.length - 1 ? 'border-b' : ''}`}
                    onSelect={() => handleUpdateFilter(option.value)}
                  >
                    <span className='flex items-center gap-1'>
                      <DynamicIcon
                        iconName={option.iconName || ''}
                        className='h-3 w-3 md:h-4 md:w-4'
                      />
                      {option.label}
                    </span>
                    {selectedFilter && (
                      <Check className='h-3 w-3 md:h-4 md:w-4' />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterBy;
